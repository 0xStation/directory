import { TokenConfig } from "@/lib/types";
import { ContractLink } from "../../ContractLink";
import { GasCoinPurchaseController } from "./Controllers";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
            <Link
              href={`/${tokenContract.slug}/mint`}
              className="px-2 py-1 rounded border border-highlight hover:bg-white/10 flex flex-row items-center space-x-2 w-fit"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" /> <p>View Mint Page</p>
            </Link>
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
