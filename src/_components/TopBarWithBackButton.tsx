import { Arrow } from "src/components/common/Icons/Arrow";
import { useRouter } from "next/navigation";

export const TopBarWithBackButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="h-[50px] border-b border-[#CDD1D5] relative flex justify-center items-center">
      <div
        className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => {
          onClick?.();
          router.back();
        }}
      >
        <Arrow variant="left" />
      </div>
      <div className="title-sm">{title}</div>
    </div>
  );
};
