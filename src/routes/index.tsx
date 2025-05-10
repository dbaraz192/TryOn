import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Header from "~/lib/components/Header";
import UploadBox from "~/lib/components/UploadBox";
import UploadedImages from "~/lib/components/UploadedImages";
import { getUserImages } from "~/lib/server/controllers/images";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();

  const { isLoading, data } = useQuery({
    queryKey: ["userImages"],
    queryFn: async () => await getUserImages(),
  });

  return (
    <div className="flex flex-col">
      <Header user={user} queryClient={queryClient} />
      {data ? <UploadedImages data={data} isLoading={isLoading} /> : <UploadBox />}
    </div>
  );
}
