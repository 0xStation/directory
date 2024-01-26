import { TokenTrait } from "@/lib/types";

export const parseErc1155TierTrait = (
  trait: TokenTrait,
  token: any,
  erc1155OwnersForTraits: any
): { trait_type: string; value: string } => {
  // @ts-ignore
  const validTraitTokenIds = trait.data.tiers.map((tier: any) => tier.tokenId);

  const erc1155Owners = erc1155OwnersForTraits.filter(
    (erc1155Owner: any) =>
      erc1155Owner.tokenContractAddress === trait.sourceContractAddress &&
      erc1155Owner.ownerAddress === token.primaryTbaAddress &&
      validTraitTokenIds.includes(erc1155Owner.tokenId)
  );

  const highestTierTokenIdOwned = validTraitTokenIds.find((tokenId: any) => {
    return erc1155Owners.find((erc1155Owner: any) => {
      return erc1155Owner.tokenId === tokenId;
    });
  });

  if (!highestTierTokenIdOwned) {
    return {
      trait_type: trait.name,
      value: "N/A",
    };
  }

  const highestTierOwner = erc1155Owners.find((erc1155Owner: any) => {
    return erc1155Owner.tokenId === highestTierTokenIdOwned;
  });

  return {
    trait_type: trait.name,
    value:
      highestTierOwner.token.data.individualMetadata.name ||
      `#${highestTierOwner.tokenId}`,
  };
};
