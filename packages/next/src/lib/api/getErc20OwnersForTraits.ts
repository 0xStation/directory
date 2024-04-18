import { gql, request } from "graphql-request";
import { checksumAddress } from "viem";
import { Erc20Owner } from "../types";
import { getPonderUrl } from "../utils";

const URL = getPonderUrl();

const query = gql`
  query getErc20OwnersForTraits(
    $chainId: Int!
    $contractAddresses: [String]!
    $ownerAddress: String!
  ) {
    erc20Owners(
      where: {
        chainId: $chainId
        contractAddress_in: $contractAddresses
        ownerAddress: $ownerAddress
      }
    ) {
      id
      chainId
      contractAddress
      ownerAddress
      balance
    }
  }
`;

export const getErc20OwnersForTraits = async (
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
    erc20Owners: any[];
  };
  return (data?.erc20Owners ?? []) as Erc20Owner[];
};
