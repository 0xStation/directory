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
  creationBlock: number;
  addTokenboundAccounts?: boolean;
  tokenTraits: TokenTrait[];
};

export type TokenTrait = {
  sourceContractAddress: `0x${string}`;
  targetContractAddress: `0x${string}`;
};

export type GroupOsConfig = {
  logo: string;
  name: string;
  githubRepo: string;
  tokenContracts: TokenConfig[];
  tokenboundAccounts: {
    registry: `0x${string}`;
    implementation: `0x${string}`;
    salt: `0x${string}`;
  };
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
  chainId: number;
  contractAddress: `0x${string}`;
  tokenId: string;
  ownerAddress: `0x${string}`;
  mintedAt: Date;
  tbaAddress: `0x${string}`;
};

export type Erc1155Owner = {
  id: string;
  chainId: number;
  contractAddress: `0x${string}`;
  tokenId: string;
  ownerAddress: `0x${string}`;
  balance: string;
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
