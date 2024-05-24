import { createConfig } from "@ponder/core";
import { Address, Transport, http } from "viem";
import { ERC20RailsAbi, ERC721RailsAbi, ERC1155RailsAbi } from "./abis";
import config from "../web/groupos.config";
import { TokenConfig } from "../web/src/lib/types";
import { alchemyEndpointCore } from "../web/src/lib/alchemy/hooks";

type PonderNetworks = Record<string, { chainId: number; transport: Transport }>;
type PonderContracts = {
  ERC20: {
    abi: typeof ERC20RailsAbi;
    network: PonderContractNetworks;
  };
  ERC721: {
    abi: typeof ERC721RailsAbi;
    network: PonderContractNetworks;
  };
  ERC1155: {
    abi: typeof ERC1155RailsAbi;
    network: PonderContractNetworks;
  };
};
type PonderContractNetworks = Record<
  string,
  {
    address: Address[];
    startBlock: number;
  }
>;

const chainIdToName: Record<number, string> = {
  1: "mainnet",
  11155111: "sepolia",
  10: "optimism",
  8453: "base",
};

const networks: PonderNetworks = Object.entries(chainIdToName).reduce(
  (acc, v) => {
    const chainId = parseInt(v[0]);
    return {
      ...acc,
      [v[1]]: {
        chainId,
        transport: http(alchemyEndpointCore(chainId)),
      },
    };
  },
  {}
);

const filteredNetworks = config.tokenContracts.reduce((acc, v) => {
  const networkName = chainIdToName[v.chainId] as string;
  if (!networkName) {
    console.error("missing chainId in ponder config", v.chainId);
    return acc;
  }

  const networkConfig = networks[networkName as keyof typeof networks];
  if (!networkConfig) return acc;

  acc[networkName] = networkConfig;
  return acc;
}, {} as typeof networks);

const contractNetworks: PonderContractNetworks = Object.values(
  chainIdToName
).reduce(
  (acc, v) => ({
    ...acc,
    [v]: {
      address: [],
      startBlock: 0,
    },
  }),
  {}
);

const filteredContractNetworks = config.tokenContracts.reduce((acc, v) => {
  const networkName = chainIdToName[v.chainId] as string;
  if (!networkName) {
    console.error("missing chainId in ponder config", v.chainId);
    return acc;
  }

  const contractNetwork =
    contractNetworks[networkName as keyof typeof networks];
  if (!contractNetwork) return acc;

  acc[networkName] = contractNetwork;
  return acc;
}, {} as typeof contractNetworks);

const getConfigContractNetworksForPonder = () => {
  if (Object.keys(filteredContractNetworks).length === 0) {
    return {
      mainnet: {
        address: [],
        startBlock: 0,
      },
    };
  } else {
    return filteredContractNetworks;
  }
};

const getConfigNetworksForPonder = () => {
  if (Object.keys(filteredNetworks).length === 0) {
    return {
      mainnet: {
        chainId: 1,
        transport: http(alchemyEndpointCore(1)),
      },
    };
  } else {
    return filteredNetworks;
  }
};

const getContractsForPonder = () => {
  const configContractNetworks = getConfigContractNetworksForPonder();
  const contracts = (config.tokenContracts as TokenConfig[]).reduce(
    (acc: PonderContracts, v) => {
      acc[v.tokenStandard].network[chainIdToName[v.chainId]!]?.address?.push(
        v.contractAddress
      );
      if (
        // no startBlock set yet
        !acc[v.tokenStandard].network[chainIdToName[v.chainId]!]?.startBlock ||
        // or this token's creationBlock is earlier than the current startBlock value
        acc[v.tokenStandard].network[chainIdToName[v.chainId]!]!.startBlock >
          v.creationBlock
      ) {
        // set this contract's startBlock as the new token's creationBlock
        acc[v.tokenStandard].network[chainIdToName[v.chainId]!]!.startBlock =
          v.creationBlock;
      }
      return acc;
    },
    {
      ERC20: {
        abi: ERC20RailsAbi,
        network: configContractNetworks!,
      },
      ERC721: {
        abi: ERC721RailsAbi,
        network: configContractNetworks,
      },
      ERC1155: {
        abi: ERC1155RailsAbi,
        network: configContractNetworks,
      },
    }
  );

  return contracts;
};

export default createConfig({
  networks: getConfigNetworksForPonder(),
  contracts: getContractsForPonder(),
});
