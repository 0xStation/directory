import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Erc20Owner, Erc721Token } from "../types";
import { checksumAddress } from "viem";

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

export function useErc721Tokens(
  chainId?: number,
  contractAddress?: `0x${string}`
) {
  const endpoint = "/api/ponder";
  return useQuery({
    queryKey: ["erc721Tokens"],
    queryFn: async () => {
      const data = (await request(
        endpoint,
        gql`
            {
              erc721Tokens(where: {chainId: ${chainId}, contractAddress: \"${checksumAddress(
          contractAddress ?? "0x"
        )}\"}) {
                id
                tokenId
                ownerAddress
                mintedAt
                tbaAddress
              }
            }
          `
      )) as { erc721Tokens: any[] };
      return (data?.erc721Tokens ?? []).map((v) => ({
        ...v,
        mintedAt: new Date(parseInt(v.mintedAt) * 1000),
      })) as Erc721Token[];
    },
    enabled: Boolean(chainId && contractAddress),
  });
}
