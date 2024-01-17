export type TokenStandard = "ERC20" | "ERC721" | "ERC1155";
export type Color =
  | "gray"
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "red"
  | "yellow";

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
    colors: {
      // accents
      action: string;
      red: string;
      green: string;
      blue: string;
      orange: string;
      yellow: string;
      purple: string;
      // core
      primary: string;
      secondary: string;
      highlight: string;
      highlightFaint: string;
      background: string;
    };
  };
};

export type Erc20Owner = {
  id: string;
  ownerAddress: `0x${string}`;
  balance: string;
};

export type Erc721Token = {
  id: string;
  tokenId: string;
  ownerAddress: `0x${string}`;
  mintedAt: Date;
};

export type NftMetadata = {
  name: string;
  description?: string;
  image: string;
  external_url?: string;
  attributes?: {
    trait_type: string;
    value: string | number;
  }[];
};
