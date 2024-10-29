import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function WorkspaceIDPage() {
  const user = await getLoggedInUser();
  if (!user) redirect('/sign-in');

  return <div>WorkspaceIDPage</div>;
}
