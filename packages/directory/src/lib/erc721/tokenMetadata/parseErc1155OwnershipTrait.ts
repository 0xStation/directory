import { TokenTrait } from "@/lib/types";

// returns true or false if TBA owns any of the tokens
export const parseErc1155OwnershipTrait = (
  trait: TokenTrait,
  token: any,
  erc1155OwnersForTraits: any
) => {
  let erc1155Owners: any[] = [];
  // @ts-ignore
  if (trait.data.tokenIdSpecifier === "ANY") {
    erc1155Owners = erc1155OwnersForTraits.filter(
      (erc1155Owner: any) =>
        erc1155Owner.tokenContractAddress === trait.sourceContractAddress &&
        erc1155Owner.ownerAddress === token.primaryTbaAddress
    );
  } else {
    // @ts-ignore
    const validTokenIds = trait.data?.tokenId?.split(",");
    erc1155Owners = erc1155OwnersForTraits.filter(
      (erc1155Owner: any) =>
        erc1155Owner.tokenContractAddress === trait.sourceContractAddress &&
        erc1155Owner.ownerAddress === token.primaryTbaAddress &&
        validTokenIds.includes(erc1155Owner.tokenId)
    );
  }

  return {
    trait_type: trait.name,
    value: erc1155Owners.some(
      (erc1155Owner: any) =>
        erc1155Owner.ownerAddress === token.primaryTbaAddress
    )
      ? "True"
      : "False",
  };
};
