import { formatDate, truncateBytes } from "@/lib/utils";
import { parseErc20BalanceTrait } from "./tokenMetadata/parseErc20BalanceTrait";
import { parseErc20TierTrait } from "./tokenMetadata/parseErc20TierTrait";
import { parseErc1155BalanceTrait } from "./tokenMetadata/parseErc1155BalanceTrait";
import { parseErc1155RoleTrait } from "./tokenMetadata/parseErc1155RoleTrait";
import { parseErc1155TierTrait } from "./tokenMetadata/parseErc1155TierTrait";
import { parseErc1155OwnershipTrait } from "./tokenMetadata/parseErc1155OwnershipTrait";
import { parseErc721BalanceTrait } from "./tokenMetadata/parseErc721BalanceTrait";
import { parseErc721OwnershipTrait } from "./tokenMetadata/parseErc721OwnershipTrait";
import {
  Trait,
  TokenConfig,
  Erc721Token,
  Erc20Owner,
  Erc1155Owner,
  BASIC_TRAIT_TYPE,
  TOKEN_TRAIT_TYPE,
} from "@/lib/types";

/**
 *
 * @param trait
 * @param erc721Token
 * @returns value
 *
 * @note add more cases here as we support more trait types
 */
const getTraitValue = (trait: Trait, erc721Token: Erc721Token | null) => {
  switch (trait.type) {
    case BASIC_TRAIT_TYPE.CUSTOM_TEXT:
      return trait.value;
    case BASIC_TRAIT_TYPE.CUSTOM_NUMBER:
      return trait.value;
    case BASIC_TRAIT_TYPE.OWNER_ADDRESS:
      return truncateBytes(erc721Token?.ownerAddress || "");
    case BASIC_TRAIT_TYPE.MINTED_AT:
      return formatDate(erc721Token?.mintedAt, true);
    default:
      return "";
  }
};

export type NftMetadataAttribute = {
  trait_type: string;
  value: string | number;
  display_type?: string;
};

export type NftMetadata = {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: NftMetadataAttribute[];
};

// ercs are optional so that way we can opt-in
// to generating token-traits only where we know we need it
type GenerateMetadataArgs = {
  tokenContract: TokenConfig;
  erc721Token: Erc721Token | null;
  erc20Traits?: Erc20Owner[];
  erc721Traits?: Erc721Token[];
  erc1155Traits?: Erc1155Owner[];
  includeTokenTraits?: boolean;
  overrideImage?: string | null;
};

/**
 *
 * @param erc721Token
 * @param tokenContract
 * @returns metadata object
 *
 * @description Used to generate metadata for a erc721Token. This is useful for opensea, or for our own platform.
 */
export const generateMetadataForErc721 = ({
  tokenContract,
  erc721Token,
  erc20Traits,
  erc721Traits,
  erc1155Traits,
  overrideImage = null,
  includeTokenTraits = false,
}: GenerateMetadataArgs) => {
  const tokenContractAttributes = (tokenContract.traits ?? []).map((trait) => {
    return {
      trait_type: trait.name,
      value: getTraitValue(trait, erc721Token),
    };
  });

  const tokenTraits =
    includeTokenTraits && erc721Token
      ? generateTokenTraits({
          tokenContract: tokenContract,
          token: erc721Token,
          erc20OwnersForTraits: erc20Traits,
          erc721TokensForTraits: erc721Traits,
          erc1155OwnersForTraits: erc1155Traits,
        })
      : [];

  const attributes = [...tokenContractAttributes, ...tokenTraits];

  return {
    name: erc721Token?.tokenId
      ? tokenContract.slug + " #" + erc721Token?.tokenId
      : tokenContract.slug,
    description: tokenContract.description,
    image: overrideImage ? overrideImage : tokenContract.image,
    // TODO -- add external directory now that we are self-hosted
    // external_url:
    //   individualMetadata?.external_url ??
    //   `https://groupos.xyz${directory(
    //     tokenContract.chainId,
    //     tokenContract.contractAddress
    //   )}`,
    ...(tokenContract?.animation_url && {
      animation_url: tokenContract.animation_url,
    }),
    attributes: attributes,
  };
};

type GenerateTokenTraitArgs = {
  tokenContract: TokenConfig;
  token: Erc721Token;
  erc20OwnersForTraits: any;
  erc721TokensForTraits: any;
  erc1155OwnersForTraits: any;
};

const generateTokenTraits = ({
  tokenContract,
  token,
  erc20OwnersForTraits,
  erc721TokensForTraits,
  erc1155OwnersForTraits,
}: GenerateTokenTraitArgs) => {
  if (!tokenContract.tokenTraits) return [];
  return tokenContract.tokenTraits
    .map((trait) => {
      if (trait.type === TOKEN_TRAIT_TYPE.ERC20Balance) {
        return parseErc20BalanceTrait(trait, token, erc20OwnersForTraits);
      } else if (trait.type === TOKEN_TRAIT_TYPE.ERC20Tier) {
        return parseErc20TierTrait(trait, token, erc20OwnersForTraits);
      } else if (trait.type === TOKEN_TRAIT_TYPE.ERC721Balance) {
        return parseErc721BalanceTrait(trait, token, erc721TokensForTraits);
      } else if (trait.type === TOKEN_TRAIT_TYPE.ERC721Ownership) {
        return parseErc721OwnershipTrait(trait, token, erc721TokensForTraits);
      } else if (trait.type === TOKEN_TRAIT_TYPE.ERC1155Balance) {
        return parseErc1155BalanceTrait(trait, token, erc1155OwnersForTraits);
      } else if (trait.type === TOKEN_TRAIT_TYPE.ERC1155Role) {
        return parseErc1155RoleTrait(
          trait,
          token,
          erc1155OwnersForTraits,
          tokenContract
        );
      } else if (trait.type === TOKEN_TRAIT_TYPE.ERC1155Tier) {
        return parseErc1155TierTrait(trait, token, erc1155OwnersForTraits);
      } else if (trait.type === TOKEN_TRAIT_TYPE.ERC1155Ownership) {
        return parseErc1155OwnershipTrait(trait, token, erc1155OwnersForTraits);
      } else return { trait_type: "", value: "" };
    })
    .filter((trait) => trait !== null)
    .flat() as NftMetadataAttribute[];
};
