import { createServerFn } from "@tanstack/react-start";
import OpenAI from "openai";
import { z } from "zod";
import { authMiddleware } from "~/lib/middleware/auth-guard";
import { getUserImages } from "./images";

const client = new OpenAI();

const generateTryOnSchema = z.array(z.string().url());

export const generateTryOn = createServerFn({ method: "POST" })
  .validator(generateTryOnSchema)
  .middleware([authMiddleware])
  .handler(async ({ data: urls, context: { user } }) => {
    const userImages = await getUserImages();

    // const { images } = await client.images.generate({
    //   user:
    // })

    console.log(images);
  });
