import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { LayoutGrid, List, BarChart2 } from 'lucide-react';

const Header: React.FC = () => {
  const { view, setView, collaboration } = useTaskStore();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between z-50 shrink-0 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-md">
            <LayoutGrid className="text-white" size={18} />
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Velozity <span className="text-indigo-600">Sync</span>
          </h1>
        </div>
        
        <div className="h-6 w-[1px] bg-slate-200 mx-2" />
        
        <nav className="flex gap-1">
          {(['kanban', 'list', 'timeline'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                view === v 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {v === 'kanban' && <LayoutGrid size={16} />}
              {v === 'list' && <List size={16} />}
              {v === 'timeline' && <BarChart2 size={16} />}
              <span className="capitalize">{v}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex -space-x-2">
            {collaboration.slice(0, 3).map((user) => (
              <div
                key={user.userId}
                className="h-7 w-7 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: user.color }}
                title={user.userName}
              >
                {user.userName.charAt(0)}
              </div>
            ))}
            {collaboration.length > 3 && (
              <div className="h-7 w-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">
                +{collaboration.length - 3}
              </div>
            )}
          </div>
          <div className="h-4 w-[1px] bg-slate-300" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider leading-none">Live</span>
            <span className="text-[10px] font-medium text-slate-500 leading-none">Editing</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
