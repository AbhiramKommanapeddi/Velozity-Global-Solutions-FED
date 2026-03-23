import React from 'react';
import type { Task, Status } from '../../types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  status: Status;
  tasks: Task[];
  isOver?: boolean;
  onDragStart: (e: React.PointerEvent, task: Task) => void;
  onDragMove: (e: React.PointerEvent) => void;
  onDragEnd: (e: React.PointerEvent) => void;
  draggedTaskId?: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  status, 
  tasks, 
  isOver, 
  onDragStart, 
  onDragMove, 
  onDragEnd,
  draggedTaskId 
}) => {
  return (
    <div 
      data-status={status}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      className={`kanban-column flex flex-col h-full bg-slate-100/80 rounded-xl border border-slate-200/60 transition-all duration-300 overflow-hidden ${
        isOver ? 'bg-indigo-50 border-indigo-200 ring-4 ring-indigo-500/10' : ''
      }`}
    >
      <div className="p-4 flex items-center justify-between shrink-0 bg-slate-50/50 border-b border-slate-200/40">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-slate-600 text-[11px] uppercase tracking-widest">{status}</h2>
          <span className="bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-slate-300/30">
            {tasks.length}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar min-h-[200px]">
        {tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
            <p className="text-sm font-medium">No tasks in {status}</p>
            <p className="text-xs mt-1">Drag tasks here to change status</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              isDragging={draggedTaskId === task.id}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
