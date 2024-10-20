import { getLoggedInUser } from '@/features/auth/actions';
import { UserButton } from '@/features/auth/components/user-button';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');

  return <div>This is a homepage.</div>;
}