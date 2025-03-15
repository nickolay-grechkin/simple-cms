import {
  useUpsertSection,
  useDeleteSection,
  useGetAllScreens,
  useUpdateScreen,
} from "../api/screens";
import { DraggableItem, Screen } from "../types";
import { DraggableWrapper } from "../components/DraggableSections";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { UpsertSectionDialog } from "../components/UpsertSectionDialog";
import { SectionSchemaItem } from "../components/SectionSchemaItem/SectionSchemaItem";
import { RegularButton } from "../components/RegularButton/RegularButton";
import { FaPlus } from "react-icons/fa";
import { SectionSchema } from "../validation";

export const SchemaLayout: React.FC = () => {
  const { data: screens, isLoading, error } = useGetAllScreens();
  const { mutate: updateScreen } = useUpdateScreen();
  const { mutate: addSection } = useUpsertSection();
  const { mutate: deleteSection } = useDeleteSection();

  const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);
  const [isUpsertSectionDialogOpen, setIsUpsertSectionDialogOpen] =
    useState(false);

  useEffect(() => {
    if (screens && screens.length > 0) {
      setCurrentScreen(screens[0]);
    }
  }, [screens]);

  const handleUpsertSectionDialogOpen = () => {
    setIsUpsertSectionDialogOpen(true);
  };

  const handleUpsertSectionDialogClose = () => {
    setIsUpsertSectionDialogOpen(false);
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading screens: {error.message}</Box>;
  if (!currentScreen) return <Box>No screens available</Box>;

  const handleSectionOrderChange = (sections: DraggableItem[]) => {
    setCurrentScreen({
      ...currentScreen,
      sections: sections as SectionSchema[],
    });

    updateScreen({
      screenId: currentScreen._id,
      sections: sections as SectionSchema[],
    });
  };

  const handleUpsertSection = async (section: SectionSchema) => {
    addSection(
      {
        screenId: currentScreen._id,
        section,
      },
      {
        onSuccess: () => {
          setIsUpsertSectionDialogOpen(false);
        },
      }
    );
  };

  const handleDeleteSection = async (sectionId: string) => {
    deleteSection({ screenId: currentScreen._id, sectionId });
  };

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
        padding="20px"
        width="100%"
        height="100%"
      >
        <DraggableWrapper
          items={currentScreen.sections as DraggableItem[]}
          onOrderChange={handleSectionOrderChange}
        >
          <Box
            height="80vh"
            paddingRight="16px"
            overflow="auto"
            overflowX="hidden"
          >
            {currentScreen.sections.map((section) => (
              <SectionSchemaItem
                key={section._id}
                section={section}
                screenId={currentScreen._id}
                onDelete={handleDeleteSection}
              />
            ))}
          </Box>
        </DraggableWrapper>
        <RegularButton
          onClick={handleUpsertSectionDialogOpen}
          icon={FaPlus}
          text="Додати секцію"
        />
        {isUpsertSectionDialogOpen && (
          <UpsertSectionDialog
            onSave={handleUpsertSection}
            isOpen={isUpsertSectionDialogOpen}
            onClose={handleUpsertSectionDialogClose}
          />
        )}
      </Flex>
    </Flex>
  );
};
