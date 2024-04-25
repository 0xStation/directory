import { GuardsAbi } from "@/lib/abi/Guards";
import { Modules, Operation } from "@/lib/constants";
import { TokenConfig } from "@/lib/types";
import { useAccount, useBalance, useReadContract } from "wagmi";

export function useOnePerAddress(tokenContract?: TokenConfig) {
  const account = useAccount();
  const { data } = useBalance({
    chainId: tokenContract?.chainId,
    token: tokenContract?.contractAddress,
    address: account?.address,
  });
  const { data: guard } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    abi: GuardsAbi,
    functionName: "guardOf",
    args: [Operation.MINT],
  });

  const zeroBalance = data?.value === BigInt(0);
  const onePerAddressActive = guard?.toLowerCase() === Modules.ONE_PER_ADDRESS;

  return {
    disabled: onePerAddressActive && !zeroBalance,
    message:
      onePerAddressActive && !zeroBalance
        ? "User already owns one token."
        : null,
  };
}
