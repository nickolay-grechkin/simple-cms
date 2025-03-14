import { useState } from "react";
import { useEffect } from "react";
import { useGetAllScreens, useUpdateScreen } from "../api/screens";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { Screen } from "../types";
import { EditItemForm } from "./EditItemForm";
import { FaPlus } from "react-icons/fa6";
import DraggableWrapper from "./DraggableSections";

export const ContentLayout: React.FC = () => {
  const { data: screens, isLoading, error } = useGetAllScreens();
  const { mutate: updateScreen } = useUpdateScreen();

  const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);

  useEffect(() => {
    if (screens && screens.length > 0) {
      setCurrentScreen(screens[0]);
    }
  }, [screens]);

  const handleAddItem = (sectionId: string) => {
    if (currentScreen) {
      setCurrentScreen({
        ...currentScreen,
        sections: currentScreen?.sections.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                items: [
                  ...section.items,
                  {
                    _id: `temp-${Date.now()}-${Math.random().toString(36)}`,
                    title: "",
                    description: "",
                    imageUrl: "",
                    actionUrl: "",
                    order: section.items.length,
                  },
                ],
              }
            : section
        ),
      });
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (currentScreen) {
      setCurrentScreen({
        ...currentScreen,
        sections: currentScreen.sections.map((section) => ({
          ...section,
          items: section.items.filter((item) => item._id !== itemId),
        })),
      });
    }
  };

  const handleOrderChange = (sectionId: string, items: any[]) => {
    if (currentScreen) {
      setCurrentScreen({
        ...currentScreen,
        sections: currentScreen?.sections.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                items: items.map((item, index) => ({
                  ...item,
                  order: index,
                })),
              }
            : section
        ),
      });
    }
  };

  const handleSaveScreen = async () => {
    if (currentScreen) {
      await updateScreen({
        screenId: currentScreen._id,
        sections: currentScreen.sections,
      });
    }
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading screens: {error.message}</Box>;
  if (!currentScreen) return <Box>No screens available</Box>;

  return (
    <div>
      {currentScreen.sections.map((section) => (
        <Box key={section._id} marginTop="20px">
          <div>
            <Text marginBottom="0.675rem">{section.title}</Text>
          </div>
          <Flex
            flexDirection="column"
            gap="1rem"
            marginBottom="0.75rem"
            key={section._id}
          >
            <DraggableWrapper
              sections={section.items}
              onOrderChange={(items) => handleOrderChange(section._id, items)}
            >
              {section.items.map((item) => (
                <EditItemForm
                  key={item._id}
                  item={item}
                  onSave={(data) => console.log(data)}
                  onDelete={handleDeleteItem}
                />
              ))}
            </DraggableWrapper>
          </Flex>
          <Button
            backgroundColor="#f0e2fe"
            color="#6200c4"
            onClick={() => handleAddItem(section._id)}
          >
            <Icon as={FaPlus} />
            <Text>Додати новий блок</Text>
          </Button>
        </Box>
      ))}
    </div>
  );
};
