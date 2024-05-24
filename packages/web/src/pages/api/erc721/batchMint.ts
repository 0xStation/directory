import type { NextApiRequest, NextApiResponse } from "next";
import { getTransactionUrl, requireFields, requireMethods } from "@/lib/utils";
import { Address, encodeFunctionData, isAddressEqual } from "viem";
import grouposConfig from "../../../../groupos.config";
import { readContract } from "viem/actions";
import { getApiWalletClient, getClient } from "@/lib/viem/client";
import { PermissionsAbi } from "@/lib/abi/Permissions";
import { Operation } from "@/lib/constants";
import { ERC721RailsAbi } from "@/lib/abi/ERC721Rails";
import { MulticallAbi } from "@/lib/abi/Multicall";

async function batchMintTokens(req: NextApiRequest, res: NextApiResponse) {
  console.log("new request /erc721/batchMint", req.body);
  const { chainId, contractAddress, mints } = req.body as {
    chainId: number;
    contractAddress: Address;
    mints: {
      recipientAddress: Address;
      amount: string | number;
    }[];
  };
  console.log("request body", req.body);
  requireFields({
    chainId,
    contractAddress,
    mints,
  });
  mints.forEach(({ recipientAddress, amount }, i) => {
    requireFields({
      [`mints.${i}.recipientAddress`]: recipientAddress,
      [`mints.${i}.amount`]: amount,
    });
  });

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
    const multicallData = mints.map((mint) =>
      encodeFunctionData({
        abi: ERC721RailsAbi,
        functionName: "mintTo",
        args: [mint.recipientAddress, BigInt(mint.amount)],
      })
    );
    const transactionHash = await walletClient.writeContract({
      abi: MulticallAbi,
      address: contractAddress,
      functionName: "multicall",
      args: [multicallData],
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
    await batchMintTokens(req, res);
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ success: false, error: e.message });
  }
}
