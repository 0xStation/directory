import { Abi, AbiFunction, AbiParameter, Address, getAbiItem } from "viem";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useReadContract, useWriteContract } from "wagmi";
import { TokenConfig } from "../../../types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ContractLink } from "../../ContractLink";

export function ExtensionContract({
  chainId,
  contractAddress,
  name,
  children,
}: {
  chainId: number;
  contractAddress: Address;
  name: string;
  children?: any;
}) {
  return (
    <div className="bg-highlightFaint p-4 rounded-md">
      <div className="flex flex-row items-center space-x-4">
        <div className="text-lg font-bold">{name}</div>
        <ContractLink contract={{ chainId, contractAddress }} />
      </div>
      <div className="space-y-2 mt-4">{children}</div>
    </div>
  );
}

export function WriteExtensionFunction({
  tokenContract,
  abi,
  functionName,
}: {
  tokenContract?: TokenConfig;
  abi: Abi;
  functionName: string;
}) {
  const [loading, setLoading] = useState<boolean>();
  const { writeContractAsync } = useWriteContract();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  async function onSubmit(data: any) {
    setLoading(true);
    const sortedKeys = Object.keys(data)
      .map(Number)
      .sort((a, b) => a - b);
    const args = sortedKeys.map((key) => data[key]);

    console.log(args);

    try {
      await writeContractAsync({
        chainId: tokenContract?.chainId,
        address: tokenContract?.contractAddress!,
        abi: abi,
        functionName: "updatePayoutAddress",
        args,
      });
    } catch {}
    setLoading(false);
  }

  return (
    <div className="bg-highlight p-4 rounded space-y-4">
      <div className="text-secondary">{functionName}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {(getAbiItem({ abi, name: functionName }) as AbiFunction)?.inputs?.map(
          (arg, i) => (
            <div className="space-y-2">
              <label>{(arg.name ?? "unnamed") + ` (${arg.type})`}</label>
              <Input
                {...register(`${i}`, { required: true })}
                placeholder={
                  arg.type === "address"
                    ? "0x"
                    : arg.type.includes("int")
                    ? "0"
                    : ""
                }
              />
            </div>
          )
        )}
        <Button
          className="mt-6"
          variant="unemphasized"
          size="sm"
          loading={loading}
          disabled={!isValid}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export function ReadExtensionFunction({
  tokenContract,
  abi,
  functionName,
}: {
  tokenContract?: TokenConfig;
  abi: Abi;
  functionName: string;
}) {
  const { data, refetch } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    abi,
    functionName,
    query: {
      enabled: !!tokenContract,
    },
  });

  return (
    <div className="bg-highlight p-4 rounded space-y-4">
      <div className="flex flex-row justify-between items-center text-secondary">
        <div className="text-secondary">{functionName}</div>
        <button onClick={() => refetch()}>Refresh</button>
      </div>
      <div>{data?.toString() ?? "(no data)"}</div>
    </div>
  );
}
