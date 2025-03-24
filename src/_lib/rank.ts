import { PromotionStatus } from "src/_types/type";

export const bgColor = {
  PROMOTION: "bg-green-5",
  RELEGATION: "bg-[#F4F5F6]",
  SUSPENDED: "bg-purple-5",
};
export const badgeBgColor: Record<PromotionStatus, "greenBg" | "purpleBg" | "orangeBg"> = {
  PROMOTION: "greenBg",
  RELEGATION: "orangeBg",
  SUSPENDED: "purpleBg",
};
export const badgeTextColor: Record<PromotionStatus, "greenText" | "purpleText" | "orangeText"> = {
  PROMOTION: "greenText",
  RELEGATION: "orangeText",
  SUSPENDED: "purpleText",
};

export const promotionText = {
  PROMOTION: "승급가능",
  RELEGATION: "강등가능",
  SUSPENDED: "등급유지",
};
