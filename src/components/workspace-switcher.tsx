'use client';

import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import React from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import WorkspaceAvatar from '@/features/workspaces/components/workspace-avatar';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import useCreateWorkspaceModal from '@/features/workspaces/hooks/use-create-workspace-modal';

const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspaces();
  const { open } = useCreateWorkspaceModal();
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-center justify-between'>
        <p className='text-xs uppercase text-neutral-500'>Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className='size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition'
        />
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className='w-full bg-neutral-200 font-medium p-1'>
          <SelectValue placeholder='Select a workspace' />
        </SelectTrigger>
        <SelectContent>
          {workspaces && workspaces?.documents.length > 0 ? (
            workspaces?.documents.map((workspace) => (
              <SelectItem
                className='cursor-pointer'
                key={workspace.$id}
                value={workspace.$id}
              >
                <div className='flex items-center justify-start gap-3'>
                  <WorkspaceAvatar
                    image={workspace.imageUrl}
                    name={workspace.name}
                  />
                  <span className='truncate'>{workspace.name}</span>
                </div>
              </SelectItem>
            ))
          ) : (
            <div>No workspaces.</div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
