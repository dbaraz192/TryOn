import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { authMiddleware } from "~/lib/middleware/auth-guard";
import { db } from "~/lib/server/db";
import { getUploadThingFileKey } from "~/lib/utils/uploadthing";
import { userImages } from "../schema";
import { utapi } from "../uploadthing";

const UploadUserImagesSchema = z.object({
  frontUrl: z.string().url(),
  backUrl: z.string().url().optional(),
  rightSideUrl: z.string().url().optional(),
  leftSideUrl: z.string().url().optional(),
});

const imageTypes = ["frontUrl", "backUrl", "rightSideUrl", "leftSideUrl"] as const;

const UpdateUserImagesSchema = z.object({
  type: z.enum(imageTypes),
  url: z.string().url(),
});

export const uploadUserImages = createServerFn({ method: "POST" })
  .validator(UploadUserImagesSchema)
  .middleware([authMiddleware])
  .handler(
    async ({
      data: { frontUrl, backUrl, rightSideUrl, leftSideUrl },
      context: { user },
    }) => {
      await db.insert(userImages).values({
        userId: user.id,
        frontUrl,
        backUrl,
        rightSideUrl,
        leftSideUrl,
      });
      return {
        userId: user.id,
        frontUrl,
        backUrl,
        rightSideUrl,
        leftSideUrl,
      };
    },
  );

export const updateUserImage = createServerFn({ method: "POST" })
  .validator(UpdateUserImagesSchema)
  .middleware([authMiddleware])
  .handler(async ({ data: { type, url }, context: { user } }) => {
    console.log("Updating user image:", type, url);
    const [{ image }] = await db
      .select({ image: userImages[type] })
      .from(userImages)
      .where(eq(userImages.userId, user.id));
    const ret = await db
      .update(userImages)
      .set({ [type]: url })
      .where(eq(userImages.userId, user.id))
      .returning();
    if (image) {
      const key = getUploadThingFileKey(image);
      if (key) await utapi.deleteFiles(key);
    }
    return ret;
  });

export const getUserImages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context: { user } }) => {
    const data = await db.select().from(userImages).where(eq(userImages.userId, user.id));
    if (data.length === 0) return null;
    return data[0];
  });
