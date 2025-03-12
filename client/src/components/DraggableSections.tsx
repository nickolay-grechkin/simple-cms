import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@chakra-ui/react";
import { Section } from "../types/section";

function SortableItem({ section }: { section: Section }) {
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
    backgroundColor: isDragging ? "#f0f0ff" : "red",
    border: "1px solid #ddd",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    boxShadow: isDragging ? "0 0 5px rgba(0, 0, 0, 0.2)" : "none",
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ marginRight: "10px", cursor: "grab" }}>⠿</div>
      <div>{section.title}</div>
    </div>
  );
}

export default function DraggableSections({
  screenSections,
  onSave,
}: {
  screenSections: Section[];
  onSave: (sections: Section[]) => void;
}) {
  const [sections, setSections] = useState<Section[]>(screenSections);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => item._id === active.id
        );
        const newIndex = currentItems.findIndex((item) => item._id === over.id);

        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  }

  const handleSave = () => {
    const mappedSections = sections.map((section, index) => ({
      ...section,
      order: index,
    }));

    onSave(mappedSections);
  };

  return (
    <div style={{ width: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Сортований список секцій</h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((section) => section._id)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {sections.map((section) => (
              <SortableItem key={section._id} section={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
