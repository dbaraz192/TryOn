import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/lib/components/ui/button";
import { Card, CardContent } from "~/lib/components/ui/card";
import { UploadDropzone } from "~/lib/utils/uploadthing";
import { uploadUserImages } from "../server/controllers/images";
import { UserImagesRow } from "../server/schema";

type UploadData = {
  [key in keyof Omit<UserImagesRow, "id" | "userId" | "createdAt" | "updatedAt">]:
    | string
    | null;
};

const UploadComponent = () => {
  const [images, setImages] = useState<UploadData>({
    frontUrl: null,
    backUrl: null,
    rightSideUrl: null,
    leftSideUrl: null,
  });

  const handleUploadComplete = (res: Array<{ url: string }>, type: string) => {
    console.log("Upload complete:", res);
    if (res?.length > 0) {
      setImages((prev) => ({ ...prev, [type]: res[0].url }));
    }
  };

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async () => {
      console.log("Submitting images:", images);
      if (
        images.frontUrl &&
        images.backUrl &&
        images.rightSideUrl &&
        images.leftSideUrl
      ) {
        await uploadUserImages({
          data: {
            frontUrl: images.frontUrl,
            backUrl: images.backUrl,
            rightSideUrl: images.rightSideUrl,
            leftSideUrl: images.leftSideUrl,
          },
        });
      } else throw new Error("All four images must be uploaded");
    },
    onSuccess: () => toast.success("Images uploaded successfully!"),
    onError: (error) => toast.error(`Error uploading images: ${error.message}`),
  });

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Upload Your Images</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(images).map(([type, image]) => (
          <Card key={type} className="flex items-center justify-center">
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
                    alert(`ERROR! ${error.message}`);
                  }}
                  onUploadBegin={(name) => {
                    console.log("Uploading: ", name);
                  }}
                  className="!mt-3 h-9/10 max-w-full bg-white"
                />
              )}
              <span className="text-sm font-medium text-gray-500">
                {type.toUpperCase()}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={() => handleSubmit()} className="w-fit">
        {isPending ? <Loader2 className="animate-spin" /> : "Next"}
      </Button>
    </div>
  );
};

export default UploadComponent;
