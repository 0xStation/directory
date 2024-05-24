import { useEffect, useState } from "react";
import {
  Address,
  Hex,
  encodeFunctionData,
  formatUnits,
  zeroAddress,
} from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { TokenConfig } from "@/lib/types";
import { GasCoinPurchaseControllerAbi } from "@/lib/abi/GasCoinPurchaseController";
import FeeManagerAbi from "@/lib/abi/FeeManager";
import { Button } from "@/lib/components/ui/Button";

export const useMintErc721GasCoin = ({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) => {
  const CONTROLLER_ADDRESS =
    "0xb336c2c5568b310ec5774cb6c577280c14c4dac2" as Address;
  const FEE_MANAGER_ADDRESS =
    "0x0af22fe98babe7b3dedc14ba3e0f33e9e63444f3" as Address;

  const { address: accountAddress } = useAccount();
  const [callData, setCallData] = useState<Hex>();
  const [callValue, setCallValue] = useState<bigint>();
  const [message, setMessage] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (tokenContract?.contractAddress && accountAddress) {
      setCallData(
        encodeFunctionData({
          abi: GasCoinPurchaseControllerAbi,
          functionName: "mintTo",
          args: [
            tokenContract?.contractAddress as `0x${string}`,
            accountAddress,
          ],
        })
      );
    }
  }, [tokenContract?.contractAddress, accountAddress]);

  // Read price
  const { data: unitPrice } = useReadContract({
    chainId: tokenContract?.chainId,
    address: CONTROLLER_ADDRESS,
    abi: GasCoinPurchaseControllerAbi,
    functionName: "priceOf",
    args: [tokenContract?.contractAddress!],
    query: {
      enabled: !!tokenContract?.contractAddress,
    },
  });

  // Read fees
  const { data: stationFeeValue, error: feeReadError } = useReadContract({
    chainId: tokenContract?.chainId,
    address: FEE_MANAGER_ADDRESS,
    abi: FeeManagerAbi,
    functionName: "getFeeTotals",
    args: [
      tokenContract?.contractAddress!,
      zeroAddress, // paymentToken
      accountAddress!, // recipient
      BigInt(1), // quanity
      unitPrice!, // unitPrice
    ],
    query: {
      enabled:
        !!accountAddress && !!tokenContract?.contractAddress && !!unitPrice,
    },
  });

  useEffect(() => {
    if (!feeReadError && stationFeeValue !== undefined && !!unitPrice) {
      setCallValue(stationFeeValue + unitPrice);
      console.log("new call value", callValue);
    }
  }, [feeReadError, stationFeeValue, unitPrice]);

  const { data: accountBalance } = useBalance({
    chainId: tokenContract?.chainId,
    address: accountAddress,
  });

  useEffect(() => {
    if (!!accountBalance && !!callValue && callValue >= accountBalance.value) {
      setMessage("Insufficient balance");
      setDisabled(true);
    } else {
      setMessage(undefined);
      setDisabled(false);
    }
  }, [accountBalance, callValue]);

  return {
    fees: [
      {
        currency: "ETH",
        value: unitPrice,
        amount: formatUnits(unitPrice ?? BigInt(0), 18),
      },
    ],
    call: {
      to: CONTROLLER_ADDRESS,
      value: callValue,
      data: callData,
    },
    message,
    disabled,
  };
};
