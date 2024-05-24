import { TokenConfig } from "@/lib/types";
import { ContractLink } from "../../ContractLink";
import { GasCoinPurchaseController } from "./Controllers";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BoxLink } from "../../BoxLink";

export function MintPageTab({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  return (
    <div className="pt-8 px-6 space-y-6 max-w-[600px]">
      <div className="text-2xl">Mint Page</div>
      <div className="space-y-4">
        {!tokenContract?.mintPage ? (
          <div>Off</div>
        ) : (
          <div className="space-y-8">
            <BoxLink href={`/${tokenContract.slug}/mint`}>
              <ExternalLink className="h-4 w-4" />
              <p>View Mint Page</p>
            </BoxLink>
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
  );
}
