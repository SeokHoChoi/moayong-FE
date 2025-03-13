import Image, { StaticImageData } from "next/image";
import { cn } from "src/lib/utils";

interface ImageCardProps {
  level: number;
  image: StaticImageData;
  name: string;
  className?: string;
}

export const ImageCardActive = ({ level, image, name, className }: ImageCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl mt-[-50px] flex flex-col items-center justify-end gap-2.5 mx-[-4px]",
        className
      )}
    >
      <Image height={180} width={110} src={image} alt={level.toString()} />
      <span className="body-sm text-gray-50">{name}</span>
    </div>
  );
};
