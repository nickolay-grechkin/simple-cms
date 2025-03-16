import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { SectionsSchemaType } from "../../validation";
import { SectionBlocks } from "../Block/SectionBlocks";

type SectionProps = {
  control: Control<SectionsSchemaType>;
  register: UseFormRegister<SectionsSchemaType>;
  errors: FieldErrors<SectionsSchemaType>;
};

export const Section: React.FC<SectionProps> = ({
  register,
  control,
  errors,
}) => {
  const { fields } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <Box
      height="80vh"
      overflow="auto"
      overflowX="hidden"
      paddingBottom="16px"
      paddingRight="16px"
    >
      {fields.map((field, index) => (
        <Box
          key={field._id}
          marginBottom="20px"
          border="1px solid #e0e0e0"
          borderRadius="4px"
          padding="8px"
        >
          <input type="text" {...register(`sections.${index}.title`)} hidden />
          <div>
            <Text marginBottom="0.675rem">Заголовок секції: {field.title}</Text>
          </div>
          <Flex
            flexDirection="column"
            gap="1rem"
            marginBottom="0.75rem"
            key={field._id}
          >
            <SectionBlocks
              key={field._id}
              control={control}
              register={register}
              sectionIndex={index}
              errors={errors}
            />
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
