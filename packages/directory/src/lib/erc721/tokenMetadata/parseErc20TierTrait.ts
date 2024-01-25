import { TokenTrait } from "@/lib/types";

// todo: need to account for decimals
export const parseErc20TierTrait = (
  trait: TokenTrait,
  token: any,
  erc20OwnersForTraits: any
): { trait_type: string; value: string } | null => {
  const erc20Owner = erc20OwnersForTraits.find(
    (erc20Owner: any) =>
      erc20Owner.tokenContractAddress === trait.sourceContractAddress &&
      erc20Owner.ownerAddress === token.primaryTbaAddress
  );

  const balance = erc20Owner ? erc20Owner.balance.toString() : 0;
  console.log("balance", balance);

  // @ts-ignore
  const tiers = trait.data.tiers as {
    tierName: string;
    tierMinimum: number;
  }[];

  const tier = tiers
    .sort((a, b) => b.tierMinimum - a.tierMinimum)
    .find((tier) => tier.tierMinimum <= balance);

  if (!tier) {
    return null;
  }

  return {
    trait_type: trait.name,
    value: tier.tierName,
  };
};
