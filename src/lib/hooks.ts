import { useReadContract } from "wagmi";
import TokenAbi from "./abi/Token";

export function useTokenContractName(chainId: number, address: `0x${string}`) {
  const nameResult = useReadContract({
    chainId,
    address,
    functionName: "name",
    abi: TokenAbi,
  });
  return (nameResult.data as string) ?? "";
}
