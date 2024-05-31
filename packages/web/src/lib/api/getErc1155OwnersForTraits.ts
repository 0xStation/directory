import { gql, request } from "graphql-request";
import { Address, checksumAddress } from "viem";
import { Erc1155Owner } from "../types";
import { getPonderUrl } from "../utils";

const URL = getPonderUrl();

const query = gql`
  query getErc1155OwnersForTraits(
    $chainId: Int!
    $contractAddresses: [String]!
    $ownerAddresses: [String]!
  ) {
    erc1155Owners(
      where: {
        chainId: $chainId
        contractAddress_in: $contractAddresses
        ownerAddress_in: $ownerAddresses
      }
    ) {
      items {
        id
        chainId
        contractAddress
        ownerAddress
        tokenId
        balance
      }
    }
  }
`;

export const getErc1155OwnersForTraits = async (
  chainId: number,
  contractAddresses: Address[],
  ownerAddresses: Address[]
) => {
  if (contractAddresses.length === 0 || ownerAddresses.length === 0) {
    return [];
  }
  const contractAddressesChecksummed = contractAddresses.map((v) => {
    return checksumAddress(v);
  });
  const ownerAddressesChecksummed = ownerAddresses.map((v) => {
    return checksumAddress(v);
  });

  const variables = {
    chainId,
    contractAddresses: contractAddressesChecksummed,
    ownerAddresses: ownerAddressesChecksummed,
  };
  const data = (await request(URL, query, variables)) as {
    erc1155Owners: { items: any[] };
  };
  console.log("erc1155owners", data);
  return (data?.erc1155Owners?.items ?? []) as Erc1155Owner[];
};
