import { Color, TokenStandard } from "../types";

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
  colors: {
    tokenStandard: {
      ERC20: Color;
      ERC721: Color;
      ERC1155: Color;
    };
  };
};
