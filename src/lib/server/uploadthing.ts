import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { auth } from "./auth";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
  .middleware(async ({ req }) => {
    const user = (await auth.api.getSession(req))?.user

    if (!user) throw new UploadThingError("Unauthorized");

    return { userId: user.id };
  })
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete for userId:", metadata.userId);

    console.log("file url", file.ufsUrl);

    return { uploadedBy: metadata.userId };
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
