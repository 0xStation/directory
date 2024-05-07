import { ComputedTrait } from "@/lib/types";
import { checksumAddress } from "viem";

export const parseErc721OwnershipTrait = (
  trait: ComputedTrait,
  token: any,
  erc721TokensForTraits: any
): { trait_type: string; value: string } => {
  let erc721Tokens: any[] = [];
  // @ts-ignore
  if (trait.data.tokenIdSpecifier === "ANY") {
    erc721Tokens = erc721TokensForTraits.filter(
      (erc721Token: any) =>
        checksumAddress(erc721Token.contractAddress) ===
          checksumAddress(trait.sourceContractAddress) &&
        checksumAddress(erc721Token.ownerAddress) ===
          checksumAddress(token.tbaAddress)
    );
  } else {
    // @ts-ignore
    const validTokenIds = trait.data?.tokenId?.split(",");
    erc721Tokens = erc721TokensForTraits.filter(
      (erc721Token: any) =>
        checksumAddress(erc721Token.contractAddress) ===
          checksumAddress(trait.sourceContractAddress) &&
        checksumAddress(erc721Token.ownerAddress) ===
          checksumAddress(token.tbaAddress) &&
        validTokenIds.includes(erc721Token.tokenId)
    );
  }

  return {
    trait_type: trait.name,
    value: erc721Tokens.some(
      (erc721Token: any) =>
        checksumAddress(erc721Token.ownerAddress) ===
        checksumAddress(token.tbaAddress)
    )
      ? "True"
      : "False",
  };
};
