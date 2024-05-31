import { gql, request } from "graphql-request";
import { Address, checksumAddress } from "viem";
import { Erc20Owner } from "../types";
import { getPonderUrl } from "../utils";

const URL = getPonderUrl();

const query = gql`
  query getErc20OwnersForTraits(
    $chainId: Int!
    $contractAddresses: [String]!
    $ownerAddresses: [String]!
  ) {
    erc20Owners(
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
        balance
      }
    }
  }
`;

export const getErc20OwnersForTraits = async (
  chainId: number,
  contractAddresses: Address[],
  ownerAddresses: Address[]
) => {
  if (contractAddresses.length === 0 || ownerAddresses.length === 0) {
    return [];
  }
  const contractAddressesChecksumed = contractAddresses.map((v) =>
    checksumAddress(v)
  );
  const ownerAddressesChecksumed = ownerAddresses.map((v) =>
    checksumAddress(v)
  );

  const variables = {
    chainId,
    contractAddresses: contractAddressesChecksumed,
    ownerAddresses: ownerAddressesChecksumed,
  };
  const data = (await request(URL, query, variables)) as {
    erc20Owners: { items: any[] };
  };
  return (data?.erc20Owners?.items ?? []) as Erc20Owner[];
};
