import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { AdvancedCard } from "../cards/AdvancedCard";

const KanbanTask = ({ task, index, isDragDisabled = false }) => {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          className="kanban-task-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanTask;
