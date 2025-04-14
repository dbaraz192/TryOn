import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { UploadRouter } from "../server/uploadthing";
import { Card, CardContent } from "./ui/card";
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
    console.log("Upload complete:", res);
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
    onSuccess: () => toast.success("Images uploaded successfully!"),
    onError: (error) =>
      toast.error(`Error uploading images: ${error.message}`),
  });
  

  return (
    <Card className="flex items-center justify-center relative">
      <CardContent className="mb-2 flex h-72 w-76 flex-col items-center justify-between gap-3 px-3">
      {image && (
        <>
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={type}
            className="mt-3 h-9/10 w-full rounded-lg object-cover"
          />
          <UploadButton<UploadRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => handleUploadComplete(res)}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onUploadBegin={(name) => {
              console.log("Uploading: ", name);
            }}
            className="absolute top-5 flex flex-col items-end right-2 text-white"
            content={{
              button({ ready }) {
                if (ready) return <Edit />;
                return "Getting ready...";
              },
              allowedContent({ ready, fileTypes, isUploading }) {
                if (!ready) return "Checking what you allow";
                if (isUploading) return "Your photo is uploading";
                return `Stuff you can upload: ${fileTypes.join(", ")}`;
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
      </>
      
        
      )}
      <span className="text-sm font-medium text-gray-500">
        {label.toUpperCase()}
      </span>
      </CardContent>
    </Card>
  );
};