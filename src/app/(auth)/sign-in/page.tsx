import { getLoggedInUser } from '@/features/auth/actions';
import { SignInCard } from '@/features/auth/components/sign-in-card';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SignInPage() {
  const user = await getLoggedInUser();

  if (user) redirect('/');

  return <SignInCard />;
}
