import {
  Input,
  Stack,
  Field,
  Accordion,
  Flex,
  IconButton,
  Popover,
  Portal,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbDotsVertical } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const itemSchema = z.object({
  _id: z.string().min(1, "ID обов'язковий"),
  title: z.string().min(1, "Заголовок обов'язковий"),
  description: z.string().min(1, "Опис обов'язковий"),
  imageUrl: z.string().min(1, "URL зображення обов'язковий"),
  actionUrl: z.string().min(1, "URL дії обов'язковий"),
  order: z.number().min(0, "Порядок обов'язковий"),
});

export type ItemFormData = z.infer<typeof itemSchema>;

interface AddItemDialogProps {
  item: ItemFormData;
  onSave: (data: ItemFormData) => void;
  onDelete: (id: string) => void;
}

export function EditItemForm({ onSave, item, onDelete }: AddItemDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      actionUrl: item.actionUrl,
      order: item.order,
    },
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSubmit = (data: ItemFormData) => {
    onSave(data);
    reset();
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemId: string
  ) => {
    e.stopPropagation();
    onDelete(itemId);
  };

  return (
    <Accordion.Root
      collapsible
      width="50%"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <Accordion.Item
        value={item._id}
        border="1px solid #f0f0f0"
        borderRadius="4px"
      >
        <Accordion.ItemTrigger
          paddingLeft="13px"
          borderRadius="4px 4px 0 0"
          backgroundColor="#f5f5f5"
          minHeight="35px"
        >
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Accordion.ItemIndicator />
            <Popover.Root>
              <Popover.Trigger onClick={(e) => e.stopPropagation()}>
                <IconButton
                  backgroundColor="transparent"
                  aria-label="Toggle item"
                  width="20px"
                  height="20px"
                  color="#848484"
                >
                  <TbDotsVertical />
                </IconButton>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content maxWidth="210px">
                    <Popover.Body padding="7px">
                      <Button
                        maxHeight="23px"
                        backgroundColor="transparent"
                        color="#ff5e49"
                        onClick={(e) => handleDelete(e, item._id)}
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
          <form id="add-section-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Field.Root invalid={!!errors.title}>
                <Field.Label>Заголовок</Field.Label>
                <Input
                  id="title"
                  color="black"
                  placeholder="Введіть заголовок компоненту"
                  {...register("title")}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.title}>
                <Field.Label>Опис</Field.Label>
                <Input
                  id="title"
                  color="black"
                  placeholder="Введіть опис компоненту"
                  {...register("description")}
                />
                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.title}>
                <Field.Label>URL зображення</Field.Label>
                <Input
                  id="title"
                  color="black"
                  placeholder="Введіть URL зображення"
                  {...register("imageUrl")}
                />
                <Field.ErrorText>{errors.imageUrl?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.title}>
                <Field.Label>URL дії</Field.Label>
                <Input
                  id="title"
                  color="black"
                  placeholder="Введіть URL дії"
                  {...register("actionUrl")}
                />
                <Field.ErrorText>{errors.actionUrl?.message}</Field.ErrorText>
              </Field.Root>
            </Stack>
          </form>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}
