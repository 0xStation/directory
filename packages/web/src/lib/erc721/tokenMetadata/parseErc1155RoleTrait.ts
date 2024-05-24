import { ComputedTrait, TokenConfig } from "@/lib/types";
import { checksumAddress } from "viem";

export const parseErc1155RoleTrait = (
  trait: ComputedTrait,
  token: any,
  erc1155OwnersForTraits: any,
  tokenContract: TokenConfig
): { trait_type: string; value: string } => {
  const erc1155Owners = erc1155OwnersForTraits.filter(
    (erc1155Owner: any) =>
      checksumAddress(erc1155Owner.contractAddress) ===
        checksumAddress(trait.sourceContractAddress) &&
      checksumAddress(erc1155Owner.ownerAddress) ===
        checksumAddress(token.tbaAddress)
  );

  // maybe want to read the metadata on-chain to get the name -- especially if we aren't indexing data ourselves
  // if we have external token trait contract, we won't have the metadata in our db

  return erc1155Owners.map((erc1155Owner: any) => {
    return {
      trait_type: trait.name,
      value:
        erc1155Owner.token.data.name ||
        `${tokenContract.slug} #${erc1155Owner.tokenId}`,
    };
  });
};
