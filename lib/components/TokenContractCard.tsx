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
    <Link
      href={props.href}
      className="p-2 w-fit rounded-lg bg-slate space-y-4 hover:[&_img]:scale-110"
    >
      <div className="rounded-lg [&_img]:transition-all [&_img]:duration-300 overflow-hidden">
        <Image
          src={props.image}
          alt="default tape image"
          width={250}
          height={250}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="font-bold whitespace-nowrap text-ellipsis overflow-hidden">
          {tokenContractName}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center space-x-1">
            <NetworkIcon chainId={props.chainId} className="h-4 w-4" />
            <p>Network name</p>
          </div>
          <Pill>{props.tokenStandard}</Pill>
        </div>
      </div>
    </Link>
  );
};
