import { useGetAllScreens, useUpdateScreen } from "../api/screens";
import { Section } from "../types";
import DraggableSections from "./DraggableSections";
import { Box } from "@chakra-ui/react";

export const SchemaLayout: React.FC = () => {
  const { data: screens, isLoading, error } = useGetAllScreens();
  const { mutate: updateScreen } = useUpdateScreen();

  const handleSave = (sections: Section[]) => {
    updateScreen({
      screenId: screens[0]._id,
      sections,
    });
  };

  return (
    screens && (
      <Box>
        <DraggableSections
          screenSections={screens[0]?.sections}
          onSave={handleSave}
        />
      </Box>
    )
  );
};
