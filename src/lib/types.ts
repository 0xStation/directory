export type TokenStandard = "ERC-20" | "ERC-721" | "ERC-1155";

export type TokenConfig = {
  image: string;
  chainId: number;
  contractAddress: `0x${string}`;
  tokenStandard: TokenStandard;
  slug: string;
};

export type GroupOsConfig = {
  logo: string;
  name: string;
  tokenContracts: TokenConfig[];
  theme: {
    backgroundColor: string;
    textColor: string;
  };
};
