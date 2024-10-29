import { getLoggedInUser } from '@/features/auth/queries';
import EditWorkspaceForm from '@/features/workspaces/components/edit-workspace-form';
import { getWorkspace } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import React from 'react';

interface WorkspaceIDSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspaceIDSettingsPage({
  params,
}: WorkspaceIDSettingsPageProps) {
  const user = await getLoggedInUser();
  if (!user) redirect('/sign-in');

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  if (!initialValues) redirect(`/workspace/${params.workspaceId}`);

  return (
    <div className='w-full lg:max-w-xl'>
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
