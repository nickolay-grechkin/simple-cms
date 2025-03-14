import { Button, Icon, Text } from "@chakra-ui/react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { SectionsSchemaType } from "../validation";
import { Block } from "./Block";
import { DraggableWrapper } from "./DraggableSections";
import { SectionItem } from "../types";

type SectionBlocksProps = {
  control: Control<SectionsSchemaType>;
  register: UseFormRegister<SectionsSchemaType>;
  sectionIndex: number;
};

export function SectionBlocks({
  control,
  register,
  sectionIndex,
}: SectionBlocksProps) {
  const { fields, remove, append, replace } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.items`,
  });

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleOrderChange = (items: SectionItem[]) => {
    replace(items.map((item, index) => ({ ...item, order: index })));
  };

  return (
    <DraggableWrapper sections={fields} onOrderChange={handleOrderChange}>
      {fields.map((item, index) => (
        <Block
          key={item._id}
          blockId={item._id}
          blockIndex={index}
          sectionIndex={sectionIndex}
          onDelete={() => handleDelete(index)}
          register={register}
        />
      ))}
      <Button
        backgroundColor="#f0e2fe"
        color="#6200c4"
        onClick={() =>
          append({
            _id: `temp-${Date.now()}-${Math.random().toString(36)}`,
            title: "",
            description: "",
            imageUrl: "",
            actionUrl: "",
            order: fields.length,
          })
        }
      >
        <Icon as={FaPlus} />
        <Text>Додати новий блок</Text>
      </Button>
    </DraggableWrapper>
  );
}
