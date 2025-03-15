import {
  Button,
  Dialog,
  Portal,
  Input,
  Stack,
  Field,
  createListCollection,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionType } from "../enums/section";
import { sectionSchema, SectionSchema } from "../validation";

type UpsertSectionDialogProps = {
  onSave: (data: SectionSchema) => void;
  section?: SectionSchema;
  isOpen: boolean;
  onClose: () => void;
};

export const UpsertSectionDialog: React.FC<UpsertSectionDialogProps> = ({
  onSave,
  section,
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SectionSchema>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: section?.title || "",
      type: section ? section.type : SectionType.HORIZONTAL,
      _id: section?._id || null,
      blocks: section?.blocks || [],
    },
  });

  const onSubmit = (data: SectionSchema) => {
    onSave(data);
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const sectionTypes = createListCollection({
    items: [
      { label: "Horizontal", value: "horizontal" },
      { label: "Vertical", value: "vertical" },
      { label: "Banner", value: "banner" },
      { label: "Grid", value: "grid" },
    ],
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner onKeyDown={(e) => e.stopPropagation()}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Додати нову секцію</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form id="add-section-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                  <input type="hidden" {...register("_id")} />
                  <input type="hidden" {...register("blocks")} />
                  <Field.Root invalid={!!errors.title}>
                    <Field.Label>Заголовок</Field.Label>
                    <Input
                      id="title"
                      color="black"
                      placeholder="Введіть заголовок секції"
                      {...register("title")}
                    />
                    <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.type}>
                    <Select.Root
                      collection={sectionTypes}
                      width="100%"
                      value={[watch("type")]}
                      onValueChange={(value) => {
                        setValue("type", value.value[0] as SectionType, {
                          shouldValidate: true,
                        });
                      }}
                      {...register("type")}
                    >
                      <Select.HiddenSelect />
                      <Select.Label>Тип секції</Select.Label>
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Обрати тип секції" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content>
                          {sectionTypes.items.map((sectionType) => (
                            <Select.Item
                              item={sectionType}
                              key={sectionType.value}
                            >
                              {sectionType.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                    <Field.ErrorText>{errors.type?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
              </form>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="outline" mr={3} onClick={handleClose}>
                Скасувати
              </Button>
              <Button colorScheme="blue" type="submit" form="add-section-form">
                Зберегти
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
