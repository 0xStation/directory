import { useReadContract } from "wagmi";
import TokenAbi from "./abi/Token";
import { useRouter } from "next/router";
import { useContext } from "react";
import ConfigContext from "@/context/ConfigContext";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Erc20Owner } from "./types";
import { checksumAddress } from "viem";

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

  if (!router.query.tokenContract) return undefined;

  const { tokenContracts } = useContext(ConfigContext);
  const tokenContract = tokenContracts.find(
    (tokenContract) => tokenContract.slug === router.query.tokenContract
  );

  return tokenContract ?? undefined;
}

export function useErc20Owners(
  chainId?: number,
  contractAddress?: `0x${string}`
) {
  const endpoint = "/api/ponder";
  return useQuery({
    queryKey: ["erc20Owners"],
    queryFn: async () => {
      const data = (await request(
        endpoint,
        gql`
          {
            erc20Owners(where: {chainId: ${chainId}, contractAddress: \"${checksumAddress(
          contractAddress ?? "0x"
        )}\", balance_not: \"0\"}) {
              id
              ownerAddress
              balance
            }
          }
        `
      )) as { erc20Owners: any[] };
      return (data?.erc20Owners ?? []) as Erc20Owner[];
    },
    enabled: Boolean(chainId && contractAddress),
  });
}
