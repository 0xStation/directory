import type { NextApiRequest, NextApiResponse } from "next";
import {
  getTransactionUrl,
  requireFields,
  requireMethods,
  requireSelfApiKey,
} from "@/lib/utils";
import { Hex, isAddressEqual } from "viem";
import grouposConfig from "../../../../groupos.config";
import { readContract } from "viem/actions";
import { getApiWalletClient, getClient } from "@/lib/viem/client";
import { PermissionsAbi } from "@/lib/abi/Permissions";
import { Operation } from "@/lib/constants";
import { ERC721RailsAbi } from "@/lib/abi/ERC721Rails";

async function mintTokens(req: NextApiRequest, res: NextApiResponse) {
  console.log("new request /erc721/mint", req.body);

  requireSelfApiKey(req);

  const { chainId, contractAddress, recipientAddress } = req.body as {
    chainId: number;
    contractAddress: Hex;
    recipientAddress: Hex;
  };
  console.log("request body", req.body);
  requireFields({ chainId, contractAddress, recipientAddress });

  const walletClient = await getApiWalletClient(chainId);
  if (!walletClient) {
    throw Error(
      "Could not construct API WalletClient. Must set API_PRIVATE_KEY in environment."
    );
  }
  console.log("connected walletClient");

  const tokenContract = grouposConfig.tokenContracts.find(
    (v) =>
      v.chainId === chainId &&
      isAddressEqual(v.contractAddress, contractAddress) &&
      v.tokenStandard === "ERC721"
  );

  if (!tokenContract) {
    return res.status(404).json({ message: "Token contract does not exist." });
  }

  const apiCanMint = await readContract(getClient(chainId), {
    address: contractAddress,
    abi: PermissionsAbi,
    functionName: "hasPermission",
    args: [Operation.MINT, walletClient.account.address],
  });
  if (!apiCanMint) {
    throw Error(
      `Token missing MINT permission for API account: ${walletClient.account.address}`
    );
  }

  try {
    const transactionHash = await walletClient.writeContract({
      abi: ERC721RailsAbi,
      address: contractAddress,
      functionName: "mintTo",
      args: [recipientAddress, BigInt(1)], // hard-code mint amount to 1
    });
    console.log("new transaction", transactionHash);

    res.status(200).json({
      success: true,
      transactionHash,
      transactionUrl: getTransactionUrl(chainId, transactionHash),
    });
  } catch (e: any) {
    console.error(e.message);
    throw Error("Error encountered in minting. Please contact support.");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    requireMethods(["POST"], req.method);
  } catch (e: any) {
    res.status(405).json({ error: e.message });
    res.end();
    return;
  }

  try {
    await mintTokens(req, res);
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ success: false, error: e.message });
  }
}
