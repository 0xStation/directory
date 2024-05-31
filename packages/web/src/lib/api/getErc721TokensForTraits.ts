import { gql, request } from "graphql-request";
import { Address, checksumAddress } from "viem";
import { Erc721Token } from "../types";
import { getPonderUrl } from "../utils";

const URL = getPonderUrl();

const query = gql`
  query getErc721TokensForTraits(
    $chainId: Int!
    $contractAddresses: [String]!
    $ownerAddresses: [String]!
  ) {
    erc721Tokens(
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
        tokenId
        tbaAddress
      }
    }
  }
`;

export const getErc721TokensForTraits = async (
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
    erc721Tokens: { items: any[] };
  };
  return (data?.erc721Tokens?.items ?? []) as Erc721Token[];
};
