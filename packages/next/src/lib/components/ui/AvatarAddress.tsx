import React from "react";
import { cn } from "@/lib/utils";
import { Address } from "./Address";
import { Avatar } from "./Avatar";

interface AvatarAddressProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  address: string;
  interactive?: boolean;
}

export const AvatarAddress = ({
  size = "base",
  address,
  interactive = true,
}: AvatarAddressProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-hidden w-fit",
        interactive ? "cursor-pointer" : "cursor-default"
      )}
      onClick={() => {
        if (!interactive) return;
        navigator.clipboard.writeText(address).then(() => {
          console.log("address copied");
        });
      }}
    >
      <Avatar address={address} size={size} />
      <Address address={address} size={size} interactive={interactive} />
    </div>
  );
};
