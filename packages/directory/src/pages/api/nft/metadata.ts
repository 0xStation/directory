// import type { NextApiRequest, NextApiResponse } from "next";
// import {
//   NftMetadata,
//   generateMetadataForErc721Token,
// } from "@/models/erc721/metadata";
// import { generateMetadataForErc1155Token } from "@/models/erc1155/metadata";
// import { ERC1155TokenWithMetadata } from "@/models/erc1155/types";
// import { Erc721TokenWithMetadata } from "@/models/erc721/types";
// import {
//   Erc1155TokenContractMetadata,
//   Erc721TokenContractMetadata,
//   TokenContractWithMetadata,
// } from "@/models/tokenContract/types";
// import { computeTbaAddress } from "@/lib/eip6551/tokenboundClient";
// import config from "../../../../groupos.config";
// import { getErc721Tokens, getErc20Owners } from "@/lib/api/hooks";
// import { TokenStandard } from "@/lib/types";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<NftMetadata | { error: string }>
// ) {
//   const { chainId, contractAddress, tokenId } = req.query as {
//     chainId: string;
//     contractAddress: string;
//     tokenId: string;
//   };

//   const tokenContract = config.tokenContracts.find((contract) => {
//     return (
//       contract.chainId === parseInt(chainId) &&
//       contract.contractAddress.toLowerCase() === contractAddress.toLowerCase()
//     );
//   });

//   if (!tokenContract) {
//     res.status(404).json({ error: "Collection not found" });
//     return;
//   }

//   let metadata: NftMetadata;

//   if (tokenContract.tokenStandard === ("ERC721" as TokenStandard)) {
//     let erc721Tokens = await getErc721Tokens(
//       parseInt(chainId),
//       contractAddress as `0x${string}`
//     );

//     if (erc721Tokens.length === 0) {
//       res.status(404).json({ error: "Token not found" });
//       return;
//     }

//     const erc721Token = erc721Tokens.find(
//       (erc721Token) => erc721Token.tokenId === tokenId
//     );

//     if (!!erc721Token) {
//       const tbaAddress =
//         erc721Token?.tbaAddress ??
//         computeTbaAddress({
//           tokenChainId: erc721Token.chainId,
//           tokenContractAddress: erc721Token.contractAddress as `0x${string}`,
//           tokenId: erc721Token.tokenId,
//         });

//       const [
//         erc20OwnersForTraits,
//         erc721TokensForTraits,
//         erc1155OwnersForTraits,
//       ] = await Promise.all([
//         getErc20Owners(erc721Token.chainId, tbaAddress),
//         prisma.erc20Owner.findMany({
//           where: {
//             tokenContractAddress: {
//               in: tokenContract.tokenTraits.map(
//                 (trait) => trait.sourceContractAddress
//               ),
//             },
//             ownerAddress: tbaAddress.toLowerCase(),
//           },
//         }),
//         prisma.erc721Token.findMany({
//           where: {
//             tokenContractAddress: {
//               in: tokenContract.tokenTraits.map(
//                 (trait) => trait.sourceContractAddress
//               ),
//             },
//             ownerAddress: tbaAddress.toLowerCase(),
//           },
//         }),
//         prisma.erc1155Owner.findMany({
//           where: {
//             tokenContractAddress: {
//               in: tokenContract.tokenTraits.map(
//                 (trait) => trait.sourceContractAddress
//               ),
//             },
//             ownerAddress: tbaAddress.toLowerCase(),
//           },
//           include: {
//             token: true,
//           },
//         }),
//       ]);

//       metadata = generateMetadataForErc721Token({
//         tokenContract:
//           tokenContract as TokenContractWithMetadata<Erc721TokenContractMetadata>,
//         erc721Token: erc721Token as Erc721TokenWithMetadata,
//         erc20Traits: erc20OwnersForTraits,
//         erc721Traits: erc721TokensForTraits,
//         erc1155Traits: erc1155OwnersForTraits,
//         includeTokenTraits: true,
//       });
//     } else {
//       metadata = generateMetadataForErc721Token({
//         tokenContract:
//           tokenContract as TokenContractWithMetadata<Erc721TokenContractMetadata>,
//         erc721Token,
//         overrideImage:
//           contractAddress.toLowerCase() ===
//           "0x9c46fe757ea200dfba1a77d1300f77289d8314cd"
//             ? `https://svg.cryptodatabytes.com/token_svg/${tokenId}`
//             : null,
//       });
//     }
//   } else if (tokenContract.tokenStandard === ("ERC1155" as TokenStandard)) {
//     const erc1155Token = await prisma.erc1155Token.findUnique({
//       where: {
//         chainId_tokenContractAddress_tokenId: {
//           chainId: parseInt(chainId),
//           tokenContractAddress: contractAddress.toLowerCase(),
//           tokenId: tokenId,
//         },
//       },
//     });

//     metadata = generateMetadataForErc1155Token({
//       tokenContract:
//         tokenContract as TokenContractWithMetadata<Erc1155TokenContractMetadata>,
//       erc1155Token: erc1155Token as ERC1155TokenWithMetadata,
//     });
//   } else {
//     res.status(500).json({ error: "Collection is not an NFT" });
//     return;
//   }

//   res.status(200).json(metadata);
//   return;
// }
