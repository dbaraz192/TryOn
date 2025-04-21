import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/lib/components/ui/button";
import { CardContent, CardImage } from "~/lib/components/ui/card";
import { UploadDropzone } from "~/lib/utils/uploadthing";
import { uploadUserImages } from "../server/controllers/images";
import { UserImagesRow } from "../server/schema";

type UploadData = {
  [key in keyof Omit<UserImagesRow, "id" | "userId" | "createdAt" | "updatedAt">]:
    | string
    | undefined;
};

const UploadBox = () => {
  const [images, setImages] = useState<UploadData>({
    frontUrl: undefined,
    backUrl: undefined,
    rightSideUrl: undefined,
    leftSideUrl: undefined,
  });

  const handleUploadComplete = (res: Array<{ ufsUrl: string }>, type: string) => {
    console.log("Upload complete:", res);
    if (res?.length > 0) {
      setImages((prev) => ({ ...prev, [type]: res[0].ufsUrl }));
    }
  };

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async () => {
      const { frontUrl, backUrl, rightSideUrl, leftSideUrl } = images;

      if (!frontUrl) throw new Error("Front image is required");

      await uploadUserImages({
        data: {
          frontUrl,
          backUrl,
          rightSideUrl,
          leftSideUrl,
        },
      });
    },
    onSuccess: () => toast.success("Images uploaded successfully!"),
    onError: (error) => toast.error(`Error uploading images: ${error.message}`),
  });

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Upload Your Images</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(images).map(([type, image]) => (
          <CardImage key={type}>
            <CardContent className="mb-2 flex h-72 w-76 flex-col items-center justify-between gap-3 px-3">
              {image ? (
                <img
                  src={image}
                  alt={type}
                  className="mt-3 h-9/10 w-full rounded-lg object-cover"
                />
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => handleUploadComplete(res, type)}
                  onUploadError={(error: Error) => {
                    toast.error(error.message);
                  }}
                  onUploadBegin={(name) => {
                    console.log("Uploading: ", name);
                  }}
                  className="!mt-3 h-9/10 max-w-full bg-white dark:bg-gray-900"
                />
              )}
              <span className="text-sm font-medium text-gray-500">
                {type.toUpperCase()}
              </span>
            </CardContent>
          </CardImage>
        ))}
      </div>
      <Button onClick={() => handleSubmit()} className="w-fit">
        {isPending ? <Loader2 className="animate-spin" /> : "Next"}
      </Button>
    </div>
  );
};

export default UploadBox;
