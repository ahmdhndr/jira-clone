import { getLoggedInUser } from '@/features/auth/queries';
import { getWorkspaces } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';
import { Models } from 'node-appwrite';

export default async function Home() {
  const user = await getLoggedInUser();
  if (!user) redirect('/sign-in');

  const workspaces = await getWorkspaces();
  if (workspaces.total === 0) {
    redirect('/workspaces/create');
  } else {
    redirect(
      `/workspaces/${
        (workspaces as Models.DocumentList<Models.Document>).documents[0].$id
      }`
    );
  }
}
