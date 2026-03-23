import { useEffect, useRef } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import type { CollaborationState } from '../types';

const OTHER_USERS = [
  { userId: 'u1', userName: 'John Doe', color: '#6366f1' },
  { userId: 'u2', userName: 'Mary Sue', color: '#f43f5e' },
  { userId: 'u3', userName: 'Alex Kim', color: '#0ea5e9' },
];

export const usePresence = () => {
  const { tasks, updateCollaboration } = useTaskStore();
  const presenceRef = useRef<CollaborationState[]>([]);

  useEffect(() => {
    if (tasks.length === 0) return;

    const interval = setInterval(() => {
      const newPresence = OTHER_USERS.map((user) => ({
        ...user,
        taskId: Math.random() > 0.1 ? tasks[Math.floor(Math.random() * tasks.length)].id : null,
      }));
      
      presenceRef.current = newPresence;
      updateCollaboration(newPresence);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [tasks, updateCollaboration]);
};
