'use server';

import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';
import { AUTH_COOKIE } from './constants';

export const getLoggedInUser = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get(AUTH_COOKIE);

    if (!session || !session.value) return null;

    client.setSession(session.value);
    const account = new Account(client);
    console.log('ACCOUNT\n', await account.get());

    return await account.get();
  } catch {
    return null;
  }
};
