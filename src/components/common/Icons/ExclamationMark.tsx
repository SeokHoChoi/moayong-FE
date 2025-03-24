export const ExclamationMark = ({
  width = 16,
  height = 16,
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon/16" clipPath="url(#clip0_4010_1729)">
        <circle id="Ellipse 178" cx="8" cy="8" r="8" fill="#F6C959" />
        <path
          id="!"
          d="M8.95307 3.10156L8.80268 10.0879H7.25776L7.0937 3.10156H8.95307ZM6.97065 12.043C6.96382 11.4688 7.44917 10.9971 8.03706 10.9902C8.60444 10.9971 9.08979 11.4688 9.08979 12.043C9.08979 12.6309 8.60444 13.1094 8.03706 13.1094C7.44917 13.1094 6.96382 12.6309 6.97065 12.043Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_4010_1729">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
