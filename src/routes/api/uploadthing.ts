import { createRouteHandler } from "uploadthing/server";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { uploadRouter } from "~/lib/server/uploadthing";

const handlers = createRouteHandler({ router: uploadRouter });

export const APIRoute = createAPIFileRoute("/api/uploadthing")({
   GET: ({ request }) => {
    return handlers(request);
   },
   POST: ({ request }) => {
    return handlers(request);
   },
});
