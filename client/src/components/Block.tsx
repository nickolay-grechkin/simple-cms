import { Accordion, Flex, Stack, Field, Input } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities";
import { BlockSchema, SectionsSchemaType } from "../validation";
import { DeletePopover } from "./DeletePopover/DeletePopover";

type BlockProps = {
  sectionIndex: number;
  blockIndex: number;
  blockId: string;
  register: UseFormRegister<SectionsSchemaType>;
  onDelete: () => void;
  error?: FieldErrors<BlockSchema>;
};

export const Block: React.FC<BlockProps> = ({
  sectionIndex,
  blockIndex,
  blockId,
  register,
  onDelete,
  error,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: blockId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Accordion.Root
      collapsible
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Accordion.Item
        value={blockId}
        border="1px solid #f0f0f0"
        borderRadius="4px"
      >
        <Accordion.ItemTrigger
          padding="0 13px"
          borderRadius="4px 4px 0 0"
          backgroundColor="#f5f5f5"
          minHeight="35px"
        >
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Accordion.ItemIndicator />
            <DeletePopover onDelete={handleDelete} />
          </Flex>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent padding="1.5rem">
          <Stack>
            <Field.Root invalid={!!error?.title}>
              <Field.Label>Заголовок</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть заголовок компоненту"
                {...register(
                  `sections.${sectionIndex}.blocks.${blockIndex}.title`
                )}
              />
              <Field.ErrorText>{error?.title?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!error?.description}>
              <Field.Label>Опис</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть опис компоненту"
                {...register(
                  `sections.${sectionIndex}.blocks.${blockIndex}.description`
                )}
              />
              <Field.ErrorText>{error?.description?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!error?.imageUrl}>
              <Field.Label>URL зображення</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть URL зображення"
                {...register(
                  `sections.${sectionIndex}.blocks.${blockIndex}.imageUrl`
                )}
              />
              <Field.ErrorText>{error?.imageUrl?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!error?.videoUrl}>
              <Field.Label>URL відео</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть URL дії"
                {...register(
                  `sections.${sectionIndex}.blocks.${blockIndex}.videoUrl`
                )}
              />
              <Field.ErrorText>{error?.videoUrl?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};
