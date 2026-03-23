import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import type { Status, Priority } from '../types';

export const useURLFilters = () => {
  const { filters, setFilters } = useTaskStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.getAll('status') as Status[];
    const priority = params.getAll('priority') as Priority[];
    const assignee = params.getAll('assignee');
    const from = params.get('from');
    const to = params.get('to');

    if (status.length > 0 || priority.length > 0 || assignee.length > 0 || from || to) {
      setFilters({
        status,
        priority,
        assignee,
        dueDateRange: { from, to },
      });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    filters.status.forEach((s) => params.append('status', s));
    filters.priority.forEach((p) => params.append('priority', p));
    filters.assignee.forEach((a) => params.append('assignee', a));
    if (filters.dueDateRange.from) params.set('from', filters.dueDateRange.from);
    if (filters.dueDateRange.to) params.set('to', filters.dueDateRange.to);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);
};
