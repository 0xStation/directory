import { useReadContract } from "wagmi";
import TokenAbi from "./abi/Token";
import { useRouter } from "next/router";
import { useContext } from "react";
import ConfigContext from "@/context/ConfigContext";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Erc20Owner, Erc721Token, NftMetadata, TokenConfig } from "./types";
import { checksumAddress } from "viem";
import NftAbi from "./abi/Nft";

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

export function useNftMetadata(tokenContract?: TokenConfig, tokenId?: string) {
  console.log(
    tokenContract?.chainId,
    tokenContract?.contractAddress,
    tokenContract?.tokenStandard,
    tokenId
  );

  const functionName =
    tokenContract?.tokenStandard === "ERC721" ? "tokenURI" : "uri";
  const uriResult = useReadContract({
    abi: NftAbi,
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    functionName,
    args: [BigInt(tokenId ?? "")],
    query: {
      enabled:
        tokenContract?.tokenStandard === "ERC721" ||
        tokenContract?.tokenStandard === "ERC1155",
    },
  });
  const uri = uriResult.data as string;
  console.log("uri", uri);

  const metadata = useQuery({
    queryKey: [tokenContract?.chainId, tokenContract?.contractAddress, tokenId],
    queryFn: async () => {
      const res = await fetch(uri);
      const data = await res.json();
      console.log("data", data);
      return data as NftMetadata;
    },
    enabled: Boolean(tokenContract && tokenId),
  });

  return metadata;
}
