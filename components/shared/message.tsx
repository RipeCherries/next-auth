import React from 'react';
import { MdErrorOutline, MdCheck } from 'react-icons/md';
import { cn } from '@/lib/utils';

interface MessageProps {
  type: 'success' | 'error';
  message: string;
}

export function Message({ type, message }: MessageProps): React.JSX.Element {
  return (
    <div className={cn(
      'w-full flex items-center gap-2 py-2 px-2 border-2 rounded-md', {
        'bg-green-100 border-green-200': type === 'success',
        'bg-red-100 border-red-200': type === 'error'
      }
    )}>
      {
        type === 'success'
          ? <MdCheck size={20} color="#16A34A" />
          : <MdErrorOutline size={20} color="#DC2626" />
      }
      <p className={cn('font-medium', {
        'text-green-600': type === 'success',
        'text-red-600': type === 'error'
      })}>
        {message}
      </p>
    </div>
  );
}