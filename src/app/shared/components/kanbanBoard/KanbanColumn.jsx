import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import KanbanTask from "./KanbanTask";

const KanbanColumn = ({ column, tasks }) => {
  const [title, setTitle] = useState(column.title);
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);

  return (
    <div className="kanban-column-container">
      {isHeaderClicked ? (
        <input value={title} />
      ) : (
        <h3
          className="kanban-column-title"
          // onClick={() => setIsHeaderClicked(true)}
        >
          {title}
        </h3>
      )}

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className="kanban-task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <KanbanTask key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
