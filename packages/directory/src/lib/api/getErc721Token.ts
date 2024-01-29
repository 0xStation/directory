import request, { gql } from "graphql-request";
import { getPonderUrl } from "../utils";
import { checksumAddress } from "viem";
import { Erc721Token } from "../types";

const URL = getPonderUrl();

const query = gql`
  query getErc721Token(
    $chainId: Int!
    $contractAddress: String!
    $tokenId: BigInt!
  ) {
    erc721Tokens(
      where: {
        chainId: $chainId
        contractAddress: $contractAddress
        tokenId: $tokenId
      }
    ) {
      id
      chainId
      contractAddress
      ownerAddress
      mintedAt
      tbaAddress
    }
  }
`;

export const getErc721Token = async (
  chainId: number,
  contractAddress: `0x${string}`,
  tokenId: string
) => {
  const variables = {
    chainId,
    contractAddress: checksumAddress(contractAddress),
    tokenId: tokenId,
  };

  const data = (await request(URL, query, variables)) as {
    erc721Tokens: any[];
  };
  return data?.erc721Tokens?.[0] as Erc721Token;
};
