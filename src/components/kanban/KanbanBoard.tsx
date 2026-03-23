import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import KanbanColumn from './KanbanColumn';
import type { Status } from '../../types';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import TaskCard from './TaskCard';

const KanbanBoard: React.FC = () => {
  const { tasks, filters } = useTaskStore();
  const {
    draggedTask,
    dropTarget,
    dragPosition,
    dragOffset,
    onDragStart,
    onDragMove,
    onDragEnd,
  } = useDragAndDrop();

  const filteredTasks = tasks.filter((task) => {
    // ... filtering remains the same
    const matchesStatus = filters.status.length === 0 || filters.status.includes(task.status);
    const matchesPriority = filters.priority.length === 0 || filters.priority.includes(task.priority);
    const matchesAssignee = filters.assignee.length === 0 || filters.assignee.includes(task.assignee.id);
    const matchesDate = (!filters.dueDateRange.from || task.dueDate >= filters.dueDateRange.from) &&
                        (!filters.dueDateRange.to || task.dueDate <= filters.dueDateRange.to);
    
    return matchesStatus && matchesPriority && matchesAssignee && matchesDate;
  });


  return (
    <div 
      className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar bg-slate-50"
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerLeave={onDragEnd}
    >
      <div className="flex gap-6 p-6 h-full min-w-max">
        {(['To Do', 'In Progress', 'In Review', 'Done'] as Status[]).map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={filteredTasks.filter((t) => t.status === status)}
            isOver={dropTarget === status}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            draggedTaskId={draggedTask?.id}
          />
        ))}
      </div>

      {/* Dragged Ghost Card */}
      {draggedTask && (
        <div
          className="fixed pointer-events-none z-50 opacity-80 shadow-2xl scale-105"
          style={{
            left: dragPosition.x - dragOffset.x,
            top: dragPosition.y - dragOffset.y,
            width: '300px', // Matches column width roughly
          }}
        >
          <TaskCard task={draggedTask} />
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
