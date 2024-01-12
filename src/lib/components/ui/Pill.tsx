import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const PillStyles = cva(
  "relative ml-auto !text-base-xs rounded-full py-1 px-2 text-center w-fit",
  {
    variants: {
      color: {
        gray: "bg-gray-800 text-white",
        blue: "bg-[#5f6fff]/20 text-[#5F6FFF]",
        orange: "bg-[#FF9956]/20 text-[#FF9956]",
        green: "bg-[#50B488]/20 text-[#50B488]",
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
