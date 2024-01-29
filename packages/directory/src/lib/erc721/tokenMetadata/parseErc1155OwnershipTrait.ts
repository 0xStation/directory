import { TokenTrait } from "@/lib/types";
import { checksumAddress } from "viem";

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
        checksumAddress(erc1155Owner.contractAddress) ===
          checksumAddress(trait.sourceContractAddress) &&
        checksumAddress(erc1155Owner.ownerAddress) ===
          checksumAddress(token.tbaAddress)
    );
  } else {
    // @ts-ignore
    const validTokenIds = trait.data?.tokenId?.split(",");
    erc1155Owners = erc1155OwnersForTraits.filter(
      (erc1155Owner: any) =>
        checksumAddress(erc1155Owner.contractAddress) ===
          checksumAddress(trait.sourceContractAddress) &&
        checksumAddress(erc1155Owner.ownerAddress) ===
          checksumAddress(token.tbaAddress) &&
        validTokenIds.includes(erc1155Owner.tokenId)
    );
  }

  return {
    trait_type: trait.name,
    value: erc1155Owners.some(
      (erc1155Owner: any) =>
        checksumAddress(erc1155Owner.ownerAddress) ===
        checksumAddress(token.tbaAddress)
    )
      ? "True"
      : "False",
  };
};
