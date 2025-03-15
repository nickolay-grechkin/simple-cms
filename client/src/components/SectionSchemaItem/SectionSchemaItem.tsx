import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdDragIndicator } from "react-icons/md";
import { DeletePopover } from "../DeletePopover/DeletePopover";
import { UpsertSectionDialog } from "../UpsertSectionDialog";
import { useState } from "react";
import { RegularButton } from "../RegularButton/RegularButton";
import { FiEdit3 } from "react-icons/fi";
import { useUpsertSection } from "../../api/screens";
import { SectionSchema } from "../../validation";

type SectionSchemaItemProps = {
  section: SectionSchema;
  screenId: string;
  onDelete: (sectionId: string) => void;
};

export const SectionSchemaItem = ({
  screenId,
  section,
  onDelete,
}: SectionSchemaItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._id ?? "" });
  const { mutate: upsertSection } = useUpsertSection();

  const [isUpsertSectionDialogOpen, setIsUpsertSectionDialogOpen] =
    useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    paddingRight: "32px",
    margin: "5px 0",
    backgroundColor: isDragging ? "#f0f0ff" : "white",
    color: "black",
    border: "1px solid #ddd",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    boxShadow: "0 2px 5px #0000001a",
    zIndex: isDragging ? 1 : 0,
  };

  const handleUpsertSectionDialogOpen = () => {
    setIsUpsertSectionDialogOpen(true);
  };

  const handleUpsertSectionDialogClose = () => {
    setIsUpsertSectionDialogOpen(false);
  };

  const handleDelete = () => {
    if (section._id) {
      onDelete(section._id);
    }
  };

  const handleUpsertSection = async (section: SectionSchema) => {
    upsertSection(
      {
        screenId,
        section,
      },
      {
        onSuccess: () => {
          setIsUpsertSectionDialogOpen(false);
        },
      }
    );
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Flex alignItems="center" gap="10px">
        <Icon as={MdDragIndicator} marginRight="10px" cursor="grab" />
        <Box>
          <Text color="black" fontWeight="bold">
            Заголовок: {section.title}
          </Text>
          <Text color="#848484">Тип: {section.type}</Text>
        </Box>
      </Flex>
      <Flex gap="10px" alignItems="center">
        <RegularButton
          onClick={handleUpsertSectionDialogOpen}
          icon={FiEdit3}
          text="Редагувати секцію"
        />
        <DeletePopover onDelete={handleDelete} />
        {isUpsertSectionDialogOpen && (
          <UpsertSectionDialog
            onSave={handleUpsertSection}
            section={section}
            isOpen={isUpsertSectionDialogOpen}
            onClose={handleUpsertSectionDialogClose}
          />
        )}
      </Flex>
    </div>
  );
};
