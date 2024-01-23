import React from "react";
import { cn } from "@/lib/utils";

export const LoadingSpinner = (
  props: React.ComponentPropsWithoutRef<"svg">
) => {
  const { className, ...rest } = props;

  return (
    // this is custom made from this sample CodePen: https://codepen.io/mtvv/pen/JjdoPRr
    // and this tutorial: https://www.benmvp.com/blog/how-to-create-circle-svg-gradient-loading-spinner/
    // it works by making two semi-circle arcs and applying 0->50 gradient on one and 50-100 gradient
    // on the other to make it look like one continuous 0->100 gradient
    <svg
      className={cn("animate-spin", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      color="#687385"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <defs>
        <linearGradient id="spinner-firstHalf">
          <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0.4" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="spinner-secondHalf">
          <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
        </linearGradient>
      </defs>

      <g fill="currentColor">
        <path
          fill="url(#spinner-firstHalf)"
          d="M 0 8 A 8 8 0 0 0 16 8 L 13 8 A 5 5 0 0 1 3 8 L 0 8 Z"
        />
        <path
          fill="url(#spinner-secondHalf)"
          d="M 16 8 A 8 8 0 0 0 0 8 L 3 8 A 5 5 0 0 1 13 8 L 16 8 Z"
        />
      </g>
    </svg>
  );
};

export default LoadingSpinner;
