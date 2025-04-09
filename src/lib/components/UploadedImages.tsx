"use client";

import { Button } from "~/lib/components/ui/button";
import { EditImage } from "./EditImage";

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

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Your Images</h1>
      <div className="grid grid-cols-2 gap-4">
        {imageData.map(({ key, label }) => {
          const imageUrl = data[key];
          return imageUrl ? (
            <EditImage
              key={key}
              type={key}
              label={label}
              imageUrl={imageUrl}
            />
          ) : null;
        })}
      </div>
      <Button>Generate</Button>
    </div>
  );
};

export default UploadedImages;
