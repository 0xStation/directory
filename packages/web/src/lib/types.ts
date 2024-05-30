import { Address, Hex } from "viem";

export type TokenStandard = "ERC20" | "ERC721" | "ERC1155";
export type Color =
  | "gray"
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "red"
  | "yellow";

export enum ComputedTraitType {
  ERC20Balance = "ERC20Balance",
  ERC721Balance = "ERC721Balance",
  ERC1155Balance = "ERC1155Balance",
  ERC20Tier = "ERC20Tier",
  ERC1155Tier = "ERC1155Tier",
  ERC721Ownership = "ERC721Ownership",
  ERC1155Ownership = "ERC1155Ownership",
  ERC1155Role = "ERC1155Role",
}

export type TokenConfig = {
  image: string;
  chainId: number;
  contractAddress: `0x${string}`;
  tokenStandard: TokenStandard;
  slug: string;
  description: string;
  creationBlock: number;
  addTokenboundAccounts?: boolean;
  nftMetadata?: {
    image?: string; // replace keywords {chainId}, {contractAddress}, {tokenId}
    computedTraits?: ComputedTrait[];
    tokens?: Record<
      string,
      {
        name?: string;
        description?: string;
        image?: string;
        traits?: Trait[];
      }
    >;
  };
  showOnDashboard?: boolean;
  mintPage?: {
    controller: Address;
    background?: string;
    cta?: string;
    successMessage?: string;
    successAction?: {
      cta: string;
      url: string;
    };
  };
};

export type ComputedTrait = {
  sourceContractAddress: Address;
  name: string;
  type: ComputedTraitType;
  data: any;
};

export type Trait = {
  name: string;
  value: string;
};

export type GroupOsConfig = {
  logo: string;
  name: string;
  githubRepo: string;
  tokenContracts: TokenConfig[];
  tokenboundAccounts: {
    registry: Address;
    implementation: Address;
    salt: Hex;
    proxyImplementation: Address;
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
  ownerAddress: Address;
  balance: string;
};

export type Erc721Token = {
  id: string;
  chainId: number;
  contractAddress: Address;
  tokenId: string;
  ownerAddress: Address;
  mintedAt: Date;
  tbaAddress: Address;
};

export type Erc1155Owner = {
  id: string;
  chainId: number;
  contractAddress: Address;
  tokenId: string;
  ownerAddress: Address;
  balance: string;
};

export type NftMetadata = {
  name: string;
  description?: string;
  image: string;
  attributes: NftMetadataAttribute[];
  external_url?: string;
  animation_url?: string;
};

export type NftMetadataAttribute = {
  trait_type: string;
  value: string | number;
  display_type?: string;
};

export type ContractMetadata = {
  name: string;
  description: string;
  image: string;
  banner_image?: string;
  features_image?: string;
  external_link?: string;
  collaborators?: Address[];
};
