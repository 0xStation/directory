import { createConfig } from "@ponder/core";
import { Transport, http } from "viem";
import { ERC20RailsAbi, ERC721RailsAbi, ERC1155RailsAbi } from "./abis";
import config from "../directory/groupos.config";
import { TokenConfig } from "../directory/src/lib/types";
import { alchemyEndpointCore } from "../directory/src/lib/alchemy/hooks";

const chainIdToName: Record<number, string> = {
  1: "mainnet",
  10: "optimism",
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

const configContractNetworks = config.tokenContracts.reduce((acc, v) => {
  const network = chainIdToName[v.chainId] as string;
  if (!network) return acc;

  const contractNetwork = contractNetworks[network as keyof typeof networks];
  if (!contractNetwork) return acc;

  acc[network] = contractNetwork;
  return acc;
}, {} as typeof contractNetworks);

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

const getConfigContractNetworksForPonder = () => {
  if (Object.keys(configNetworks).length === 0) {
    return {
      mainnet: contractNetworks.mainnet,
    };
  } else {
    return configNetworks;
  }
};

const configNetworks = config.tokenContracts.reduce((acc, v) => {
  const network = chainIdToName[v.chainId] as string;
  if (!network) return acc;

  const networkConfig = networks[network as keyof typeof networks];
  if (!networkConfig) return acc;

  acc[network] = networkConfig;
  return acc;
}, {} as typeof networks);

const getConfigNetworksForPonder = () => {
  if (Object.keys(configNetworks).length === 0) {
    return {
      mainnet: {
        chainId: 1,
        transport: http(alchemyEndpointCore(1)),
      },
    };
  } else {
    return configNetworks;
  }
};

const getContractsForPonder = () => {
  const configContractNetworks = getConfigContractNetworksForPonder();
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
        network: configContractNetworks,
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
