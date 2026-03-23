import React from 'react';
import { useTaskStore } from './store/useTaskStore';
import Header from './components/layout/Header.tsx';
import FilterBar from './components/layout/FilterBar.tsx';
import KanbanBoard from './components/kanban/KanbanBoard.tsx';
import ListView from './components/list/ListView.tsx';
import TimelineView from './components/timeline/TimelineView.tsx';

import { useURLFilters } from './hooks/useURLFilters';
import { usePresence } from './hooks/usePresence';

const App: React.FC = () => {
  const { view } = useTaskStore();
  useURLFilters();
  usePresence();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-transparent">
      <Header />
      <FilterBar />
      <main className="flex-1 overflow-hidden">
        {view === 'kanban' && <KanbanBoard />}
        {view === 'list' && <ListView />}
        {view === 'timeline' && <TimelineView />}
      </main>
    </div>
  );
};

export default App;
