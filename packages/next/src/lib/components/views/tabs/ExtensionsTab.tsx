import { PayoutAddressExtensionAbi } from "@/lib/abi/PayoutAddressExtension";
import { TokenConfig } from "@/lib/types";
import { useReadContract, useWriteContract } from "wagmi";
import { Input } from "../../ui/Input";
import { AbiFunction, getAbiItem, parseAbiItem, zeroAddress } from "viem";
import { ContractLink } from "../../ContractLink";
import { useTokenContractRoute } from "@/lib/hooks";
import { Button } from "../../ui/Button";
import {
  ExtensionContract,
  ReadExtensionFunction,
  WriteExtensionFunction,
} from "./Extensions";

export function ExtensionsTab({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  return (
    <div className="max-w-[600px]">
      <PayoutAddressExtension tokenContract={tokenContract} />
    </div>
  );
}

function PayoutAddressExtension({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  return (
    <ExtensionContract
      name="Payout Address"
      chainId={tokenContract?.chainId!}
      contractAddress="0x53ef68a35f9ae248f28584ab8e724896eb2d41c5"
    >
      <ReadExtensionFunction
        tokenContract={tokenContract}
        abi={PayoutAddressExtensionAbi}
        functionName="payoutAddress"
      />
      <WriteExtensionFunction
        tokenContract={tokenContract}
        abi={PayoutAddressExtensionAbi}
        functionName="updatePayoutAddress"
      />
    </ExtensionContract>
  );
}
