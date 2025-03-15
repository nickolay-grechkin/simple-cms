import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { BlockSchema, SectionsSchemaType } from "../validation";
import { Block } from "./Block";
import { DraggableWrapper } from "./DraggableSections";
import { RegularButton } from "./RegularButton/RegularButton";
import { DraggableItem } from "../types";

type SectionBlocksProps = {
  control: Control<SectionsSchemaType>;
  register: UseFormRegister<SectionsSchemaType>;
  sectionIndex: number;
  errors: FieldErrors<SectionsSchemaType>;
};

export function SectionBlocks({
  control,
  register,
  sectionIndex,
  errors,
}: SectionBlocksProps) {
  const { fields, remove, append, replace } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.blocks`,
  });

  const items = useWatch({
    control,
    name: `sections.${sectionIndex}.blocks`,
  });

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleAppendBlock = () => {
    append({
      _id: `temp-${Date.now()}-${Math.random().toString(36)}`,
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
    });
  };

  const handleOrderChange = (blocks: DraggableItem[]) => {
    replace(blocks as BlockSchema[]);
  };

  return (
    <DraggableWrapper items={items} onOrderChange={handleOrderChange}>
      {fields.map((item, index) => (
        <Block
          key={item._id}
          blockId={item._id}
          blockIndex={index}
          sectionIndex={sectionIndex}
          onDelete={() => handleDelete(index)}
          register={register}
          error={errors.sections?.[sectionIndex]?.blocks?.[index]}
        />
      ))}
      <RegularButton
        onClick={handleAppendBlock}
        icon={FaPlus}
        text="Додати новий блок"
      />
    </DraggableWrapper>
  );
}
