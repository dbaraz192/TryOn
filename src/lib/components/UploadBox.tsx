import { useState } from "react";
import { Button } from "~/lib/components/ui/button";
// import { Label } from "~/lib/components/ui/label";
import { Card, CardContent } from "~/lib/components/ui/card";
import { UploadButton } from "~/lib/utils/uploadthing";
import { CheckCircle } from "lucide-react";

const UploadComponent = () => {
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    front: null,
    back: null,
    side: null,
    clothing: null,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadComplete = (res: any, type: string) => {
    if (res?.length > 0) {
      setImages((prev) => ({ ...prev, [type]: res[0].url }));
    }
  };

  const handleSubmit = () => {
    console.log("Uploaded images:", images);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Upload Your Images</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(images).map((type) => (
          <Card key={type} className="flex items-center justify-center">
            <CardContent className="flex flex-col items-center gap-2 p-2">
              {images[type] ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={images[type]!}
                    alt={type}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <CheckCircle className="absolute top-2 right-2 text-green-500" size={20} />
                </div>
              ) : (
                <>
                  <span className="text-sm text-gray-500">{type.toUpperCase()}</span>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => handleUploadComplete(res, type)}
                  />
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleSubmit} className="w-fit">Generate Outfit</Button>
    </div>
  );
};

export default UploadComponent;

