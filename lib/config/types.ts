import { TokenStandard } from "../types";

export type TokenConfig = {
  image: string;
  chainId: number;
  contractAddress: `0x${string}`;
  tokenStandard: TokenStandard;
  slug: string;
};

export type GroupOsConfig = {
  name: string;
  tokenContracts: TokenConfig[];
};
