import { useQuery } from "@tanstack/react-query";
import { checksumAddress, erc20Abi, formatUnits, zeroAddress } from "viem";
import { networkName } from "../utils";
import { useReadContracts } from "wagmi";

export const alchemyChainIdToChainName: Record<number, string | undefined> = {
  1: "eth-mainnet",
  5: "eth-goerli",
  10: "opt-mainnet",
  137: "polygon-mainnet",
};

export const alchemyEndpointCore = (chainId: number) => {
  return `https://${alchemyChainIdToChainName[chainId]}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
};

export const alchemyEndpointNftBalances = (
  chainId: number,
  address: string
) => {
  return `https://${alchemyChainIdToChainName[chainId]}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetata=true`;
};

export function useAlchemyTokenBalances({
  chainId,
  address,
}: {
  chainId?: number;
  address?: `0x${string}`;
}) {
  const { data: tokenBalances, isFetching: isFetchingTokenBalances } = useQuery(
    {
      queryKey: ["alchemyTokenBalances", chainId, address],
      queryFn: async () => {
        const url = alchemyEndpointCore(chainId!);

        const [ethBalance, tokenBalances] = await Promise.all([
          await (
            await fetch(url, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                // id doesn't matter
                id: 1,
                jsonrpc: "2.0",
                method: "eth_getBalance",
                params: [address, "latest"],
              }),
            })
          ).json(),
          await (
            await fetch(url, {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-type": "application/json",
              },
              body: JSON.stringify({
                // id doesn't matter
                id: 1,
                jsonrpc: "2.0",
                method: "alchemy_getTokenBalances",
                params: [address, "erc20"],
              }),
            })
          ).json(),
        ]);

        return {
          address,
          balances: [
            {
              contractAddress: zeroAddress,
              value: BigInt(ethBalance?.result ?? "0").toString(),
            },
            ...(tokenBalances?.result?.tokenBalances ?? []).map((tx: any) => ({
              contractAddress: tx.contractAddress,
              value: BigInt(tx.tokenBalance).toString(),
            })),
          ],
        };
      },
      enabled: Boolean(chainId && address),
    }
  );

  const nonZeroBalances =
    tokenBalances?.balances.filter((balance) => balance.value !== "0") || [];

  const gasToken = nonZeroBalances
    .filter((balance) => balance.contractAddress === zeroAddress)
    .map((balance) => ({
      contractAddress: balance.contractAddress,
      name: networkName[chainId!] + (chainId !== 137 ? " ETH" : " MATIC"),
      symbol: chainId !== 137 ? "ETH" : "MATIC",
      balance: balance.value,
      decimals: 18,
    }))?.[0];

  const contractAddresses = nonZeroBalances
    .filter((address) => address !== zeroAddress)
    .map((balance) => balance.contractAddress);

  const { data: tokenMetadata, isFetching: isFetchingTokenMetadata } =
    useReadContracts({
      contracts: contractAddresses
        .map((address) =>
          ["name", "symbol", "decimals"].map((functionName) => ({
            abi: erc20Abi,
            chainId,
            address,
            functionName,
          }))
        )
        .reduce((acc, v) => [...acc, ...v], []),
    });

  const fts = nonZeroBalances
    .filter((address) => address !== zeroAddress)
    .map((balance, i) => ({
      contractAddress: checksumAddress(balance.contractAddress),
      balance: balance.value as string,
      name: tokenMetadata?.[3 * i]?.result as string,
      symbol: tokenMetadata?.[3 * i + 1]?.result as string,
      decimals: tokenMetadata?.[3 * i + 2]?.result as number,
    }));

  return {
    data: fts ?? [],
    isFetching: isFetchingTokenBalances || isFetchingTokenMetadata,
  };
}
