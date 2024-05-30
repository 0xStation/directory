import { InitializeAccountControllerAbi } from "@/lib/abi/InitializeAccountController";
import { computeTbaAddress } from "@/lib/erc6551";
import {
  getTransactionUrl,
  requireFields,
  requireMethods,
  requireSelfApiKey,
} from "@/lib/utils";
import { getApiWalletClient, getClient } from "@/lib/viem/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Address } from "viem";
import grouposConfig from "../../../../groupos.config";
import { PublicInitializeAccountControllerAbi } from "@/lib/abi/PublicInitializeAccountController";
import { readContract } from "viem/actions";
import { PermissionsAbi } from "@/lib/abi/Permissions";
import { Operation } from "@/lib/constants";

async function createAccount(req: NextApiRequest, res: NextApiResponse) {
  console.log("new request /erc6551/create", req.body);

  requireSelfApiKey(req);

  const { nft } = req.body as {
    nft: {
      chainId: number;
      contractAddress: Address;
      tokenId: string;
    };
  };
  requireFields({
    nft,
    "nft.chainId": nft?.chainId,
    "nft.contractAddress": nft?.contractAddress,
    "nft.tokenId": nft?.tokenId,
  });

  const accountAddress = computeTbaAddress({
    tokenChainId: nft.chainId,
    tokenContractAddress: nft.contractAddress,
    tokenId: BigInt(nft.tokenId),
  });

  try {
    const accountCode = await getClient(nft.chainId).getBytecode({
      address: accountAddress,
    });

    if (accountCode && accountCode !== "0x") {
      console.log("accountCode", accountCode);
      return res.status(200).json({
        success: false,
        accountAddress,
        message: "Account already deployed",
      });
    }
  } catch (e) {
    console.error(
      "couldn't check whether TBA already exists, trying to deploy anyway",
      e
    );
  }

  const walletClient = await getApiWalletClient(nft.chainId);
  if (!walletClient) {
    throw Error(
      "Could not construct API WalletClient. Must set API_PRIVATE_KEY in environment."
    );
  }
  console.log("connected walletClient");

  const apiCanCreate = await readContract(getClient(nft.chainId), {
    address: nft.contractAddress,
    abi: PermissionsAbi,
    functionName: "hasPermission",
    args: [
      Operation.TBA_IMPLEMENTATION,
      grouposConfig.tokenboundAccounts.proxyImplementation,
    ],
  });
  if (!apiCanCreate) {
    throw Error(
      `Token missing TBA_IMPLEMENTATION permission for account contract: ${grouposConfig.tokenboundAccounts.proxyImplementation}`
    );
  }

  try {
    const transactionHash = await walletClient.writeContract({
      abi: PublicInitializeAccountControllerAbi,
      address: "0x1Ae8249561456D780c4e2F5376984bee72f5Da0b",
      functionName: "createAndInitializeAccount",
      args: [
        grouposConfig.tokenboundAccounts.registry,
        grouposConfig.tokenboundAccounts.implementation,
        grouposConfig.tokenboundAccounts.salt,
        BigInt(nft.chainId),
        nft.contractAddress,
        BigInt(nft.tokenId),
        grouposConfig.tokenboundAccounts.proxyImplementation,
      ],
    });
    console.log("new transaction", transactionHash);

    return res.status(200).json({
      success: true,
      accountAddress,
      transactionHash,
      transactionUrl: getTransactionUrl(nft.chainId, transactionHash),
    });
  } catch (e: any) {
    console.error(e.message);
    throw Error("Error encountered in creating. Please contact support.");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    requireMethods(["POST"], req.method);
  } catch (e: any) {
    return res.status(405).json({ error: e.message });
  }

  try {
    await createAccount(req, res);
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ success: false, error: e.message });
  }
}
