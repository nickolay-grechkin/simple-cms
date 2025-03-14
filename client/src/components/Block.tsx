import {
  Accordion,
  Flex,
  Popover,
  Portal,
  Button,
  Icon,
  Stack,
  Field,
  Input,
  Text,
} from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { SectionsSchemaType } from "../pages/ContentLayout";
import { UseFormRegister } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities";
import { TbDotsVertical } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

type BlockProps = {
  sectionIndex: number;
  blockIndex: number;
  blockId: string;
  register: UseFormRegister<SectionsSchemaType>;
  onDelete: () => void;
};

export const Block: React.FC<BlockProps> = ({
  sectionIndex,
  blockIndex,
  blockId,
  register,
  onDelete,
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
      width="50%"
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
            <Popover.Root>
              <Popover.Trigger onClick={(e) => e.stopPropagation()}>
                <Icon
                  backgroundColor="transparent"
                  aria-label="Toggle item"
                  width="20px"
                  height="20px"
                  color="#848484"
                >
                  <TbDotsVertical />
                </Icon>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content maxWidth="210px">
                    <Popover.Body padding="7px">
                      <Button
                        maxHeight="23px"
                        backgroundColor="transparent"
                        color="#ff5e49"
                        onClick={handleDelete}
                      >
                        <Icon as={FaRegTrashAlt} />
                        <Text>Видалити</Text>
                      </Button>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          </Flex>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent padding="1.5rem">
          <Stack>
            <Field.Root>
              <Field.Label>Заголовок</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть заголовок компоненту"
                {...register(
                  `sections.${sectionIndex}.items.${blockIndex}.title`
                )}
              />
              {/* <Field.ErrorText>{errors.title?.message}</Field.ErrorText> */}
            </Field.Root>
            <Field.Root>
              <Field.Label>Опис</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть опис компоненту"
                {...register(
                  `sections.${sectionIndex}.items.${blockIndex}.description`
                )}
              />
              {/* <Field.ErrorText>{errors.description?.message}</Field.ErrorText> */}
            </Field.Root>
            <Field.Root>
              <Field.Label>URL зображення</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть URL зображення"
                {...register(
                  `sections.${sectionIndex}.items.${blockIndex}.imageUrl`
                )}
              />
              {/* <Field.ErrorText>{errors.imageUrl?.message}</Field.ErrorText> */}
            </Field.Root>
            <Field.Root>
              <Field.Label>URL дії</Field.Label>
              <Input
                id="title"
                color="black"
                placeholder="Введіть URL дії"
                {...register(
                  `sections.${sectionIndex}.items.${blockIndex}.actionUrl`
                )}
              />
              {/* <Field.ErrorText>{errors.actionUrl?.message}</Field.ErrorText> */}
            </Field.Root>
          </Stack>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};
