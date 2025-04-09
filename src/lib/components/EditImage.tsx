import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { UploadRouter } from "../server/uploadthing";
import { Card, CardContent } from "./ui/card";
import { useMutation } from "@tanstack/react-query";
import { updateUserImage } from "../server/controllers/images";
import { toast } from "sonner";

interface EditImageProps {
  type: 'frontUrl' | 'backUrl' | 'rightSideUrl' | 'leftSideUrl';
  imageUrl: string | null;
  label: string;
};

export const EditImage = ({ type, imageUrl, label }: EditImageProps) => {
  const [image, setImage] = useState(imageUrl);

  const handleUploadComplete = async (res: Array<{ ufsUrl: string }>) => {
    console.log("Upload complete:", res);
    if (res?.length > 0) {
      setImage(res[0].ufsUrl);
      submitImageUpdate();
    };
  };

  const { mutate: submitImageUpdate } = useMutation({
    mutationFn: async () => {
      if (image && type ) {
        await updateUserImage({
          data: {
            type: type,
            url: image,
          },
        });
      } else throw new Error("Image must be uploaded");
    },
    onSuccess: () => toast.success("Images uploaded successfully!"),
    onError: (error) => toast.error(`Error uploading images: ${error.message}`),
  });

  return (
    <Card className="flex items-center justify-center relative">
      <CardContent className="mb-2 flex h-72 w-76 flex-col items-center justify-between gap-3 px-3">
      {image && (
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={type}
            className="mt-3 h-9/10 w-full rounded-lg object-cover"
          />
          <UploadButton<UploadRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => handleUploadComplete(res)}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {
              console.log("Uploading: ", name);
            }}
            className="absolute top-5 right-2 text-white"
            appearance={{
              button: {
                background: "black",
                color: "white",
              },
              container: {
                display: "flex",
                background: "transparent",
            }}
            }
          />
        </div>
      )}
      <span className="text-sm font-medium text-gray-500">
        {label.toUpperCase()}
      </span>
      </CardContent>
    </Card>
  );
}