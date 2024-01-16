import React from "react";
import Link from "next/link";
import { NetworkIcon } from "@/lib/components/icons/chains/NetworkIcon";
import { TokenStandard } from "../types";
import { Pill } from "./ui/Pill";
import { useTokenContractName } from "../hooks";
import { TokenStandardPill } from "./TokenStandardPill";
import { networkName } from "../utils";

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
      <div className="flex flex-col w-full max-w-[257px] gap-2 md:gap-3 hover:bg-highlightFaint rounded-lg p-2 hover:[&_img]:scale-110">
        <div className="w-full max-w-[241px] overflow-hidden border border-highlight rounded-md relative aspect-square">
          <div className="w-full [&_img]:transition-all [&_img]:duration-300 aspect-square">
            <img
              src={props.image}
              alt="Token image"
              width={250}
              height={250}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm md:text-lg 2xl:text-lg whitespace-nowrap text-ellipsis overflow-hidden font-bold">
            {tokenContractName}
          </h3>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-1">
              <NetworkIcon chainId={props.chainId} className="h-4 w-4" />
              <p>{networkName[props.chainId]}</p>
            </div>
            <TokenStandardPill tokenStandard={props.tokenStandard} />
          </div>
        </div>
      </div>
    </Link>
  );
};
