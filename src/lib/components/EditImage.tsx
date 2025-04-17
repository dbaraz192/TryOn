import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { UploadRouter } from "../server/uploadthing";
import { Card, CardInnerTitle } from "./ui/card";
import { useMutation } from "@tanstack/react-query";
import { updateUserImage } from "../server/controllers/images";
import { toast } from "sonner";
import { Edit } from "lucide-react";

interface EditImageProps {
  type: 'frontUrl' | 'backUrl' | 'rightSideUrl' | 'leftSideUrl';
  imageUrl: string | null;
  label: string;
};

export const EditImage = ({ type, imageUrl, label }: EditImageProps) => {
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

  const { mutate: submitImageUpdate } = useMutation({
    mutationFn: async ({
      data,
    }: {
      data: {
        type: EditImageProps["type"];
        url: string;
      };
    }) => {
      return await updateUserImage({ data });
    },
    onSuccess: async () => {
      toast.success("Images uploaded successfully!");
    },
    onError: (error) =>
      toast.error(`Error uploading images: ${error.message}`),
  });
  
  return (
    <Card className="flex items-center justify-center relative max-h-122 max-w-86">
      {image && (
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={type}
            className="mt-3 h-full w-full rounded-lg object-cover object-top"
          />
          <UploadButton<UploadRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => handleUploadComplete(res)}
            onUploadError={(error) => {
              toast.error(error.message);
            }}
            onUploadBegin={(name) => {
              toast.info(`Uploading ${name}`);
            }}
            className="absolute top-5 flex flex-col items-end right-2 text-white"
            content={{
              button({ ready }) {
                if (ready) return <Edit />;
                return "Getting ready...";
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              allowedContent({ ready, isUploading }) {
                // if (!ready) return "Checking what you allow";
                // if (isUploading) return "Your photo is uploading";
                return '';
              },
            }}
            appearance={{
              button: {
                background: "black",
                color: "white",
                width: "40px"
                
              },
              container: {
                display: "flex",
                background: "transparent",
              }}
            }
          />
        </div>
      )}
      <CardInnerTitle>
        {label.toUpperCase()}
      </CardInnerTitle>
    </Card>
  );
};