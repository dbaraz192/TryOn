import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { UploadRouter } from "../server/uploadthing";

export const getUploadThingFileKey = (url: string): string | null => {
  try {
    const fileKey = new URL(url).pathname.split("/f/")[1];
    return fileKey || null;
  } catch {
    return null;
  }
};

export const UploadButton = generateUploadButton<UploadRouter>();
export const UploadDropzone = generateUploadDropzone<UploadRouter>();
export const { useUploadThing } = generateReactHelpers<UploadRouter>();
