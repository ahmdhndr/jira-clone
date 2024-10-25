import { getLoggedInUser } from '@/features/auth/queries';
import { SignUpCard } from '@/features/auth/components/sign-up-card';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SignUpPage() {
  const user = await getLoggedInUser();

  if (user) redirect('/');

  return <SignUpCard />;
}
