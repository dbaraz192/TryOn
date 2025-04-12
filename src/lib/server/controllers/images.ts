import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { authMiddleware } from "~/lib/middleware/auth-guard";
import { db } from "~/lib/server/db";
import { userImages } from "../schema";

const UploadUserImagesSschema = z.object({
  frontUrl: z.string(),
  backUrl: z.string(),
  rightSideUrl: z.string(),
  leftSideUrl: z.string(),
});

const UpdateUserImagesSchema = z.object({
  type: z.union([
    z.literal("frontUrl"),
    z.literal("backUrl"),
    z.literal("rightSideUrl"),
    z.literal("leftSideUrl"),
  ]),
  url: z.string(),
});

export const uploadUserImages = createServerFn({ method: "POST" })
  .validator(UploadUserImagesSschema)
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
    return await db
      .update(userImages)
      .set({ [type]: url })
      .where(eq(userImages.userId, user.id))
      .returning();
  });

export const getUserImages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context: { user } }) => {
    const data = await db.select().from(userImages).where(eq(userImages.userId, user.id));
    if (data.length === 0) return null;
    return data[0];
  });
