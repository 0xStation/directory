import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/lib/components/ui/DropdownMenu";
import Link from "next/link";
import { pages } from "@/lib/utils";
import { TokenConfig } from "@/lib/config/types";

type DirectoryDropdownProps = {
  token: TokenConfig;
  isAdmin: boolean;
};

export const DirectoryDropdown = ({
  token,
  isAdmin,
}: DirectoryDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 rounded-md bg-[#2E2E2E] hover:bg-gray-80">
        <EllipsisVerticalIcon className="w-6 h-6 fill-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={12}>
        <DropdownMenuItem className="hover:bg-gray-80 pr-11" asChild>
          <Link href="/" target="_blank">
            View on Explorer
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:bg-gray-80 flex items-center"
          disabled={!isAdmin}
          asChild
        >
          <Link href={pages.settings(token)}>
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-80" onClick={() => {}}>
          Export
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
