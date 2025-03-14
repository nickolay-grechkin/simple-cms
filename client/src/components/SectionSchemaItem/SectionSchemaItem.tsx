import { useSortable } from "@dnd-kit/sortable";
import { Section } from "../../types/section";
import { CSS } from "@dnd-kit/utilities";

type SectionSchemaItemProps = {
  section: Section;
};

export const SectionSchemaItem = ({ section }: SectionSchemaItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px 0",
    backgroundColor: isDragging ? "#f0f0ff" : "white",
    color: "black",
    border: "1px solid #ddd",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 2px 5px #0000001a",
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ marginRight: "10px", cursor: "grab" }}>⠿</div>
      <div>{section.title}</div>
      <div>{section.type}</div>
    </div>
  );
};
