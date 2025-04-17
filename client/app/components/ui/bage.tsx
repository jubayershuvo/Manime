// components/ui/badge.tsx
import React from 'react';
import { cn } from '../../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white bg-gray-500',
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
