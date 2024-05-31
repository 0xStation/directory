import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Erc1155Owner, Erc20Owner, Erc721Token } from "../types";
import { Address, checksumAddress, erc20Abi, isAddressEqual } from "viem";
import config from "../../../groupos.config";
import { readContract } from "viem/actions";
import { getClient } from "../viem/client";
import { getImage } from "../erc721/metadata";

const URL = "/api/ponder";

export const getErc20Owners = async (
  chainId: number,
  contractAddress: Address,
  url = URL
) => {
  const data = (await request(
    url,
    gql`
        {
          erc20Owners(where: {chainId: ${chainId}, contractAddress: \"${checksumAddress(
      contractAddress ?? "0x"
    )}\", balance_not: \"0\"}) {
            items {
              id
              ownerAddress
              balance
            }
          }
        }
      `
  )) as { erc20Owners: { items: any[] } };
  return (data?.erc20Owners?.items ?? []) as Erc20Owner[];
};

export function useErc20Owners(chainId?: number, contractAddress?: Address) {
  return useQuery({
    queryKey: ["erc20Owners", chainId, contractAddress],
    queryFn: async () => {
      return await getErc20Owners(chainId!, contractAddress!);
    },
    enabled: Boolean(chainId && contractAddress),
  });
}

export const getErc721Tokens = async (
  chainId: number,
  contractAddress: Address,
  url = URL
) => {
  const data = (await request(
    url,
    gql`
        {
          erc721Tokens(where: {chainId: ${chainId}, contractAddress: \"${checksumAddress(
      contractAddress ?? "0x"
    )}\"}, orderBy: "mintedAt", orderDirection: "desc") {
            items {
              id
              tokenId
              ownerAddress
              mintedAt
              tbaAddress
            }
          }
        }
      `
  )) as { erc721Tokens: { items: any[] } };
  return (data?.erc721Tokens?.items ?? []).map((v) => ({
    ...v,
    mintedAt: new Date(parseInt(v.mintedAt) * 1000),
  })) as Erc721Token[];
};

export function useErc721Tokens(chainId?: number, contractAddress?: Address) {
  return useQuery({
    queryKey: ["erc721Tokens", chainId, contractAddress],
    queryFn: async () => await getErc721Tokens(chainId!, contractAddress!),
    enabled: Boolean(chainId && contractAddress),
  });
}

export const getErc1155Owners = async (
  chainId: number,
  contractAddress: Address,
  url = URL
) => {
  const data = (await request(
    url,
    gql`
        {
          erc1155Owners(where: {chainId: ${chainId}, contractAddress: \"${checksumAddress(
      contractAddress ?? "0x"
    )}\", balance_not: \"0\"}) {
            items {
              id
              ownerAddress
              tokenId
              balance
            }
          }
        }
      `
  )) as { erc1155Owners: { items: any[] } };
  return (data?.erc1155Owners?.items ?? []) as Erc1155Owner[];
};

export function useErc1155Owners(chainId?: number, contractAddress?: Address) {
  return useQuery({
    queryKey: ["erc1155Owners", chainId, contractAddress],
    queryFn: async () => {
      return await getErc1155Owners(chainId!, contractAddress!);
    },
    enabled: Boolean(chainId && contractAddress),
  });
}

export const getErc721Tba = async (tbaAddress: Address, url = URL) => {
  const data = (await request(
    url,
    gql`
        {
          erc721Tokens(where: {tbaAddress: \"${checksumAddress(
            tbaAddress ?? "0x"
          )}\"}) {
            items {
              id
              chainId
              contractAddress
              tokenId
            }
          }
        }
      `
  )) as { erc721Tokens: { items: any[] } };
  return (data?.erc721Tokens?.items ?? []) as Erc721Token[];
};

export function useTbaMetadata(tbaAddress?: Address) {
  return useQuery({
    queryKey: ["tbaMetadata", tbaAddress],
    queryFn: async () => {
      try {
        const erc721Tokens = await getErc721Tba(tbaAddress!);
        if (erc721Tokens.length === 0) {
          throw Error("no tba found");
        } else {
          const { chainId, contractAddress, tokenId } = erc721Tokens[0];
          const tokenContractName = await readContract(getClient(chainId), {
            abi: erc20Abi,
            address: contractAddress,
            functionName: "name",
          });
          const tokenContract = config.tokenContracts.find(
            (v) =>
              v.chainId === chainId &&
              isAddressEqual(v.contractAddress, contractAddress)
          );
          if (!tokenContract) {
            throw Error("no token contract found");
          }
          const tokenMetadata = tokenContract?.nftMetadata?.tokens?.[tokenId];
          return {
            name: tokenMetadata?.name ?? `${tokenContractName} #${tokenId}`,
            image: getImage(tokenContract, tokenId),
          };
        }
      } catch {
        return null;
      }
    },
    staleTime: 10 * 60 * 1000,
    enabled: Boolean(tbaAddress),
  });
}
