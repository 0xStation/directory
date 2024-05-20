import { parseErc20BalanceTrait } from "./tokenMetadata/parseErc20BalanceTrait";
import { parseErc20TierTrait } from "./tokenMetadata/parseErc20TierTrait";
import { parseErc1155BalanceTrait } from "./tokenMetadata/parseErc1155BalanceTrait";
import { parseErc1155RoleTrait } from "./tokenMetadata/parseErc1155RoleTrait";
import { parseErc1155TierTrait } from "./tokenMetadata/parseErc1155TierTrait";
import { parseErc1155OwnershipTrait } from "./tokenMetadata/parseErc1155OwnershipTrait";
import { parseErc721BalanceTrait } from "./tokenMetadata/parseErc721BalanceTrait";
import { parseErc721OwnershipTrait } from "./tokenMetadata/parseErc721OwnershipTrait";
import {
  TokenConfig,
  ComputedTraitType,
  NftMetadataAttribute,
} from "@/lib/types";
import { Address } from "viem";

export function getImage(tokenContract: TokenConfig, tokenId: string) {
  if (tokenContract.nftMetadata?.image) {
    return tokenContract.nftMetadata?.image
      .replace("{chainId}", tokenContract.chainId.toString())
      .replace("{contractAddress}", tokenContract.contractAddress)
      .replace("{tokenId}", tokenId);
  } else {
    const tokenMetadata = tokenContract.nftMetadata?.tokens?.[tokenId];
    return getImageFromPath(tokenMetadata?.image ?? tokenContract.image);
  }
}

export const getImageFromPath = (path: string) => {
  if (path[0] === "/") {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=${path}&w=256&q=75`;
  }
  return path;
};

type GenerateComputedTraitArgs = {
  tokenContract: TokenConfig;
  token: { tbaAddress: Address };
  erc20OwnersForTraits: any;
  erc721TokensForTraits: any;
  erc1155OwnersForTraits: any;
};

export const generateComputedTraits = ({
  tokenContract,
  token,
  erc20OwnersForTraits,
  erc721TokensForTraits,
  erc1155OwnersForTraits,
}: GenerateComputedTraitArgs) => {
  if (!tokenContract.nftMetadata?.computedTraits) return [];
  return tokenContract.nftMetadata?.computedTraits
    .map((trait) => {
      switch (trait.type) {
        case ComputedTraitType.ERC20Balance:
          return parseErc20BalanceTrait(trait, token, erc20OwnersForTraits);
        case ComputedTraitType.ERC20Tier:
          return parseErc20TierTrait(trait, token, erc20OwnersForTraits);
        case ComputedTraitType.ERC721Balance:
          return parseErc721BalanceTrait(trait, token, erc721TokensForTraits);
        case ComputedTraitType.ERC721Ownership:
          return parseErc721OwnershipTrait(trait, token, erc721TokensForTraits);
        case ComputedTraitType.ERC1155Balance:
          return parseErc1155BalanceTrait(trait, token, erc1155OwnersForTraits);
        case ComputedTraitType.ERC1155Role:
          return parseErc1155RoleTrait(
            trait,
            token,
            erc1155OwnersForTraits,
            tokenContract
          );
        case ComputedTraitType.ERC1155Tier:
          return parseErc1155TierTrait(trait, token, erc1155OwnersForTraits);
        case ComputedTraitType.ERC1155Ownership:
          return parseErc1155OwnershipTrait(
            trait,
            token,
            erc1155OwnersForTraits
          );
        default:
          return { trait_type: "", value: "" };
      }
    })
    .filter((trait) => trait !== null)
    .flat() as NftMetadataAttribute[];
};
