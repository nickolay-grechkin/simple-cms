import { useState } from "react";
import { useEffect } from "react";
import { useGetAllScreens, useUpdateScreen } from "../api/screens";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Screen } from "../types";
import { Section } from "../components/Section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { JsonPreview } from "../components/JsonPreview";
import { sectionsSchema, SectionsSchemaType } from "../validation";

export const ContentLayout: React.FC = () => {
  const { data: screens, isLoading, error } = useGetAllScreens();
  const { mutate: updateScreen } = useUpdateScreen();

  const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);

  const {
    control,
    register,
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm<SectionsSchemaType>({
    resolver: zodResolver(sectionsSchema),
    defaultValues: {
      sections: currentScreen?.sections,
    },
  });

  const formValues = useWatch({
    control,
    defaultValue: { sections: [] },
  });

  useEffect(() => {
    if (screens && screens.length > 0) {
      setCurrentScreen(screens[0]);
    }
  }, [screens]);

  useEffect(() => {
    if (currentScreen?.sections) {
      reset({ sections: currentScreen.sections });
    }
  }, [currentScreen, reset]);

  const handleSubmit = (data: SectionsSchemaType) => {
    if (!currentScreen) return;

    updateScreen({
      screenId: currentScreen?._id,
      sections: data.sections,
    });
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading screens: {error.message}</Box>;
  if (!currentScreen) return <Box>No screens available</Box>;

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)}>
      <Section control={control} register={register} />
      <Flex gap="1rem">
        <Button type="submit">Save</Button>
        <JsonPreview
          data={{
            _id: currentScreen._id,
            name: currentScreen.name,
            ...formValues,
          }}
        />
      </Flex>
    </form>
  );
};
