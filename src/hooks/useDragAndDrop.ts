import { useState, useCallback } from 'react';
import type { Task, Status } from '../types';
import { useTaskStore } from '../store/useTaskStore';

export const useDragAndDrop = () => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dropTarget, setDropTarget] = useState<Status | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const onDragStart = useCallback((e: React.PointerEvent, task: Task) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDraggedTask(task);
    setDragPosition({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Capture the pointer to keep receiving events even if moved outside the original element
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onDragMove = useCallback((e: React.PointerEvent) => {
    if (!draggedTask) return;
    
    setDragPosition({ x: e.clientX, y: e.clientY });

    // Find the element under the pointer to determine the drop target
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    const column = elem?.closest('[data-status]');
    if (column) {
      setDropTarget(column.getAttribute('data-status') as Status);
    } else {
      setDropTarget(null);
    }
  }, [draggedTask]);

  const onDragEnd = useCallback((e: React.PointerEvent) => {
    if (!draggedTask) return;

    if (dropTarget && dropTarget !== draggedTask.status) {
      updateTaskStatus(draggedTask.id, dropTarget);
    }

    setDraggedTask(null);
    setDropTarget(null);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  }, [draggedTask, dropTarget, updateTaskStatus]);

  return {
    draggedTask,
    dropTarget,
    dragPosition,
    dragOffset,
    onDragStart,
    onDragMove,
    onDragEnd,
  };
};
