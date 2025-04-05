import { useState } from "react";
import { Button } from "~/lib/components/ui/button";
import { Card, CardContent } from "~/lib/components/ui/card";
import { UploadDropzone } from "~/lib/utils/uploadthing";

const UploadComponent = () => {
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    front: null,
    back: null,
    side: null,
    clothing: null,
  });


  const handleUploadComplete = (res: Array<{ url: string }>, type: string) => {
    console.log("Upload complete:", res);
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
            <CardContent className="flex flex-col items-center justify-between gap-3 w-76 h-72 mb-2 px-3">
              {images[type] ? (
                  <img
                    src={images[type]!}
                    alt={type}
                    className="rounded-lg mt-3 w-full object-cover h-9/10"
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
                    className="max-w-full h-9/10 !mt-3 bg-white"
                  />
              )}
              <span className="text-sm text-gray-500 font-medium">{type.toUpperCase()}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleSubmit} className="w-fit">Generate Outfit</Button>
    </div>
  );
};

export default UploadComponent;

