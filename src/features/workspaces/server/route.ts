import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { createWorkspaceSchema } from '../schemas';
import { sessionMiddleware } from '@/lib/session-middleware';
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from '@/config';
import { AppwriteException, ID } from 'node-appwrite';
import { StatusCode } from 'hono/utils/http-status';

const app = new Hono().post(
  '/',
  zValidator('form', createWorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get('databases');
    const user = c.get('user');
    const storage = c.get('storage');

    const { name, image } = c.req.valid('form');

    try {
      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString('base64')}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
        }
      );

      return c.json({
        status: 'success',
        message: 'Workspace created!',
        data: workspace,
      });
    } catch (error) {
      if (error instanceof AppwriteException) {
        return c.json(
          {
            status: 'error',
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
  }
);

export default app;
