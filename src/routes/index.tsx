import { createFileRoute } from "@tanstack/react-router";
import UploadBox from "~/lib/components/UploadBox";
import Header from "~/lib/components/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserImages } from "~/lib/server/controllers/images";
import { ImageCard } from "~/lib/components/ImageCard";
import { Button } from "~/lib/components/ui/button";

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

  const imageData = [
    { key: "frontUrl", label: "Front" },
    { key: "backUrl", label: "Back" },
    { key: "rightSideUrl", label: "Right Side" },
    { key: "leftSideUrl", label: "Left Side" },
  ] as const;
  return (
    <div className="flex flex-col">
      <Header user={user} queryClient={queryClient} />
      {data ? (
        <div className="flex flex-col items-center gap-6 p-6">
          <h1 className="text-2xl font-bold">Your Images</h1>
          <div className="grid grid-cols-2 gap-4">
            {imageData.map(({ key, label }) => {
              const imageUrl = data[key];
              return imageUrl ? (
                <ImageCard key={key} imageUrl={imageUrl} label={label} />
              ) : null;
            })}
          </div>
          <Button>Next</Button>
        </div>
      ) : (
        <UploadBox />
      )}
    </div>
  );
};
