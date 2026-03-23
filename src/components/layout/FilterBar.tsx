import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { X, Filter, ChevronDown } from 'lucide-react';
import type { Status, Priority } from '../../types';
import { MOCK_USERS } from '../../utils/dataGenerator';

const FilterBar: React.FC = () => {
  const { filters, setFilters, clearFilters } = useTaskStore();

  const handleStatusChange = (status: Status) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    setFilters({ status: newStatus });
  };

  const handlePriorityChange = (priority: Priority) => {
    const newPriority = filters.priority.includes(priority)
      ? filters.priority.filter((p) => p !== priority)
      : [...filters.priority, priority];
    setFilters({ priority: newPriority });
  };

  const handleAssigneeChange = (userId: string) => {
    const newAssignee = filters.assignee.includes(userId)
      ? filters.assignee.filter((id) => id !== userId)
      : [...filters.assignee, userId];
    setFilters({ assignee: newAssignee });
  };

  const hasActiveFilters = 
    filters.status.length > 0 || 
    filters.priority.length > 0 || 
    filters.assignee.length > 0 || 
    filters.dueDateRange.from !== null || 
    filters.dueDateRange.to !== null;

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center gap-4 z-40 shrink-0 overflow-x-auto custom-scrollbar shadow-sm">
      <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider whitespace-nowrap mr-2">
        <Filter size={14} className="text-indigo-600" />
        Filter By
      </div>

      <div className="flex items-center gap-2">
        {/* Status Filter */}
        <div className="relative group">
          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 border ${
            filters.status.length > 0 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
              : 'text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}>
            Status
            {filters.status.length > 0 && (
              <span className="bg-indigo-600 text-white min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold px-1">
                {filters.status.length}
              </span>
            )}
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          <div className="absolute top-full left-0 mt-1 w-48 rounded-lg bg-white shadow-xl border border-slate-200 hidden group-hover:block z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
            {(['To Do', 'In Progress', 'In Review', 'Done'] as Status[]).map((s) => (
              <label key={s} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.status.includes(s)}
                  onChange={() => handleStatusChange(s)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-3"
                />
                <span className={`text-sm ${filters.status.includes(s) ? 'text-indigo-700 font-semibold' : 'text-slate-700'}`}>{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="relative group">
          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 border ${
            filters.priority.length > 0 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
              : 'text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}>
            Priority
            {filters.priority.length > 0 && (
              <span className="bg-indigo-600 text-white min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold px-1">
                {filters.priority.length}
              </span>
            )}
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          <div className="absolute top-full left-0 mt-1 w-48 rounded-lg bg-white shadow-xl border border-slate-200 hidden group-hover:block z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
            {(['Low', 'Medium', 'High', 'Critical'] as Priority[]).map((p) => (
              <label key={p} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.priority.includes(p)}
                  onChange={() => handlePriorityChange(p)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-3"
                />
                <span className={`text-sm ${filters.priority.includes(p) ? 'text-indigo-700 font-semibold' : 'text-slate-700'}`}>{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Assignee Filter */}
        <div className="relative group">
          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 border ${
            filters.assignee.length > 0 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
              : 'text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}>
            Assignee
            {filters.assignee.length > 0 && (
              <span className="bg-indigo-600 text-white min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold px-1">
                {filters.assignee.length}
              </span>
            )}
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          <div className="absolute top-full left-0 mt-1 w-56 rounded-lg bg-white shadow-xl border border-slate-200 hidden group-hover:block z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
            {MOCK_USERS.map((user) => (
              <label key={user.id} className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.assignee.includes(user.id)}
                  onChange={() => handleAssigneeChange(user.id)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-3"
                />
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.avatar}
                  </div>
                  <span className="text-sm text-slate-700">{user.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Date Filters */}
        <div className="flex items-center gap-2 px-3 py-1 border border-slate-200 bg-slate-50 rounded-md">
          <input
            type="date"
            value={filters.dueDateRange.from || ''}
            onChange={(e) => setFilters({ dueDateRange: { ...filters.dueDateRange, from: e.target.value || null } })}
            className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          />
          <span className="text-slate-400 text-xs">→</span>
          <input
            type="date"
            value={filters.dueDateRange.to || ''}
            onChange={(e) => setFilters({ dueDateRange: { ...filters.dueDateRange, to: e.target.value || null } })}
            className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-md text-xs font-bold transition-all duration-200"
          >
            <X size={14} />
            CLear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
