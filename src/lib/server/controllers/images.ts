import { createServerFn } from '@tanstack/react-start';
import { db } from '~/lib/server/db'; 
import { userImages } from '../schema';
import { z }from 'zod'
import { authMiddleware } from '~/lib/middleware/auth-guard';

const UploadUserImagesSschema =  z.object({
  frontUrl: z.string(),
  backUrl: z.string(),
  sideUrl: z.string(),
  clothingUrl: z.string(),
});

export const uploadUserImages = createServerFn({ method: 'POST' })
  .validator(UploadUserImagesSschema).middleware([authMiddleware])
  .handler(async ({ data: {  frontUrl, backUrl, sideUrl, clothingUrl }, context: {user}}) => {

    try {
      await db.insert(userImages).values({
        id: crypto.randomUUID(),
        userId: user.id,
        frontUrl,
        backUrl,
        sideUrl,
        clothingUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return {
        userId: user.id,
        frontUrl,
        backUrl,
        sideUrl,
        clothingUrl,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to upload user images: ' + error.message);
      }
      throw new Error('Failed to upload user images: An unknown error occurred');
    }
  });