import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Section } from "../types/section";

export function SortableItem({ section }: { section: Section }) {
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
    boxShadow: isDragging ? "0 0 5px rgba(0, 0, 0, 0.2)" : "none",
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ marginRight: "10px", cursor: "grab" }}>⠿</div>
      <div>{section.title}</div>
      <div>{section.type}</div>
    </div>
  );
}

export default function DraggableWrapper({
  sections,
  onOrderChange,
  children,
}: {
  sections: any[];
  onOrderChange: (sections: any[]) => void;
  children: React.ReactNode;
}) {
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
      const oldIndex = sections.findIndex((item) => item._id === active.id);
      const newIndex = sections.findIndex((item) => item._id === over.id);

      onOrderChange(arrayMove(sections, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((section) => section._id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
