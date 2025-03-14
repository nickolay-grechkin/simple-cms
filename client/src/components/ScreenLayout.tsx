import {
  useAddSectionToScreen,
  useGetAllScreens,
  useUpdateScreen,
} from "../api/screens";
import { Section, Screen } from "../types";
import DraggableWrapper, { SortableItem } from "./DraggableSections";
import { Box, Button } from "@chakra-ui/react";
import { JsonPreview } from "./JsonPreview";
import { useState } from "react";
import { useEffect } from "react";
import { AddSectionDialog } from "./AddSectionDialog";
import { SectionType } from "../enums/section";

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
    <Box>
      <DraggableWrapper
        sections={currentScreen.sections}
        onOrderChange={handleSectionOrderChange}
      >
        <div>
          {currentScreen.sections.map((section) => (
            <SortableItem key={section._id} section={section} />
          ))}
        </div>
      </DraggableWrapper>
      <Button onClick={handleSave}>Save</Button>
      <JsonPreview data={currentScreen} />
      <AddSectionDialog onSave={handleAddSection} />
    </Box>
  );
};
