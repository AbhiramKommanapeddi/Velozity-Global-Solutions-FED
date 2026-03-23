import { create } from 'zustand';
import type { Task, Status, Priority, CollaborationState } from '../types';
import { generateTasks } from '../utils/dataGenerator';

interface TaskFilters {
  status: Status[];
  priority: Priority[];
  assignee: string[];
  dueDateRange: { from: string | null; to: string | null };
}

interface TaskStore {
  tasks: Task[];
  view: 'kanban' | 'list' | 'timeline';
  filters: TaskFilters;
  collaboration: CollaborationState[];
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, status: Status) => void;
  setView: (view: 'kanban' | 'list' | 'timeline') => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  clearFilters: () => void;
  updateCollaboration: (states: CollaborationState[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: generateTasks(500),
  view: 'kanban',
  filters: {
    status: [],
    priority: [],
    assignee: [],
    dueDateRange: { from: null, to: null },
  },
  collaboration: [],

  setTasks: (tasks) => set({ tasks }),
  
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === taskId ? { ...t, status } : t)
  })),

  setView: (view) => set({ view }),

  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),

  clearFilters: () => set({
    filters: {
      status: [],
      priority: [],
      assignee: [],
      dueDateRange: { from: null, to: null },
    }
  }),

  updateCollaboration: (collaboration) => set({ collaboration }),
}));
