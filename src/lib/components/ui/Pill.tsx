import { Color } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const PillStyles = cva(
  "relative ml-auto text-sm rounded-full md:py-0.5 px-2 text-center w-fit capitalize",
  {
    variants: {
      color: {
        gray: "bg-highlight text-primary",
        blue: "bg-blue/20 text-blue",
        orange: "bg-orange/20 text-orange",
        green: "bg-green/20 text-green",
        yellow: "bg-yellow/20 text-yellow",
        red: "bg-red/20 text-red",
        purple: "bg-purple/20 text-purple",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  }
);
export const Pill = ({ color, children }: { color?: Color; children: any }) => {
  return <div className={cn(PillStyles({ color }))}>{children}</div>;
};
