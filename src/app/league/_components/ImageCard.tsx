import Image, { StaticImageData } from "next/image";
import { cn } from "src/lib/utils";

interface ImageCardProps {
  level: number;
  image: StaticImageData;
  name: string;
  className?: string;
}

export const ImageCard = ({ level, image, name, className }: ImageCardProps) => {
  return (
    <div
      className={cn(
        "bg-white py-3 px-2.5 rounded-2xl w-[80px] h-[120px] flex flex-col items-center justify-center gap-2.5",
        className
      )}
    >
      <Image height={65} width={48} src={image} alt={level.toString()} />
      <span className="body-sm text-gray-50">{name}</span>
    </div>
  );
};
