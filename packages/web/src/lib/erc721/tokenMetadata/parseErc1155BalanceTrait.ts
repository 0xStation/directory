import { ComputedTrait } from "@/lib/types";
import { checksumAddress } from "viem";

export const parseErc1155BalanceTrait = (
  trait: ComputedTrait,
  token: any,
  erc1155OwnersForTraits: any
): { trait_type: string; value: string } => {
  let erc1155Tokens: any[] = [];
  // @ts-ignore
  if (trait.data.tokenIdSpecifier === "ALL") {
    erc1155Tokens = erc1155OwnersForTraits.filter(
      (erc1155Token: any) =>
        checksumAddress(erc1155Token.contractAddress) ===
          checksumAddress(trait.sourceContractAddress) &&
        checksumAddress(erc1155Token.ownerAddress) ===
          checksumAddress(token.tbaAddress)
    );
  } else {
    // @ts-ignore
    const validTokenIds = trait.data?.tokenId?.split(",");
    erc1155Tokens = erc1155OwnersForTraits.filter(
      (erc1155Token: any) =>
        checksumAddress(erc1155Token.contractAddress) ===
          checksumAddress(trait.sourceContractAddress) &&
        checksumAddress(erc1155Token.ownerAddress) ===
          checksumAddress(token.tbaAddress) &&
        validTokenIds.includes(erc1155Token.tokenId)
    );
  }

  return {
    trait_type: trait.name,
    value: erc1155Tokens
      .reduce((acc, erc1155Token) => {
        return acc + parseInt(erc1155Token.balance);
      }, 0)
      .toString(),
  };
};
