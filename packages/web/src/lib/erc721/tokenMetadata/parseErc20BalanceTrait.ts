import { ComputedTrait } from "@/lib/types";
import { checksumAddress, formatUnits } from "viem";

export const parseErc20BalanceTrait = (
  trait: ComputedTrait,
  token: any,
  erc20OwnersForTraits: any
): { trait_type: string; value: string } => {
  const erc20Owner = erc20OwnersForTraits.find(
    (erc20Owner: any) =>
      checksumAddress(erc20Owner.contractAddress) ===
        checksumAddress(trait.sourceContractAddress) &&
      checksumAddress(erc20Owner.ownerAddress) ===
        checksumAddress(token.tbaAddress)
  );

  return {
    trait_type: trait.name,
    // TODO: dynamically fetch decimals of erc20 contract instead of hardcoded 18
    value: erc20Owner ? formatUnits(erc20Owner.balance, 18) : "0",
  };
};
