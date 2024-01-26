import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Erc20Owner, Erc721Token, Erc1155Owner } from "../types";
import { checksumAddress } from "viem";

const URL = "http://localhost:3000/api/ponder";

export const getErc20Owners = async (
  chainId: number,
  contractAddress: `0x${string}`
) => {
  const data = (await request(
    URL,
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
};
export function useErc20Owners(
  chainId?: number,
  contractAddress?: `0x${string}`
) {
  return useQuery({
    queryKey: ["erc20Owners"],
    queryFn: async () => {
      return await getErc20Owners(chainId!, contractAddress!);
    },
    enabled: Boolean(chainId && contractAddress),
  });
}

export const getErc721TokensForTraits = async (
  chainId: number,
  contractAddresses: `0x${string}`[],
  ownerAddress: `0x${string}`
) => {
  if (contractAddresses.length === 0) {
    return [];
  }
  const contractAddressesChecksumed = contractAddresses.map((v) =>
    checksumAddress(v)
  );
  const ownerAddressChecksumed = checksumAddress(ownerAddress);

  const data = (await request(
    URL,
    gql`
        {
          erc721Tokens(where: {chainId: ${chainId}, contractAddress_in: [\"${contractAddressesChecksumed.join(
      ","
    )}\"] ownerAddress: \"${ownerAddressChecksumed}\"}) {
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
};

export const getErc721Tokens = async (
  chainId: number,
  contractAddress: `0x${string}`
) => {
  const data = (await request(
    URL,
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
};

export function useErc721Tokens(
  chainId?: number,
  contractAddress?: `0x${string}`
) {
  return useQuery({
    queryKey: ["erc721Tokens"],
    queryFn: async () => await getErc721Tokens(chainId!, contractAddress!),
    enabled: Boolean(chainId && contractAddress),
  });
}

export const getErc1155OwnersForTraits = async (
  chainId: number,
  contractAddresses: `0x${string}`[],
  ownerAddress: `0x${string}`
) => {
  if (contractAddresses.length === 0) {
    return [];
  }
  const contractAddressesChecksumed = contractAddresses.map((v) =>
    checksumAddress(v)
  );
  const ownerAddressChecksumed = checksumAddress(ownerAddress);

  const data = (await request(
    URL,
    gql`
        {
          erc1155Tokens(where: {chainId: ${chainId}, contractAddress_in: [\"${contractAddressesChecksumed.join(
      ","
    )}\"] ownerAddress: \"${ownerAddressChecksumed}\"}) {
            id
            tokenId
            ownerAddress
            mintedAt
            balance
          }
        }
      `
  )) as { erc1155Tokens: any[] };
  return (data?.erc1155Tokens ?? []).map((v) => ({
    ...v,
    mintedAt: new Date(parseInt(v.mintedAt) * 1000),
  })) as Erc1155Owner[];
};
