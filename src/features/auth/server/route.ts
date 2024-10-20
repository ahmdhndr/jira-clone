import { createAdminClient } from '@/lib/appwrite';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { ID } from 'node-appwrite';
import { AUTH_COOKIE } from '../constants';
import { loginSchema, registerSchema } from '../schemas';

const app = new Hono()
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({
      status: 'success',
      message: 'OK',
      data: null,
    });
  })
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { name, email, password } = c.req.valid('json');

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({
      status: 'success',
      message: 'User Created!',
      data: null,
    });
  })
  .post('/logout', (c) => {
    deleteCookie(c, AUTH_COOKIE);

    return c.json({
      status: 'success',
      message: 'OK!',
      data: null,
    });
  });

export default app;
