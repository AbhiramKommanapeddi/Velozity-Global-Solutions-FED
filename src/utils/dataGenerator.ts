import type { Task, User, Priority, Status } from '../types';

const USERS: User[] = [
  { id: '1', name: 'Alice Smith', avatar: 'AS', color: '#3B82F6' },
  { id: '2', name: 'Bob Johnson', avatar: 'BJ', color: '#EF4444' },
  { id: '3', name: 'Charlie Brown', avatar: 'CB', color: '#10B981' },
  { id: '4', name: 'Diana Prince', avatar: 'DP', color: '#F59E0B' },
  { id: '5', name: 'Ethan Hunt', avatar: 'EH', color: '#8B5CF6' },
  { id: '6', name: 'Fiona Apple', avatar: 'FA', color: '#EC4899' },
];

const PRIORITIES: Priority[] = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES: Status[] = ['To Do', 'In Progress', 'In Review', 'Done'];

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateTitle = (i: number) => {
  const verbs = ['Fix', 'Implement', 'Test', 'Review', 'Update', 'Refactor', 'Design'];
  const nouns = ['Database', 'UI', 'Backend', 'Frontend', 'Auth', 'API', 'Logging', 'Analytics'];
  return `${randomItem(verbs)} ${randomItem(nouns)} Module #${i + 1}`;
};

const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

export const generateTasks = (count: number): Task[] => {
  const tasks: Task[] = [];
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  for (let i = 0; i < count; i++) {
    const hasStartDate = Math.random() > 0.2;
    const dueDate = getRandomDate(
      new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000)  // 20 days later
    );

    tasks.push({
      id: `task-${i + 1}`,
      title: generateTitle(i),
      description: `This is a sample description for task #${i + 1}. It involves complex frontend engineering tasks.`,
      status: randomItem(STATUSES),
      priority: randomItem(PRIORITIES),
      assignee: randomItem(USERS),
      startDate: hasStartDate ? getRandomDate(startOfMonth, new Date(dueDate)) : undefined,
      dueDate,
    });
  }
  return tasks;
};

export const MOCK_USERS = USERS;
