import React from 'react';
import type { Task } from '../../types';
import { Badge, Avatar } from '../ui/Badge';
import { Calendar, AlertCircle } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onDragStart?: (e: React.PointerEvent, task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging, onDragStart }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done';
  const isToday = new Date(task.dueDate).toDateString() === new Date().toDateString();

  const getDueDateLabel = () => {
    if (isToday) return 'Due Today';
    const diffTime = new Date(task.dueDate).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < -7) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
    return new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const collaboration = useTaskStore((state) => state.collaboration);
  const activeUsers = collaboration.filter((c) => c.taskId === task.id);

  return (
    <div
      onPointerDown={(e) => onDragStart?.(e, task)}
      className={`bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing mb-3 group relative ${
        isDragging ? 'opacity-40 scale-95' : 'opacity-100 hover:border-indigo-300'
      }`}
    >
      {/* Collaboration Indicators */}
      <div className="absolute -top-1.5 -right-1.5 flex -space-x-1.5 overflow-visible">
        {activeUsers.map((user) => (
          <div
            key={user.userId}
            className="h-5 w-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[7px] font-bold text-white ring-1 ring-slate-100"
            style={{ backgroundColor: user.color }}
            title={`${user.userName} is viewing`}
          >
            {user.userName.charAt(0)}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-start mb-3">
        <Badge variant={task.priority}>{task.priority}</Badge>
        <Avatar user={task.assignee} size="sm" />
      </div>

      <h3 className="text-sm font-semibold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
        {task.title}
      </h3>

      <div className="flex items-center justify-between mt-auto">
        <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${
          isOverdue ? 'text-rose-600' : 'text-slate-500'
        }`}>
          {isOverdue && <AlertCircle size={12} />}
          <Calendar size={12} />
          {getDueDateLabel()}
        </div>
        
        <div className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-widest">
          {task.status}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
