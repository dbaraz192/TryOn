import { useState } from "react";
import { Button } from "~/lib/components/ui/button";
import { Input } from "~/lib/components/ui/input";
import { Label } from "~/lib/components/ui/label"
import { Card, CardContent } from "~/lib/components/ui/card";
import { Upload } from "lucide-react";

const UploadComponent = () => {
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    front: null,
    back: null,
    side: null,
    clothing: null,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
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
          <Card key={type} className="w-40 h-40 flex items-center justify-center">
            <CardContent className="flex flex-col items-center gap-2 p-2">
              {images[type] ? (
                <img src={images[type]!} alt={type} className="w-full h-full object-cover rounded-md" />
              ) : (
                <Label className="flex flex-col items-center gap-2 cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-500" />
                  <span className="text-sm text-gray-500">{type.toUpperCase()}</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, type)}
                    className="hidden"
                  />
                </Label>
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

