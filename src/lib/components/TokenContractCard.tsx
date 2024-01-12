import React from "react";
import Link from "next/link";
import { NetworkIcon } from "@/lib/components/icons/chains/NetworkIcon";
import { TokenStandard } from "../types";
import { Pill } from "./ui/Pill";
import { useTokenContractName } from "../hooks";
import Image from "next/image";

export const TokenContractCard = (props: {
  href: string;
  image: string;
  chainId: number;
  contractAddress: `0x${string}`;
  tokenStandard: TokenStandard;
}) => {
  const tokenContractName = useTokenContractName(
    props.chainId,
    props.contractAddress
  );

  return (
    <Link href={props.href} className="w-full max-w-[257px]">
      <div className="flex flex-col w-full max-w-[257px] gap-2 md:gap-3 hover:bg-[#1A1A1A] rounded-lg p-2 hover:[&_img]:scale-110">
        <div className="w-full max-w-[241px] overflow-hidden rounded-md relative aspect-square">
          <div className="bg-gray-[#1A1A1A] w-full [&_img]:transition-all [&_img]:duration-300 aspect-square">
            <img
              src={props.image}
              alt="default tape image"
              width={250}
              height={250}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm md:text-base 2xl:text-lg text-white whitespace-nowrap text-ellipsis overflow-hidden font-bold">
            {tokenContractName}
          </h3>
          <div className="flex flex-row space-x-4 items-center">
            <div className="flex flex-row items-center space-x-1">
              <NetworkIcon chainId={props.chainId} className="h-4 w-4" />
              <p>Network name</p>
            </div>
            <Pill color={"blue"}>{props.tokenStandard}</Pill>
          </div>
        </div>
      </div>
    </Link>
  );
};
