import { Operation } from "@/lib/constants";
import { TokenConfig } from "@/lib/types";
import { toSentenceCase } from "@/lib/utils";
import { ContractLink } from "../../ContractLink";
import { useReadContract } from "wagmi";
import { GuardsAbi } from "@/lib/abi/Guards";
import { zeroAddress } from "viem";
import { EditGuard } from "./Guards";

export function GuardsTab({ tokenContract }: { tokenContract?: TokenConfig }) {
  return (
    <div className="space-y-8">
      <GuardSetting tokenContract={tokenContract} operation={Operation.MINT} />
      <GuardSetting
        tokenContract={tokenContract}
        operation={Operation.TRANSFER}
      />
      <GuardSetting tokenContract={tokenContract} operation={Operation.BURN} />
    </div>
  );
}

function GuardSetting({
  tokenContract,
  operation,
}: {
  tokenContract?: TokenConfig;
  operation: Operation;
}) {
  const name = toSentenceCase(
    Object.entries(Operation).find(([key, value]) => value === operation)?.[0]
  );

  const { data: guard } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    abi: GuardsAbi,
    functionName: "guardOf",
    args: [operation],
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <div className="text-lg font-bold">{name}</div>
        <EditGuard tokenContract={tokenContract} operation={operation} />
      </div>
      <div className="w-fit">
        {guard === undefined || guard === zeroAddress ? (
          <div className="text-secondary">None</div>
        ) : guard.toLowerCase() ===
          "0xffffffffffffffffffffffffffffffffffffffff" ? (
          <div>Blocked</div>
        ) : (
          <div className="flex flex-row space-x-4 items-center">
            {guard.toLowerCase() ===
            "0x5f00d3707f1e4183003e75d3e995b814fb8fabe6" ? (
              <div className="text-base">One-Per-Address</div>
            ) : (
              <></>
            )}
            <ContractLink
              contract={{
                chainId: tokenContract?.chainId!,
                contractAddress: guard!,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
