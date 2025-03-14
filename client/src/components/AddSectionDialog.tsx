import {
  Button,
  Dialog,
  Portal,
  Input,
  Stack,
  CloseButton,
  Field,
  SelectRoot,
  SelectItem,
  SelectTrigger,
  SelectValueText,
  createListCollection,
  SelectContent,
  SelectLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionType } from "../enums/section";

// Define the schema for form validation
const sectionSchema = z.object({
  title: z.string().min(1, "Заголовок обов'язковий"),
  type: z.enum(
    [
      SectionType.HORIZONTAL,
      SectionType.VERTICAL,
      SectionType.BANNER,
      SectionType.GRID,
    ],
    {
      errorMap: () => ({ message: "Оберіть тип секції" }),
    }
  ),
});

type SectionFormData = z.infer<typeof sectionSchema>;

interface AddSectionDialogProps {
  onSave: (data: SectionFormData) => void;
}

export function AddSectionDialog({ onSave }: AddSectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      type: undefined,
    },
  });

  const onSubmit = (data: SectionFormData) => {
    console.log(data);
    onSave(data);
    setIsOpen(false);
    reset();
  };

  const handleClose = () => {
    setIsOpen(false);
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
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => setIsOpen(details.open)}
    >
      <Dialog.Trigger colorScheme="blue">Додати секцію</Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Додати нову секцію</Dialog.Title>
              {/* <Dialog.CloseTrigger>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger> */}
            </Dialog.Header>

            <Dialog.Body>
              <form id="add-section-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack>
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
                    <Field.Label>Тип секції</Field.Label>
                    {/* <SelectRoot
                      collection={sectionTypes}
                      size="sm"
                      width="320px"
                      color="black"
                      {...register("type")}
                    >
                      <SelectLabel>Select framework</SelectLabel>
                      <SelectTrigger>
                        <SelectValueText placeholder="Select movie" />
                      </SelectTrigger>
                      <SelectContent color="black">
                        {sectionTypes.items.map((type) => (
                          <SelectItem item={type} key={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot> */}
                    <select {...register("type")}>
                      <option value="horizontal">Horizontal</option>
                      <option value="vertical">Vertical</option>
                      <option value="banner">Banner</option>
                      <option value="grid">Grid</option>
                    </select>
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
}
