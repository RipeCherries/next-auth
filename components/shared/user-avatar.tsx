import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  image: string;
}

export function UserAvatar({ image }: UserAvatarProps): React.JSX.Element {
  return (
    <Avatar className="h-20 w-20 border-2">
      <AvatarImage src={image} />
      <AvatarFallback className="bg-gray-900">
        <FaUser className="text-white" size={36} />
      </AvatarFallback>
    </Avatar>
  );
}