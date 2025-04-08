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

export const getUserImages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context: { user } }) => {
    const [data] = await db
      .select()
      .from(userImages)
      .where(eq(userImages.userId, user.id))
      .limit(1);

    return data;
  });
