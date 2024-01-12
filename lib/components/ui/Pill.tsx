import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

export const PillStyles = cva(
  "relative ml-auto rounded-full py-1 px-2 text-center w-fit",
  {
    variants: {
      color: {
        gray: "bg-gray-80 text-white",
        blue: "bg-blue-20 text-blue-100",
        orange: "bg-orange-20 text-orange-100",
        green: "bg-green-20 text-green-100",
      },
    },
  }
);
export const Pill = ({
  color,
  children,
}: {
  color: "gray" | "blue" | "orange" | "green";
  children: any;
}) => {
  return <div className={cn(PillStyles({ color }))}>{children}</div>;
};
