import { createConfig } from "@ponder/core";
import { Transport, http } from "viem";
import { ERC20RailsAbi, ERC721RailsAbi, ERC1155RailsAbi } from "./abis";
import config from "../groupos.config";
import { TokenConfig } from "../src/lib/types";
import { alchemyEndpointCore } from "../src/lib/alchemy/hooks";

const chainIdToName: Record<number, string> = {
  1: "mainnet",
  // 10: "optimism",
};

const contractNetworks: Record<
  string,
  { address: `0x${string}`[]; startBlock: number }
> = Object.values(chainIdToName).reduce(
  (acc, v) => ({
    ...acc,
    [v]: {
      address: [],
      startBlock: 0,
    },
  }),
  {}
);

const networks: Record<string, { chainId: number; transport: Transport }> =
  Object.entries(chainIdToName).reduce((acc, v) => {
    const chainId = parseInt(v[0]);
    return {
      ...acc,
      [v[1]]: {
        chainId,
        transport: http(alchemyEndpointCore(chainId)),
      },
    };
  }, {});

const contracts = (config.tokenContracts as TokenConfig[]).reduce(
  (acc: any, v) => {
    acc[v.tokenStandard].network[chainIdToName[v.chainId]!]?.address.push(
      v.contractAddress
    );
    if (
      // no startBlock set yet
      !acc[v.tokenStandard].network[chainIdToName[v.chainId]!]?.startBlock ||
      // or this token's creationBlock is earlier than the current startBlock value
      acc[v.tokenStandard].network[chainIdToName[v.chainId]!].startBlock >
        v.creationBlock
    ) {
      // set this contract's startBlock as the new token's creationBlock
      acc[v.tokenStandard].network[chainIdToName[v.chainId]!].startBlock =
        v.creationBlock;
    }
    return acc;
  },
  {
    ERC20: {
      abi: ERC20RailsAbi,
      network: contractNetworks,
    },
    ERC721: {
      abi: ERC721RailsAbi,
      network: contractNetworks,
    },
    ERC1155: {
      abi: ERC1155RailsAbi,
      network: contractNetworks,
    },
  }
);

export default createConfig({
  networks,
  contracts,
});
