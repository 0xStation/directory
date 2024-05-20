import { ComputedTrait } from "@/lib/types";
import { isAddressEqual } from "viem";
import config from "../../../../groupos.config";

export const parseErc1155TierTrait = (
  trait: ComputedTrait,
  token: any,
  erc1155OwnersForTraits: any
): { trait_type: string; value: string } => {
  const validTraitTokenIds: string[] = trait.data.tiers.map(
    (tier: { tokenId: string }) => tier.tokenId
  );

  const erc1155Owners = erc1155OwnersForTraits.filter(
    (erc1155Owner: any) =>
      isAddressEqual(
        erc1155Owner.contractAddress,
        trait.sourceContractAddress
      ) &&
      isAddressEqual(erc1155Owner.ownerAddress, token.tbaAddress) &&
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

  const tokenContract = config.tokenContracts.find((v) =>
    isAddressEqual(v.contractAddress, highestTierOwner.contractAddress)
  );
  const tokenMetadata = Object.entries(
    tokenContract?.nftMetadata?.tokens ?? {}
  ).find(([k, v]) => k === highestTierTokenIdOwned)?.[1];

  return {
    trait_type: trait.name,
    value: tokenMetadata?.name || `#${highestTierTokenIdOwned}`,
  };
};
