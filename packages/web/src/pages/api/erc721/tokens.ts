import { getPonderUrl, requireFields, requireMethods } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import grouposConfig from "../../../../groupos.config";
import { Address, isAddressEqual, zeroAddress } from "viem";
import { getErc721Tokens } from "@/lib/api/hooks";

async function getTokens(req: NextApiRequest, res: NextApiResponse) {
  console.log("new request /erc721/tokens", req.query);
  const { chainId, contractAddress } = req.query as {
    chainId: string;
    contractAddress: Address;
  };

  requireFields({ chainId, contractAddress });
  const parsedChainId = parseInt(chainId);

  const tokenContract = grouposConfig.tokenContracts.find(
    (v) =>
      v.chainId === parsedChainId &&
      isAddressEqual(v.contractAddress, contractAddress) &&
      v.tokenStandard === "ERC721"
  );

  if (!tokenContract) {
    return res.status(404).json({ message: "Token contract does not exist." });
  }

  const erc721Tokens = await getErc721Tokens(
    parsedChainId,
    contractAddress,
    getPonderUrl()
  );

  try {
    res.status(200).json({
      success: true,
      tokens: erc721Tokens
        // remove non-owned memberships
        .filter(
          (token) => !!token.ownerAddress && token.ownerAddress !== zeroAddress
        )
        // return token metadata
        .map((token) => {
          return {
            tokenId: token.tokenId.toString(),
            ownerAddress: token.ownerAddress?.toLowerCase(),
            tbaAddress: token.tbaAddress?.toLowerCase(),
          };
        }),
    });
  } catch (e: any) {
    throw Error(
      "Error encountered in querying tokens. Please contact support."
    );
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    requireMethods(["GET"], req.method);
  } catch (e: any) {
    res.status(405).json({ error: e.message });
    res.end();
    return;
  }

  try {
    await getTokens(req, res);
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error(e.message);
    return res.status(500).json({ success: false, error: e.message });
  }
}
