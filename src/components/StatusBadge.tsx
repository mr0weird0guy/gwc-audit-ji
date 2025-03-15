
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type TaskStatus = 'pending' | 'ongoing' | 'completed';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return '';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn('font-medium capitalize', getStatusStyles(), className)}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
