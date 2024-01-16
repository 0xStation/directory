import { createConfig } from "@ponder/core";
import { http } from "viem";
import { ERC20RailsAbi, ERC721RailsAbi, ERC1155RailsAbi } from "./abis";
import config from "../groupos.config";
import { TokenConfig } from "../src/lib/types";

const chainIdToName: Record<number, string> = {
  10: "optimism",
};

const defaultNetworks: Record<
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

const contracts = (config.tokenContracts as TokenConfig[]).reduce(
  (acc: any, v) => {
    acc[v.tokenStandard].network[chainIdToName[v.chainId]!]?.address.push(
      v.contractAddress
    );
    return acc;
  },
  {
    ERC20: {
      abi: ERC20RailsAbi,
      network: defaultNetworks,
    },
    ERC721: {
      abi: ERC721RailsAbi,
      network: defaultNetworks,
    },
    ERC1155: {
      abi: ERC1155RailsAbi,
      network: defaultNetworks,
    },
  }
);

export default createConfig({
  networks: {
    optimism: {
      chainId: 10,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts,
});
