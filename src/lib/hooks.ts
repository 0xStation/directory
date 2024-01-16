import { useReadContract } from "wagmi";
import TokenAbi from "./abi/Token";
import { useRouter } from "next/router";
import { useContext } from "react";
import ConfigContext from "@/context/ConfigContext";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

export function useTokenContractName(
  chainId?: number,
  address?: `0x${string}`
) {
  const nameResult = useReadContract({
    chainId,
    address,
    functionName: "name",
    abi: TokenAbi,
  });
  return (nameResult.data as string) ?? "";
}

export function useTokenContractRoute() {
  const router = useRouter();

  if (!router.query.tokenContract) return null;

  const { tokenContracts } = useContext(ConfigContext);
  const tokenContract = tokenContracts.find(
    (tokenContract) => tokenContract.slug === router.query.tokenContract
  );

  return tokenContract ?? null;
}

export function useErc20Owners() {
  const endpoint = "/api/ponder";
  return useQuery({
    queryKey: ["erc20Owners"],
    queryFn: async () => {
      const data = await request(
        endpoint,
        gql`
          {
            erc20Owners {
              chainId
              contractAddress
              ownerAddress
              balance
            }
          }
        `
      );
      return data?.erc20Owners ?? [];
    },
  });
}
