import { gql, request } from "graphql-request";
import { checksumAddress } from "viem";
import { Erc721Token } from "../types";
import { getPonderUrl } from "../utils";

const URL = getPonderUrl();

const query = gql`
  query getErc721TokensForTraits(
    $chainId: Int!
    $contractAddresses: [String]!
    $ownerAddress: String!
  ) {
    erc721Tokens(
      where: {
        chainId: $chainId
        contractAddress_in: $contractAddresses
        ownerAddress: $ownerAddress
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
    erc721Tokens: { items: any[] };
  };
  return (data?.erc721Tokens?.items ?? []) as Erc721Token[];
};
