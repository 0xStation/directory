import { TokenTrait } from "@/lib/types";

export const parseErc1155BalanceTrait = (
  trait: TokenTrait,
  token: any,
  erc1155OwnersForTraits: any
): { trait_type: string; value: string } => {
  let erc1155Tokens: any[] = [];
  // @ts-ignore
  if (trait.data.tokenIdSpecifier === "ALL") {
    erc1155Tokens = erc1155OwnersForTraits.filter(
      (erc1155Token: any) =>
        erc1155Token.tokenContractAddress === trait.sourceContractAddress &&
        erc1155Token.ownerAddress === token.primaryTbaAddress
    );
  } else {
    // @ts-ignore
    const validTokenIds = trait.data?.tokenId?.split(",");
    erc1155Tokens = erc1155OwnersForTraits.filter(
      (erc1155Token: any) =>
        erc1155Token.tokenContractAddress === trait.sourceContractAddress &&
        erc1155Token.ownerAddress === token.primaryTbaAddress &&
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
