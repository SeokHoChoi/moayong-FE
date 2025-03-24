import { cn } from "src/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant: "greenBg" | "greenText" | "purpleBg" | "purpleText" | "orangeBg" | "orangeText";
  isGrayBg?: boolean;
}

export const Badge = ({ children, variant, isGrayBg }: BadgeProps) => {
  const bgStyle = {
    greenBg: "bg-green-50",
    greenText: "bg-white",
    purpleBg: "bg-purple-30",
    purpleText: "bg-white",
    orangeBg: "bg-[#EC664F]",
    orangeText: "bg-white",
    grayBg: "bg-gray-5",
  };
  const textStyle = {
    greenBg: "text-white",
    greenText: "text-green-60",
    purpleBg: "text-white",
    purpleText: "text-purple-40",
    orangeBg: "text-white",
    orangeText: "text-[#EC664F]",
  };

  return (
    <div className={cn("rounded-[4px] w-fit", bgStyle[variant], isGrayBg && "bg-gray-5")}>
      <div className={cn(textStyle[variant], "caption-sm py-1 px-1.5")}>{children}</div>
    </div>
  );
};
