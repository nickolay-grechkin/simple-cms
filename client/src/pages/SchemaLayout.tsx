import {
  useAddSectionToScreen,
  useGetAllScreens,
  useUpdateScreen,
} from "../api/screens";
import { Section, Screen } from "../types";
import { DraggableWrapper } from "../components/DraggableSections";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { AddSectionDialog } from "../components/AddSectionDialog";
import { SectionType } from "../enums/section";
import { SectionSchemaItem } from "../components/SectionSchemaItem/SectionSchemaItem";

export const SchemaLayout: React.FC = () => {
  const { data: screens, isLoading, error } = useGetAllScreens();
  const { mutate: updateScreen } = useUpdateScreen();
  const { mutate: addSection } = useAddSectionToScreen();

  const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);

  useEffect(() => {
    if (screens && screens.length > 0) {
      setCurrentScreen(screens[0]);
    }
  }, [screens]);

  const handleSectionOrderChange = (sections: Section[]) => {
    const mappedSections = sections.map((section, index) => ({
      ...section,
      order: index,
    }));

    if (currentScreen) {
      setCurrentScreen({ ...currentScreen, sections: mappedSections });
    }
  };

  const handleSave = () => {
    if (currentScreen) {
      updateScreen({
        screenId: currentScreen._id,
        sections: currentScreen.sections,
      });
    }
  };

  const handleAddSection = async (section: {
    title: string;
    type: SectionType;
  }) => {
    if (currentScreen) {
      addSection({
        screenId: currentScreen._id,
        sectionData: {
          title: section.title,
          type: section.type,
        },
      });
    }
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading screens: {error.message}</Box>;
  if (!currentScreen) return <Box>No screens available</Box>;

  return (
    <Flex>
      <Box
        width="200px"
        height="100vh"
        borderRight="1px solid #e0e0e0"
        padding="20px"
      >
        Homepage
      </Box>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        padding="3rem"
        width="100%"
        overflow="hidden"
      >
        <DraggableWrapper
          sections={currentScreen.sections}
          onOrderChange={handleSectionOrderChange}
        >
          <div>
            {currentScreen.sections.map((section) => (
              <SectionSchemaItem key={section._id} section={section} />
            ))}
          </div>
        </DraggableWrapper>
        <Flex alignItems="center" gap="1rem" marginTop="2rem">
          <AddSectionDialog onSave={handleAddSection} />
          <Button
            height="48px"
            padding="16px"
            backgroundColor="#6200c4"
            color="white"
            borderRadius="4px"
            cursor="pointer"
            fontWeight="bold"
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
