import { Card, CardContent } from "~/lib/components/ui/card";

type ImageCardProps = {
  imageUrl: string;
  label: string;
};

export const ImageCard = ({ imageUrl, label }: ImageCardProps) => (
  <Card className="flex items-center justify-center">
    <CardContent className="mb-2 flex h-72 w-76 flex-col items-center justify-between gap-3 px-3">
      <img
        src={imageUrl}
        alt={label}
        className="mt-3 h-9/10 w-full rounded-lg object-cover"
      />
      <span className="text-sm font-medium text-gray-500">
        {label.toUpperCase()}
      </span>
    </CardContent>
  </Card>
);