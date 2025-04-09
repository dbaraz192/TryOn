import { createFileRoute } from "@tanstack/react-router";
import UploadBox from "~/lib/components/UploadBox";
import Header from "~/lib/components/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserImages } from "~/lib/server/controllers/images";
import UploadedImages from "~/lib/components/UploadedImages";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const { queryClient } = Route.useRouteContext();
  const { user } = Route.useLoaderData();

  const { data } = useQuery({
    queryKey: ["userImages"],
    queryFn: async () => await getUserImages(),
  });
  
  return (
    <div className="flex flex-col">
      <Header user={user} queryClient={queryClient} />
      {data ? (
        <UploadedImages data={data} />
      ) : (
        <UploadBox />
      )}
    </div>
  );
};
