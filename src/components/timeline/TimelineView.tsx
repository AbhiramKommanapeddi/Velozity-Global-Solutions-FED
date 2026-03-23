import React, { useMemo, useRef, useEffect } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Priority } from '../../types';

const TimelineView: React.FC = () => {
  const { tasks, filters } = useTaskStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = filters.status.length === 0 || filters.status.includes(task.status);
      const matchesPriority = filters.priority.length === 0 || filters.priority.includes(task.priority);
      const matchesAssignee = filters.assignee.length === 0 || filters.assignee.includes(task.assignee.id);
      return matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [tasks, filters]);

  const getDayPosition = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getMonth() !== month || date.getFullYear() !== year) {
      if (date < new Date(year, month, 1)) return 0;
      return daysInMonth;
    }
    return date.getDate() + (date.getHours() / 24);
  };


  useEffect(() => {
    if (scrollRef.current) {
      const todayPct = (now.getDate() / daysInMonth) * scrollRef.current.scrollWidth;
      scrollRef.current.scrollLeft = todayPct - scrollRef.current.clientWidth / 2;
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex justify-between items-center shrink-0">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          {now.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-1.5"><div className="w-2 hs-2 rounded-full bg-emerald-500"></div> Low</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Medium</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> High</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Critical</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto custom-scrollbar relative">
        <div className="min-w-[1200px] h-full flex flex-col">
          {/* Days Header */}
          <div className="flex border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
            {days.map((day) => {
              const isToday = day === now.getDate();
              return (
                <div
                  key={day}
                  className={`flex-1 min-w-[40px] border-r border-slate-100 py-2.5 text-center text-[10px] font-bold transition-colors ${
                    isToday ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Grid Lines */}
          <div className="absolute top-0 left-0 w-full h-full flex pointer-events-none">
            {days.map((day) => (
              <div key={day} className="flex-1 min-w-[40px] border-r border-slate-100/50 h-full" />
            ))}
          </div>

          {/* Today Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-indigo-500/30 z-40 pointer-events-none"
            style={{ left: `${((now.getDate() - 1 + now.getHours() / 24) / daysInMonth) * 100}%` }}
          >
            <div className="bg-indigo-600 text-white text-[8px] px-1.5 py-0.5 rounded absolute top-0 left-1/2 -translate-x-1/2 font-bold shadow-sm">TODAY</div>
          </div>

          {/* Tasks Bars */}
          <div className="p-6 space-y-3 relative z-20">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-20 text-slate-400 font-medium italic">No tasks in this period</div>
            ) : (
              filteredTasks.slice(0, 100).map((task) => {
                const startPos = getDayPosition(task.startDate || task.dueDate);
                const endPos = getDayPosition(task.dueDate);
                const left = ((startPos - 1) / daysInMonth) * 100;
                const width = Math.max((1 / daysInMonth) * 100, ((endPos - startPos) / daysInMonth) * 100);

                const getBarColor = (priority: Priority) => {
                  switch (priority) {
                    case 'Low': return 'bg-emerald-500';
                    case 'Medium': return 'bg-indigo-500';
                    case 'High': return 'bg-purple-500';
                    case 'Critical': return 'bg-rose-500';
                    default: return 'bg-slate-500';
                  }
                };

                return (
                  <div key={task.id} className="relative h-8 group overflow-visible">
                    <div
                      className={`absolute h-6 rounded border border-white/20 ${getBarColor(task.priority)} shadow-sm opacity-85 group-hover:opacity-100 group-hover:shadow-md transition-all cursor-pointer flex items-center px-2 overflow-hidden`}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        top: '4px',
                      }}
                      title={`${task.title} (${task.priority})`}
                    >
                      <span className="text-[10px] font-bold text-white truncate whitespace-nowrap drop-shadow-sm">
                        {task.title}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
