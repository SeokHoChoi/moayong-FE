import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export const TopBarWithCloseButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="h-[50px] relative flex justify-center items-center">
      <div
        className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => {
          onClick?.();
          router.back();
        }}
      >
        <X className="w-5 h-5" color="#33363D" />
      </div>
      <div className="title-sm">{title}</div>
    </div>
  );
};
