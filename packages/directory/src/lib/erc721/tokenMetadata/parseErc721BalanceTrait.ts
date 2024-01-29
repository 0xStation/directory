import { TokenTrait } from "@/lib/types";
import { checksumAddress } from "viem";

export const parseErc721BalanceTrait = (
  trait: TokenTrait,
  token: any,
  erc721TokensForTraits: any
): { trait_type: string; value: string } => {
  const sum = erc721TokensForTraits.reduce(
    (acc: number, erc721Token: any) =>
      checksumAddress(erc721Token.ownerAddress) ===
      checksumAddress(token.tbaAddress)
        ? acc + 1
        : acc,
    0
  );
  return {
    trait_type: trait.name,
    value: sum,
  };
};
