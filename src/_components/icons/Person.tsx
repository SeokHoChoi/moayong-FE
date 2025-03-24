export const PersonIcon = ({ selected = false }: { selected?: boolean }) => {
  return (
    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon/32/tapbar">
        <path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5016 14.8C18.9316 14.8 20.9016 12.8301 20.9016 10.4C20.9016 7.96995 18.9316 6 16.5016 6C14.0715 6 12.1016 7.96995 12.1016 10.4C12.1016 12.8301 14.0715 14.8 16.5016 14.8ZM9.5 15.9002C7.29086 15.9002 5.5 17.6911 5.5 19.9002V22.8002C5.5 24.4571 6.84315 25.8002 8.5 25.8002H24.5C26.1569 25.8002 27.5 24.4571 27.5 22.8002V19.9002C27.5 17.6911 25.7091 15.9002 23.5 15.9002H9.5Z"
          fill={selected ? "#12B76A" : "#798591"}
        />
      </g>
    </svg>
  );
};
