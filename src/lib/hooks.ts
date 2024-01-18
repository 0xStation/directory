import { useReadContract } from "wagmi";
import TokenAbi from "./abi/Token";
import { useRouter } from "next/router";
import { useContext } from "react";
import ConfigContext from "@/context/ConfigContext";
import { useQuery } from "@tanstack/react-query";
import { NftMetadata, TokenConfig } from "./types";
import NftAbi from "./abi/Nft";
import { useAlchemyTokenBalances } from "./alchemy/hooks";

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

export function useNftMetadata(tokenContract?: TokenConfig, tokenId?: string) {
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

export function useTokenInventory({
  chainId,
  address,
}: {
  chainId?: number;
  address?: `0x${string}`;
}) {
  const { data: fts, isFetching: isFetchingFts } = useAlchemyTokenBalances({
    chainId,
    address,
  });

  return {
    fts,
    nfts: [],
    isFetching: isFetchingFts,
  };
}
