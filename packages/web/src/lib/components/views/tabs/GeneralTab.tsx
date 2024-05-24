import { emptyImage } from "@/lib/constants";
import { useTokenContractName, useTokenContractSymbol } from "@/lib/hooks";
import { TokenConfig } from "@/lib/types";
import Image from "next/image";
import { ContractLink } from "../../ContractLink";
import { GasCoinPurchaseController } from "./Controllers";

export function GeneralTab({ tokenContract }: { tokenContract?: TokenConfig }) {
  const name = useTokenContractName(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );
  const symbol = useTokenContractSymbol(
    tokenContract?.chainId,
    tokenContract?.contractAddress
  );

  return (
    <div className="pt-8 px-6 space-y-6 max-w-[600px]">
      <div className="text-2xl">General</div>
      <div className="space-y-8">
        <div className="flex flex-row space-x-4">
          <div className="relative self-start h-[132px] w-[132px]">
            <Image
              src={tokenContract?.image ?? emptyImage}
              width={132}
              height={132}
              alt="image"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="flex flex-row items-center space-x-2">
              <ContractLink contract={tokenContract} />
              <span className="bg-highlight text-sm rounded-full px-3 py-1.5">
                ${symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-xl font-bold">Mint Page</div>
          {!tokenContract?.mintPage ? (
            <div>Off</div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-lg">Background Image</div>
                <div
                  className={
                    !tokenContract?.mintPage?.background ? "text-secondary" : ""
                  }
                >
                  {!tokenContract?.mintPage?.background ? "Default" : "Custom"}
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-lg">Mint Contract</div>
                {tokenContract?.mintPage?.controller?.toLowerCase() ===
                "0xb336c2c5568b310ec5774cb6c577280c14c4dac2" ? (
                  <GasCoinPurchaseController tokenContract={tokenContract} />
                ) : (
                  <ContractLink
                    contract={{
                      chainId: tokenContract?.chainId!,
                      contractAddress: tokenContract?.mintPage?.controller!,
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
