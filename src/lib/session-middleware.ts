import { AUTH_COOKIE } from '@/features/auth/constants';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import {
  Account,
  Client,
  Databases,
  Storage,
  type Account as AccountType,
  type Storage as StorageType,
  type Databases as DatabasesType,
  type Users as UsersType,
  Models,
} from 'node-appwrite';

type Context = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<Context>(async (c, next) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = getCookie(c, AUTH_COOKIE);
  if (!session) {
    return c.json(
      { status: 'error', message: 'Unauthorized', data: null },
      401
    );
  }

  client.setSession(session);
  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const user = await account.get();
  c.set('account', account);
  c.set('databases', databases);
  c.set('storage', storage);
  c.set('user', user);

  await next();
});