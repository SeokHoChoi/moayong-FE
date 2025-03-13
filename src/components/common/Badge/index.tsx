import { cn } from "src/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant: "primary" | "gray" | "purpleBg" | "purpleText" | "orangeBg" | "orangeText";
}

export const Badge = ({ children, variant }: BadgeProps) => {
  const bgStyle = {
    primary: "bg-green-50",
    gray: "bg-gray-5",
    purpleBg: "bg-purple-30",
    purpleText: "bg-white",
    orangeBg: "bg-[#EC664F]",
    orangeText: "bg-white",
  };
  const textStyle = {
    primary: "text-white",
    gray: "text-green-50",
    purpleBg: "text-white",
    purpleText: "text-purple-40",
    orangeBg: "text-white",
    orangeText: "text-[#EC664F]",
  };

  return (
    <div className={cn("rounded-[4px] w-fit", bgStyle[variant])}>
      <div className={cn(textStyle[variant], "caption-sm py-1 px-1.5")}>{children}</div>
    </div>
  );
};
