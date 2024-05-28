import { GuardsAbi } from "@/lib/abi/Guards";
import { Modules, Operation } from "@/lib/constants";
import { TokenConfig } from "@/lib/types";
import { erc721Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";

export function useOnePerAddress(tokenContract?: TokenConfig) {
  const account = useAccount();
  const { data: balance } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    abi: erc721Abi,
    functionName: "balanceOf",
    args: [account?.address!],
    query: {
      enabled: Boolean(
        account?.address &&
          tokenContract?.chainId &&
          tokenContract?.contractAddress
      ),
    },
  });

  const { data: guard } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    abi: GuardsAbi,
    functionName: "guardOf",
    args: [Operation.MINT],
  });

  const zeroBalance = balance === BigInt(0);
  const onePerAddressActive = guard?.toLowerCase() === Modules.ONE_PER_ADDRESS;

  return !account?.address
    ? { disabled: false, message: null }
    : {
        disabled: onePerAddressActive && !zeroBalance,
        message:
          onePerAddressActive && !zeroBalance
            ? "One token per-address limit reached."
            : null,
      };
}
