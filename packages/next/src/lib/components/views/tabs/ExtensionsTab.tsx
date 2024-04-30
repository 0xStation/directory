import { TokenConfig } from "@/lib/types";
import { useConfig, useReadContract, useWriteContract } from "wagmi";
import { AbiFunction, Address, Hex, getFunctionSelector } from "viem";
import { ExtensionsAbi } from "@/lib/abi/Extensions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/Accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../ui/TabsVertical";
import { useState } from "react";
import { ContractLink } from "../../ContractLink";
import { useEtherscanContract } from "@/lib/hooks/useEtherscanContract";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { readContract } from "wagmi/actions";
import { cn } from "@/lib/utils";
import { useTransactionWrapper } from "@/lib/hooks/useTransactionWrapper";
import { TransactionLink } from "../../TransactionLink";
import { CircleCheck, CircleDashed } from "lucide-react";

export function ExtensionsTab({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  const [selectedExtension, setSelectedExtension] = useState<Address>();

  const { data } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    abi: ExtensionsAbi,
    functionName: "getAllExtensions",
  });

  const extensions: Record<Address, Hex[]> = {};
  data?.forEach((extension) => {
    if (!extensions[extension.implementation]) {
      extensions[extension.implementation] = [extension.selector];
    } else {
      extensions[extension.implementation].push(extension.selector);
    }
  });

  return (
    <Tabs
      className="border-highlight grid grid-cols-2 h-[calc(100vh-72px)]"
      defaultValue="general"
      value={selectedExtension}
      onValueChange={(v) => setSelectedExtension(v as Address)}
    >
      <div className="col-span-1 border-r border-highlight pt-8 px-6">
        <div className="text-2xl pb-8">Extension Contracts</div>
        <TabsList className="">
          {Object.keys(extensions).map((ext) => (
            <TabsTrigger value={ext}>
              <ExtensionContract
                chainId={tokenContract?.chainId!}
                contractAddress={ext as Address}
              />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className="col-span-1 pt-8 px-6">
        <div className="text-2xl pb-8">Extension Functions</div>
        {selectedExtension === undefined && (
          <div className="text-secondary">
            Select an Extension contract to view its functions.
          </div>
        )}
        {Object.keys(extensions).map((ext) => (
          <TabsContent value={ext}>
            <Accordion type="multiple">
              <ExtensionFunctions
                tokenContract={tokenContract!}
                chainId={tokenContract?.chainId!}
                contractAddress={ext as Address}
                enabledSelectors={extensions[ext as Address]}
              />
            </Accordion>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

function ExtensionContract({
  chainId,
  contractAddress,
}: {
  chainId: number;
  contractAddress: Address;
}) {
  const { data } = useEtherscanContract({ chainId, contractAddress });

  return (
    <div className="flex flex-row items-center space-x-2 truncate">
      <div className="text-lg">{data?.name ?? "Extension"}</div>
      <ContractLink
        contract={{
          chainId,
          contractAddress,
        }}
      />
    </div>
  );
}

function ExtensionFunctions({
  tokenContract,
  chainId,
  contractAddress,
  enabledSelectors,
}: {
  tokenContract: TokenConfig;
  chainId: number;
  contractAddress: Address;
  enabledSelectors: Hex[];
}) {
  const { data } = useEtherscanContract({ chainId, contractAddress });
  const ignoreFunctions = [
    "getAllSelectors",
    "getAllSignatures",
    "signatureOf",
  ];
  const functions = (
    data?.abi?.filter(
      (abiItem) =>
        abiItem.type === "function" && !ignoreFunctions.includes(abiItem.name)
    ) as AbiFunction[]
  )
    // sort view functions first
    ?.sort((a, b) => 0.5 - Number(isViewFunction(a)));
  console.log(functions);

  return (
    <div className="space-y-4">
      {functions?.map((fn) => (
        <ExtensionFunction
          tokenContract={tokenContract}
          extensionAddress={contractAddress}
          fn={fn}
          enabled={enabledSelectors.includes(getFunctionSelector(fn))}
        />
      ))}
    </div>
  );
}

function isViewFunction(fn: AbiFunction) {
  return fn.stateMutability === "view" || fn.stateMutability === "pure";
}

export function ExtensionFunction({
  tokenContract,
  fn,
  enabled,
  extensionAddress,
}: {
  tokenContract: TokenConfig;
  extensionAddress: Address;
  fn: AbiFunction;
  enabled: boolean;
}) {
  const config = useConfig();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const { writeContractAsync } = useWriteContract();
  const { ctaOverride, hash, pending, initiate } = useTransactionWrapper({
    chainId: tokenContract?.chainId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  async function onSubmit(data: any) {
    const sortedKeys = Object.keys(data)
      .map(Number)
      .sort((a, b) => a - b);
    const args = sortedKeys.map((key) => data[key]);

    console.log(args);

    setLoading(true);
    try {
      if (isViewFunction(fn)) {
        const res = await readContract(config, {
          chainId: tokenContract?.chainId!,
          address: tokenContract?.contractAddress!,
          abi: [fn],
          functionName: fn.name,
          args,
        });
        setData(res);
      } else {
        await writeContractAsync({
          chainId: tokenContract?.chainId,
          address: tokenContract?.contractAddress!,
          abi: [fn],
          functionName: fn.name,
          args,
        });
      }
    } catch {}
    setLoading(false);
  }

  return (
    <AccordionItem value={getFunctionSelector(fn)}>
      <AccordionTrigger className="px-3 py-2 bg-highlightFaint border border-highlight rounded-t-md data-[state=closed]:rounded-b-md hover:bg-highlight">
        <div className="flex flex-row justify-between items-center w-full pr-2">
          <div className="flex flex-row space-x-2">
            <div>{fn.name}</div>
            <div className="text-secondary">{fn.stateMutability}</div>
          </div>
          {enabled ? (
            <CircleCheck className="text-secondary h-5 w-5" />
          ) : (
            <CircleDashed className="text-secondary h-5 w-5" />
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-3 border-r border-b border-l border-highlight rounded-b-md">
        {enabled ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fn.inputs?.map((arg, i) => (
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
              ))}
              <Button
                className={cn(fn.inputs.length > 0 ? "mt-6" : "")}
                variant="unemphasized"
                loading={loading}
                disabled={!isValid}
              >
                {isViewFunction(fn) ? "Query" : "Submit"}
              </Button>
            </form>
            {!!data && (
              <div className="mt-4 text-nowrap overflow-auto">
                {data.toString()}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div>To use this function, add it as an Extension.</div>
            <div className="flex flex-row space-x-4 items-center">
              <Button
                variant="unemphasized"
                loading={pending}
                onClick={() =>
                  initiate(async () => {
                    return await writeContractAsync({
                      chainId: tokenContract?.chainId,
                      address: tokenContract?.contractAddress,
                      abi: ExtensionsAbi,
                      functionName: "setExtension",
                      args: [getFunctionSelector(fn), extensionAddress],
                    });
                  })
                }
              >
                {ctaOverride ?? "Add Extension"}
              </Button>
              <TransactionLink chainId={tokenContract?.chainId} hash={hash} />
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
