import * as React from "react";

const Base = (props: any) => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 36c9.941 0 18-8.059 18-18S27.941 0 18 0C8.735 0 1.105 7 .11 16h22.917v4H.11C1.105 29 8.735 36 18 36Z"
      fill="#0B45ED"
    />
  </svg>
);

export default Base;
