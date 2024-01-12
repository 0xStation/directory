import { useReadContract } from "wagmi";

export function useTokenContractName(chainId: number, address: `0x${string}`) {
  const nameResult = useReadContract({
    chainId: chainId,
    address: address,
    functionName: "name",
  });

  return (nameResult.data as string) ?? "";
}
