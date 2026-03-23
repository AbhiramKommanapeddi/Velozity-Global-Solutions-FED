import React, { useState, useMemo } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Task, Status } from '../../types';
import VirtualList from './VirtualList.tsx';
import { ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { Badge, Avatar } from '../ui/Badge';

type SortConfig = {
  key: keyof Task | 'assignee.name';
  direction: 'asc' | 'desc';
} | null;

const ListView: React.FC = () => {
  const { tasks, filters, updateTaskStatus } = useTaskStore();
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = filters.status.length === 0 || filters.status.includes(task.status);
      const matchesPriority = filters.priority.length === 0 || filters.priority.includes(task.priority);
      const matchesAssignee = filters.assignee.length === 0 || filters.assignee.includes(task.assignee.id);
      const matchesDate = (!filters.dueDateRange.from || task.dueDate >= filters.dueDateRange.from) &&
                          (!filters.dueDateRange.to || task.dueDate <= filters.dueDateRange.to);
      return matchesStatus && matchesPriority && matchesAssignee && matchesDate;
    });
  }, [tasks, filters]);

  const sortedTasks = useMemo(() => {
    if (!sortConfig) return filteredTasks;

    return [...filteredTasks].sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof Task];
      let bValue: any = b[sortConfig.key as keyof Task];

      if (sortConfig.key === 'assignee.name') {
        aValue = a.assignee.name;
        bValue = b.assignee.name;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTasks, sortConfig]);

  const handleSort = (key: keyof Task | 'assignee.name') => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig?.key !== column) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />;
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-2.5 border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-widest sticky top-0 z-10">
        <div className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('title')}>
          Task <SortIcon column="title" />
        </div>
        <div className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('status')}>
          Status <SortIcon column="status" />
        </div>
        <div className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('priority')}>
          Priority <SortIcon column="priority" />
        </div>
        <div className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('assignee.name')}>
          Assignee <SortIcon column="assignee.name" />
        </div>
        <div className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort('dueDate')}>
          Due Date <SortIcon column="dueDate" />
        </div>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        {sortedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
            <p className="text-sm font-medium">No tasks found matching your filters</p>
          </div>
        ) : (
          <VirtualList
            items={sortedTasks}
            rowHeight={56}
            renderRow={(task: Task) => (
              <div key={task.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 items-center hover:bg-slate-50 border-b border-slate-100 transition-colors h-[56px] group">
                <div className="text-sm font-semibold text-slate-700 truncate group-hover:text-indigo-600">{task.title}</div>
                <div>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as Status)}
                    className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors hover:bg-slate-200"
                  >
                    {['To Do', 'In Progress', 'In Review', 'Done'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Badge variant={task.priority}>{task.priority}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar user={task.assignee} size="sm" />
                  <span className="text-xs font-medium text-slate-600 truncate">{task.assignee.name}</span>
                </div>
                <div className={`text-[10px] font-bold uppercase ${new Date(task.dueDate) < new Date() && task.status !== 'Done' ? 'text-rose-600' : 'text-slate-500'}`}>
                  {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <button className="text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 p-1.5 rounded-md border border-slate-200 opacity-0 group-hover:opacity-100">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default ListView;
