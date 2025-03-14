import { Box, Flex, Text } from "@chakra-ui/react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { SectionsSchemaType } from "../validation";
import { SectionBlocks } from "./SectionBlocks";

type SectionProps = {
  control: Control<SectionsSchemaType>;
  register: UseFormRegister<SectionsSchemaType>;
};

export const Section: React.FC<SectionProps> = ({ register, control }) => {
  const { fields } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <>
      {fields.map((field, index) => (
        <Box key={field._id} marginTop="20px">
          <input type="text" {...register(`sections.${index}.title`)} hidden />
          <div>
            <Text marginBottom="0.675rem">{field.title}</Text>
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
            />
          </Flex>
        </Box>
      ))}
    </>
  );
};
