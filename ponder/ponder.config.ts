import { createConfig, mergeAbis } from "@ponder/core";
import { http, parseAbiItem } from "viem";
import {
  TokenFactoryAbi,
  PermissionsAbi,
  ExtensionsAbi,
  OwnerAbi,
} from "./abis";

const START_BLOCK = 10200000;

export default createConfig({
  networks: {
    goerli: {
      chainId: 5,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    // Token Factory
    TokenFactory: {
      network: "goerli",
      abi: TokenFactoryAbi,
      address: "0x2c333bd1316ce1af9ebf017a595d6f8ab5f6bd1a",
      startBlock: START_BLOCK,
    },
    // Rails ERC 1155
    Rails1155: {
      network: "goerli",
      abi: mergeAbis([
        PermissionsAbi,
        TokenFactoryAbi,
        ExtensionsAbi,
        OwnerAbi,
      ]),
      factory: {
        address: "0x2c333bd1316ce1af9ebf017a595d6f8ab5f6bd1a",
        event: parseAbiItem("event ERC1155Created(address indexed token)"),
        parameter: "token",
      },
      startBlock: START_BLOCK,
    },
    // Rails ERC 721
    Rails721: {
      network: "goerli",
      abi: mergeAbis([
        PermissionsAbi,
        TokenFactoryAbi,
        ExtensionsAbi,
        OwnerAbi,
      ]),
      factory: {
        address: "0x2c333bd1316ce1af9ebf017a595d6f8ab5f6bd1a",
        event: parseAbiItem("event ERC721Created(address indexed token)"),
        parameter: "token",
      },
      startBlock: START_BLOCK,
    },
    // Rails ERC 20
    Rails20: {
      network: "goerli",
      abi: mergeAbis([
        PermissionsAbi,
        TokenFactoryAbi,
        ExtensionsAbi,
        OwnerAbi,
      ]),
      factory: {
        address: "0x2c333bd1316ce1af9ebf017a595d6f8ab5f6bd1a",
        event: parseAbiItem("event ERC29Created(address indexed token)"),
        parameter: "token",
      },
      startBlock: START_BLOCK,
    },
  },
});
