import type { NextApiRequest, NextApiResponse } from "next";
import { NftMetadata, generateMetadataForErc721 } from "@/lib/erc721/metadata";
import { computeTbaAddress } from "@/lib/erc6551";
import config from "../../../../groupos.config";
import { getErc721Tokens } from "@/lib/api/hooks";
import { getErc20OwnersForTraits } from "@/lib/api/getErc20OwnersForTraits";
import { getErc721TokensForTraits } from "@/lib/api/getErc721TokensForTraits";
import { getErc1155OwnersForTraits } from "@/lib/api/getErc1155OwnersForTraits";
import { TokenStandard, TokenConfig } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftMetadata | { error: string }>
) {
  const { chainId, contractAddress, tokenId } = req.query as {
    chainId: string;
    contractAddress: string;
    tokenId: string;
  };

  const tokenContract = config.tokenContracts.find((contract) => {
    return (
      contract.chainId === parseInt(chainId) &&
      contract.contractAddress.toLowerCase() === contractAddress.toLowerCase()
    );
  });

  if (!tokenContract) {
    res.status(404).json({ error: "Collection not found" });
    return;
  }

  let metadata: NftMetadata;
  if (tokenContract.tokenStandard === ("ERC721" as TokenStandard)) {
    let erc721Tokens = await getErc721Tokens(
      parseInt(chainId),
      contractAddress as `0x${string}`
    );

    if (erc721Tokens.length === 0) {
      res.status(404).json({ error: "No tokens found" });
      return;
    }

    const erc721Token = erc721Tokens.find(
      (erc721Token) => erc721Token.tokenId === tokenId
    );

    if (!!erc721Token) {
      const tbaAddress =
        erc721Token?.tbaAddress ??
        computeTbaAddress({
          tokenChainId: erc721Token.chainId,
          tokenContractAddress: erc721Token.contractAddress as `0x${string}`,
          tokenId: erc721Token.tokenId,
        });

      const [
        erc20OwnersForTraits,
        erc721TokensForTraits,
        erc1155OwnersForTraits,
      ] = await Promise.all([
        getErc20OwnersForTraits(
          parseInt(chainId),
          tokenContract.tokenTraits.map((trait) => trait.sourceContractAddress),
          tbaAddress
        ),
        getErc721TokensForTraits(
          parseInt(chainId),
          tokenContract.tokenTraits.map((trait) => trait.sourceContractAddress),
          tbaAddress
        ),
        // include token?
        getErc1155OwnersForTraits(
          parseInt(chainId),
          tokenContract.tokenTraits.map((trait) => trait.sourceContractAddress),
          tbaAddress
        ),
      ]);

      metadata = generateMetadataForErc721({
        tokenContract: tokenContract as TokenConfig,
        erc721Token: erc721Token,
        erc20Traits: erc20OwnersForTraits,
        erc721Traits: erc721TokensForTraits,
        erc1155Traits: erc1155OwnersForTraits,
        includeTokenTraits: true,
      });
    } else {
      res.status(500).json({ error: "Could not find this token." });
      return;
    }
  }
  // else if (tokenContract.tokenStandard === ("ERC1155" as TokenStandard)) {
  //   const erc1155Token = await prisma.erc1155Token.findUnique({
  //     where: {
  //       chainId_tokenContractAddress_tokenId: {
  //         chainId: parseInt(chainId),
  //         tokenContractAddress: contractAddress.toLowerCase(),
  //         tokenId: tokenId,
  //       },
  //     },
  //   });

  //   metadata = generateMetadataForErc1155Token({
  //     tokenContract:
  //       tokenContract as TokenContractWithMetadata<Erc1155TokenContractMetadata>,
  //     erc1155Token: erc1155Token as ERC1155TokenWithMetadata,
  //   });
  // }
  else {
    res.status(500).json({ error: "Collection is not an NFT" });
    return;
  }

  res.status(200).json(metadata);
  return;
}
