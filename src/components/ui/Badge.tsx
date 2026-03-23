import React from 'react';
import type { Priority, Status, User } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Priority | Status | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants: Record<string, string> = {
    Low: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-blue-100 text-blue-700 border-blue-200',
    High: 'bg-orange-100 text-orange-700 border-orange-200',
    Critical: 'bg-red-100 text-red-700 border-red-200',
    'To Do': 'bg-slate-100 text-slate-700 border-slate-200',
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
    'In Review': 'bg-purple-100 text-purple-700 border-purple-200',
    Done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ user, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-6 w-6 text-[10px]',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm',
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white border-2 border-white shadow-sm flex-shrink-0 ${sizes[size]} ${className}`}
      style={{ backgroundColor: user.color }}
      title={user.name}
    >
      {user.avatar}
    </div>
  );
};
