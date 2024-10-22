interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';

const WorkspaceAvatar: React.FC<WorkspaceAvatarProps> = ({
  image,
  name,
  className,
}) => {
  if (image) {
    return (
      <div
        className={cn('relative size-10 rounded-md overflow-hidden', className)}
      >
        <Image src={image} alt={name} fill className='object-cover' />
      </div>
    );
  }

  return (
    <Avatar className={cn('size-10 rounded-md', className)}>
      <AvatarFallback className='rounded-md bg-blue-700 text-white font-semibold text-lg uppercase'>
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
