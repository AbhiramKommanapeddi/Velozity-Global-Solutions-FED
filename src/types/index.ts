export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'To Do' | 'In Progress' | 'In Review' | 'Done';

export interface User {
  id: string;
  name: string;
  avatar: string; // Initials or short name
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: User;
  startDate?: string; // ISO string
  dueDate: string; // ISO string
}

export interface DragItem {
  taskId: string;
  fromStatus: Status;
}

export interface CollaborationState {
  userId: string;
  userName: string;
  taskId: string | null;
  color: string;
}
