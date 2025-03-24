import React from "react";

export const SemiCircleProgress = ({ percentage }: { percentage: number }) => {
  const radius = 120; // 줄인 반지름
  const strokeWidth = 24; // 줄인 선 두께
  const padding = 12; // 여백
  const totalWidth = 130; // 원하는 전체 너비
  const viewBoxSize = (radius + padding) * 2;

  // Calculate coordinates for the arc
  const circumference = (radius * Math.PI * 3) / 2;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Calculate the larger arc path for 3/2 of a circle
  const startAngle = -200;
  const endAngle = 30;
  const largeArcFlag = 1;

  const startX = radius + padding + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = radius + padding + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = radius + padding + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = radius + padding + radius * Math.sin((endAngle * Math.PI) / 180);

  const arcPath = `M ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`;

  return (
    <div className="relative">
      <svg
        width={totalWidth}
        height={totalWidth}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="transform"
      >
        {/* Background arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="#F2F4F7"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={arcPath}
          fill="none"
          stroke="#12B76A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            strokeDasharray,
            strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="heading-lg text-gray-90">{percentage}%</p>
        <p className="label-sm text-gray-50">달성률</p>
      </div>
    </div>
  );
};
