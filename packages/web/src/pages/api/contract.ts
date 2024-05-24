import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../groupos.config";
import { ContractMetadata } from "@/lib/types";
import { Address, erc20Abi, isAddressEqual } from "viem";
import { requireFields, requireMethods } from "@/lib/utils";
import { readContract } from "viem/actions";
import { getClient } from "@/lib/viem/client";
import { getImageFromPath } from "@/lib/erc721/metadata";

export async function getContractMetadata(
  req: NextApiRequest,
  res: NextApiResponse<ContractMetadata | { error: string }>
) {
  const { chainId, contractAddress } = req.query as {
    chainId: string;
    contractAddress: Address;
  };
  requireFields({ chainId, contractAddress });
  const parsedChainId = parseInt(chainId);

  const tokenContract = config.tokenContracts.find(
    (contract) =>
      contract.chainId === parsedChainId &&
      isAddressEqual(contract.contractAddress, contractAddress)
  );

  if (!tokenContract) {
    return res.status(404).json({ error: "Token contract not found" });
  }

  const tokenContractName = await readContract(getClient(parsedChainId), {
    abi: erc20Abi,
    address: contractAddress,
    functionName: "name",
  });

  const metadata = {
    name: tokenContractName,
    description: tokenContract.description,
    image: getImageFromPath(tokenContract.image),
    // banner_image: "",
    // featured_image: "",
    // external_link: "",
    // collaborators: ["0x0000000000000000000000000000000000000000"],
  };

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
    await getContractMetadata(req, res);
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ success: false, error: e.message });
  }
}
