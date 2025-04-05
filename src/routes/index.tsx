import { createFileRoute } from "@tanstack/react-router";
import UploadComponent from "~/lib/components/UploadBox";
import Header from "~/lib/components/Header";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();

  return (
    <div className="flex flex-col">
      <Header user={user} queryClient={queryClient} />
      <UploadComponent />
    </div>
  );
}
