import { gql, request } from "graphql-request";
import { checksumAddress } from "viem";
import { Erc1155Owner } from "../types";

const URL = process.env.NEXT_PUBLIC_PONDER_PUBLIC_URL!;

const query = gql`
  query getErc1155OwnersForTraits(
    $chainId: Int!
    $contractAddresses: [String]!
    $ownerAddress: String!
  ) {
    erc1155Owners(
      where: {
        chainId: $chainId
        contractAddress_in: $contractAddresses
        ownerAddress: $ownerAddress
      }
    ) {
      id
      ownerAddress
      balance
    }
  }
`;

export const getErc1155OwnersForTraits = async (
  chainId: number,
  contractAddresses: `0x${string}`[],
  ownerAddress: `0x${string}`
) => {
  if (contractAddresses.length === 0) {
    return [];
  }
  const contractAddressesChecksumed = contractAddresses.map((v) =>
    checksumAddress(v)
  );
  const ownerAddressChecksumed = checksumAddress(ownerAddress);

  const variables = {
    chainId,
    contractAddresses: contractAddressesChecksumed,
    ownerAddress: ownerAddressChecksumed,
  };

  const data = (await request(URL, query, variables)) as {
    getErc1155OwnersForTraits: any[];
  };
  return (data?.getErc1155OwnersForTraits ?? []) as Erc1155Owner[];
};
