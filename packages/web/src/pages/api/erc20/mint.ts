import type { NextApiRequest, NextApiResponse } from "next";
import {
  getTransactionUrl,
  requireSelfApiKey,
  requireFields,
  requireMethods,
} from "@/lib/utils";
import { Hex, erc20Abi, isAddressEqual, parseUnits } from "viem";
import grouposConfig from "../../../../groupos.config";
import { readContract } from "viem/actions";
import { getApiWalletClient, getClient } from "@/lib/viem/client";
import { ERC20RailsAbi } from "@/lib/abi/ERC20Rails";
import { PermissionsAbi } from "@/lib/abi/Permissions";
import { Operation } from "@/lib/constants";

async function mintTokens(req: NextApiRequest, res: NextApiResponse) {
  console.log("new request /erc20/mint", req.body);

  requireSelfApiKey(req);

  const { chainId, contractAddress, recipientAddress, amount } = req.body as {
    chainId: number;
    contractAddress: Hex;
    recipientAddress: Hex;
    amount: number;
  };
  console.log("request body", req.body);
  requireFields({ chainId, contractAddress, recipientAddress, amount });

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
      v.tokenStandard === "ERC20"
  );

  if (!tokenContract) {
    return res.status(404).json({ message: "Token contract does not exist." });
  }

  const decimals = await readContract(getClient(chainId), {
    address: contractAddress,
    abi: erc20Abi,
    functionName: "decimals",
  });

  if (decimals === undefined) {
    throw Error("Token contract does not have decimals.");
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
      abi: ERC20RailsAbi,
      address: contractAddress,
      functionName: "mintTo",
      args: [recipientAddress, parseUnits(amount.toString(), decimals)],
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
