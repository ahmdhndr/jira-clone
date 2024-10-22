import { createAdminClient } from '@/lib/appwrite';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { AppwriteException, ID } from 'node-appwrite';
import { AUTH_COOKIE } from '../constants';
import { loginSchema, registerSchema } from '../schemas';
import { sessionMiddleware } from '@/lib/session-middleware';
import { StatusCode } from 'hono/utils/http-status';

const app = new Hono()
  .get('/current-user', sessionMiddleware, (c) => {
    const user = c.get('user');
    return c.json({ status: 'success', message: 'OK', data: user });
  })
  .post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json');
    const { account } = await createAdminClient();

    try {
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
    } catch (error) {
      if (error instanceof AppwriteException) {
        return c.json(
          {
            status: 'failed',
            message: error.message,
            data: null,
          },
          error.code as StatusCode
        );
      }

      return c.json(
        {
          status: 'error',
          message: 'Something went wrong!',
          data: null,
        },
        500
      );
    }
  })
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { name, email, password } = c.req.valid('json');

    const { account } = await createAdminClient();

    try {
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
    } catch (error) {
      if (error instanceof AppwriteException) {
        if (error.type === 'user_already_exists') {
          return c.json<{ status: string; message: string; data: null }>(
            {
              status: 'failed',
              message: 'Email is already taken.',
              data: null,
            },
            error.code as StatusCode
          );
        }

        return c.json(
          {
            status: 'failed',
            message: error.message,
            data: null,
          },
          error.code as StatusCode
        );
      }

      return c.json(
        {
          status: 'error',
          message: 'Something went wrong!',
          data: null,
        },
        500
      );
    }
  })
  .post('/logout', sessionMiddleware, async (c) => {
    const account = c.get('account');

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession('current');

    return c.json({
      status: 'success',
      message: 'OK!',
      data: null,
    });
  });

export default app;
