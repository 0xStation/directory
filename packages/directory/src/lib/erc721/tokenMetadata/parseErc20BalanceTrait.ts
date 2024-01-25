import { TokenTrait } from "@/lib/types";
import { formatUnits } from "viem";

export const parseErc20BalanceTrait = (
  trait: TokenTrait,
  token: any,
  erc20OwnersForTraits: any
): { trait_type: string; value: string } => {
  const erc20Owner = erc20OwnersForTraits.find(
    (erc20Owner: any) =>
      erc20Owner.tokenContractAddress === trait.sourceContractAddress &&
      erc20Owner.ownerAddress === token.primaryTbaAddress
  );

  return {
    trait_type: trait.name,
    // TODO: dynamically fetch decimals of erc20 contract instead of hardcoded 18
    value: erc20Owner ? formatUnits(erc20Owner.balance, 18) : "0",
  };
};
