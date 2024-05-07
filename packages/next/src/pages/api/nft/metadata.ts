import type { NextApiRequest, NextApiResponse } from "next";
import {
  generateComputedTraits,
  getImageFromPath,
} from "@/lib/erc721/metadata";
import { computeTbaAddress } from "@/lib/erc6551";
import config from "../../../../groupos.config";
import { getErc20OwnersForTraits } from "@/lib/api/getErc20OwnersForTraits";
import { getErc721TokensForTraits } from "@/lib/api/getErc721TokensForTraits";
import { getErc1155OwnersForTraits } from "@/lib/api/getErc1155OwnersForTraits";
import { NftMetadata } from "@/lib/types";
import { Address, erc20Abi, isAddressEqual } from "viem";
import { requireFields, requireMethods } from "@/lib/utils";
import { readContract } from "viem/actions";
import { getClient } from "@/lib/viem/client";

export async function getNftMetadata(
  req: NextApiRequest,
  res: NextApiResponse<NftMetadata | { error: string }>
) {
  const { chainId, contractAddress, tokenId } = req.query as {
    chainId: string;
    contractAddress: Address;
    tokenId: string;
  };
  requireFields({ chainId, contractAddress, tokenId });
  const parsedChainId = parseInt(chainId);

  const tokenContract = config.tokenContracts.find(
    (contract) =>
      contract.chainId === parsedChainId &&
      isAddressEqual(contract.contractAddress, contractAddress)
  );

  if (!tokenContract) {
    return res.status(404).json({ error: "Token contract not found" });
  }

  if (
    !(
      tokenContract.tokenStandard === "ERC721" ||
      tokenContract.tokenStandard === "ERC1155"
    )
  ) {
    return res.status(500).json({ error: "Token contract is not NFT" });
  }

  const tokenContractName = await readContract(getClient(parsedChainId), {
    abi: erc20Abi,
    address: contractAddress,
    functionName: "name",
  });

  const tokenMetadata = tokenContract.nftMetadata?.tokens?.[tokenId];
  let metadata: NftMetadata = {
    name: tokenMetadata?.name ?? `${tokenContractName} #${tokenId}`,
    description: tokenMetadata?.description ?? tokenContract.description,
    image: getImageFromPath(tokenMetadata?.image ?? tokenContract.image),
    attributes:
      tokenMetadata?.traits?.map(({ name, value }) => ({
        trait_type: name,
        value,
      })) ?? [],
  };

  if (
    tokenContract.tokenStandard === "ERC721" &&
    (tokenContract.nftMetadata?.computedTraits ?? []).length > 0
  ) {
    const tbaAddress = computeTbaAddress({
      tokenChainId: parsedChainId,
      tokenContractAddress: contractAddress,
      tokenId: tokenId,
    });
    const sourceContractAddresses =
      tokenContract.nftMetadata!.computedTraits!.map(
        (trait) => trait.sourceContractAddress
      ) || [];

    const [
      erc20OwnersForTraits,
      erc721TokensForTraits,
      erc1155OwnersForTraits,
    ] = await Promise.all([
      getErc20OwnersForTraits(
        parseInt(chainId),
        sourceContractAddresses,
        tbaAddress
      ),
      getErc721TokensForTraits(
        parseInt(chainId),
        sourceContractAddresses,
        tbaAddress
      ),
      getErc1155OwnersForTraits(
        parseInt(chainId),
        sourceContractAddresses,
        tbaAddress
      ),
    ]);

    const computedAttributes = generateComputedTraits({
      tokenContract,
      token: { tbaAddress },
      erc20OwnersForTraits,
      erc721TokensForTraits,
      erc1155OwnersForTraits,
    });

    if (computedAttributes.length > 0) {
      metadata.attributes = [...metadata.attributes, ...computedAttributes];
    }
  }

  res.status(200).json(metadata);
  return;
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
    await getNftMetadata(req, res);
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ success: false, error: e.message });
  }
}
