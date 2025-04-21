"use client";

import { UploadDropzone } from "@uploadthing/react";
import { toast } from "sonner";
import { Button } from "~/lib/components/ui/button";
import { ModifyImage } from "./ModifyImage";

type Props = {
  data: {
    frontUrl: string | null;
    backUrl: string | null;
    rightSideUrl: string | null;
    leftSideUrl: string | null;
  };
};

const imageData = [
  { key: "frontUrl", label: "Front" },
  { key: "backUrl", label: "Back" },
  { key: "rightSideUrl", label: "Right Side" },
  { key: "leftSideUrl", label: "Left Side" },
] as const;

const UploadedImages = ({ data }: Props) => {
  // const [loading, setLoading] = useState(false);
  // const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Your Images</h1>
      <div className="grid h-full w-full grid-cols-2 gap-4 sm:w-xl xl:w-2xl">
        {imageData.map(({ key, label }) => {
          const imageUrl = data[key];
          return imageUrl ? (
            <ModifyImage key={key} type={key} label={label} imageUrl={imageUrl} />
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => handleUploadComplete(res)}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              onUploadBegin={(name) => {
                toast.info(`Uploading ${name}`);
              }}
              className="!mt-0 max-w-full bg-white dark:bg-gray-900"
            />
          );
        })}
      </div>
      <Button>Generate</Button>
    </div>
  );
};

export default UploadedImages;
