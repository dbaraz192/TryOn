import { useMutation } from "@tanstack/react-query";
import { UploadButton } from "@uploadthing/react";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUserImage, updateUserImage } from "../server/controllers/images";
import { UploadRouter } from "../server/uploadthing";
import { Button } from "./ui/button";
import { CardImage, CardInnerTitle } from "./ui/card";

interface ModifyImageProps {
  type: "frontUrl" | "backUrl" | "rightSideUrl" | "leftSideUrl";
  imageUrl: string | null;
  label: string;
}

export const ModifyImage = ({ type, imageUrl, label }: ModifyImageProps) => {
  const [image, setImage] = useState(imageUrl);

  const handleUploadComplete = async (res: Array<{ ufsUrl: string }>) => {
    if (res?.length > 0 && type) {
      const uploadedUrl = res[0].ufsUrl;
      setImage(uploadedUrl);
      submitImageUpdate({
        data: {
          type: type,
          url: uploadedUrl,
        },
      });
    }
  };

  const handleImageDelete = async (
    type: Exclude<ModifyImageProps["type"], "frontUrl">,
  ) => {
    if (image) {
      setImage(null);
      submitImageDelete({
        data: {
          type: type,
        },
      });
    }
  };

  const { mutate: submitImageUpdate } = useMutation({
    mutationFn: async ({
      data,
    }: {
      data: {
        type: ModifyImageProps["type"];
        url: string;
      };
    }) => {
      return await updateUserImage({ data });
    },
    onSuccess: async () => {
      toast.success("Images uploaded successfully!");
    },
    onError: (error) => toast.error(`Error uploading images: ${error.message}`),
  });

  const { mutate: submitImageDelete } = useMutation({
    mutationFn: deleteUserImage,
    onSuccess: async () => {
      toast.success("Images deleted successfully!");
    },
    onError: (error) => toast.error(`Error deleting images: ${error.message}`),
  });

  return (
    <CardImage className="relative flex max-w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 bg-white text-center dark:bg-gray-900">
      {image && (
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={type}
            className="h-full w-full rounded-lg object-cover object-top"
          />
          <div className="absolute top-2 right-2 flex items-start gap-2">
            <UploadButton<UploadRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => handleUploadComplete(res)}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
              onUploadBegin={(name) => {
                toast.info(`Uploading ${name}`);
              }}
              content={{
                button({ ready }) {
                  if (ready) return <Edit />;
                  return "Getting ready...";
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                allowedContent({ ready, isUploading }) {
                  // if (!ready) return "Checking what you allow";
                  // if (isUploading) return "Your photo is uploading";
                  return "";
                },
              }}
              appearance={{
                button: {
                  background: "black",
                  color: "white",
                  width: "40px",
                },
              }}
            />
            {type !== "frontUrl" && (
              <Button className="h-10 w-10" onClick={() => handleImageDelete(type)}>
                <Trash />
              </Button>
            )}
          </div>
        </div>
      )}
      <CardInnerTitle>{label.toUpperCase()}</CardInnerTitle>
    </CardImage>
  );
};
