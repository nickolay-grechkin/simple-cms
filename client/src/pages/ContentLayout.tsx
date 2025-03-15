import { useState } from "react";
import { useEffect } from "react";
import { useGetAllScreens, useUpdateScreen } from "../api/screens";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { Screen } from "../types";
import { Section } from "../components/Section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { JsonPreview } from "../components/JsonPreview";
import { sectionsSchema, SectionsSchemaType } from "../validation";
import { IoSaveOutline } from "react-icons/io5";

export const ContentLayout: React.FC = () => {
  const { data: screens, isLoading, error } = useGetAllScreens();
  const { mutate: updateScreen, isPending } = useUpdateScreen();

  const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);

  const {
    control,
    register,
    handleSubmit: handleSubmitForm,
    reset,
    formState: { errors },
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

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading screens: {error.message}</Box>;
  if (!currentScreen) return <Box>No screens available</Box>;

  const handleSubmit = (data: SectionsSchemaType) => {
    updateScreen({
      screenId: currentScreen?._id,
      sections: data.sections,
    });
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
      <Box padding="20px" width="100%">
        <form onSubmit={handleSubmitForm(handleSubmit)}>
          <Section control={control} register={register} errors={errors} />
          <Flex gap="1rem">
            <Button backgroundColor="#7e00fc" type="submit" loading={isPending}>
              <Icon as={IoSaveOutline} width="16px" height="16px" />
              Зберегти
            </Button>
            <JsonPreview
              data={{
                _id: currentScreen._id,
                name: currentScreen.name,
                ...(formValues as SectionsSchemaType),
              }}
            />
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
