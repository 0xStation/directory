import { TokenTrait } from "@/lib/types";

export const parseErc721OwnershipTrait = (
  trait: TokenTrait,
  token: any,
  erc721TokensForTraits: any
): { trait_type: string; value: string } => {
  let erc721Tokens: any[] = [];
  // @ts-ignore
  if (trait.data.tokenIdSpecifier === "ANY") {
    erc721Tokens = erc721TokensForTraits.filter(
      (erc721Token: any) =>
        erc721Token.tokenContractAddress === trait.sourceContractAddress &&
        erc721Token.ownerAddress === token.primaryTbaAddress
    );
  } else {
    // @ts-ignore
    const validTokenIds = trait.data?.tokenId?.split(",");
    erc721Tokens = erc721TokensForTraits.filter(
      (erc721Token: any) =>
        erc721Token.tokenContractAddress === trait.sourceContractAddress &&
        erc721Token.ownerAddress === token.primaryTbaAddress &&
        validTokenIds.includes(erc721Token.tokenId)
    );
  }

  return {
    trait_type: trait.name,
    value: erc721Tokens.some(
      (erc721Token: any) => erc721Token.ownerAddress === token.primaryTbaAddress
    )
      ? "True"
      : "False",
  };
};
