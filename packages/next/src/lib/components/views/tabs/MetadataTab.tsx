import { Modules, emptyImage } from "@/lib/constants";
import { useTokenContractName, useTokenContractSymbol } from "@/lib/hooks";
import { TokenConfig } from "@/lib/types";
import Image from "next/image";
import { ContractLink } from "../../ContractLink";
import { GasCoinPurchaseController } from "./Controllers";
import { useReadContract, useWriteContract } from "wagmi";
import { MetadataRouterAbi } from "@/lib/abi/MetadataRouter";
import { Address } from "viem";
import { cn, toSentenceCase } from "@/lib/utils";
import { Copy } from "@/lib/components/icons/Copy";
import TokenAbi from "@/lib/abi/Token";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import { Button } from "../../ui/Button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransactionWrapper } from "@/lib/hooks/useTransactionWrapper";
import { TokenMetadataAbi } from "@/lib/abi/TokenMetadata";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/Form";
import { Input } from "../../ui/Input";
import { TransactionLink } from "../../TransactionLink";

export function MetadataTab({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  const { data: name, isLoading: nameLoading } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    functionName: "name",
    abi: TokenAbi,
  });
  const { data: symbol, isLoading: symbolLoading } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    functionName: "symbol",
    abi: TokenAbi,
  });
  const { data: tokenUri, isLoading: tokenUriLoading } = useReadContract({
    address: Modules.METADATA_ROUTER,
    abi: MetadataRouterAbi,
    functionName: "tokenURI",
    args: [tokenContract?.contractAddress as Address, BigInt(0)],
  });
  const { data: contractUri, isLoading: contractUriLoading } = useReadContract({
    address: Modules.METADATA_ROUTER,
    abi: MetadataRouterAbi,
    functionName: "uriOf",
    args: ["contract", tokenContract?.contractAddress as Address, ""],
  });

  return (
    <div className="pt-8 pb-6 px-6 space-y-6 max-w-[600px]">
      <div className="text-2xl">Metadata</div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg">Name</div>
            <EditName tokenContract={tokenContract} />
          </div>
          {nameLoading ? (
            <div className="w-full h-4 bg-highlightFaint animate-pulse rounded-md" />
          ) : (
            <div className="flex space-x-2 items-center">
              <Copy
                value={name}
                className="h-4 w-4 text-secondary hover:text-primary"
              />
              <div className="text-nowrap">{name}</div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg">Symbol</div>
            <EditSymbol tokenContract={tokenContract} />
          </div>
          {symbolLoading ? (
            <div className="w-full h-4 bg-highlightFaint animate-pulse rounded-md" />
          ) : (
            <div className="flex space-x-2 items-center">
              <Copy
                value={symbol}
                className="h-4 w-4 text-secondary hover:text-primary"
              />
              <div className="text-nowrap">{symbol}</div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="text-lg">Token URI</div>
          {tokenUriLoading ? (
            <div className="w-full h-4 bg-highlightFaint animate-pulse rounded-md" />
          ) : (
            <div className="flex space-x-2 items-center">
              <Copy
                value={tokenUri}
                className="min-h-4 min-w-4 text-secondary hover:text-primary"
              />
              <div className="text-nowrap">
                {tokenUri?.substring(0, tokenUri.length - 1)}
                <span className="text-secondary">{"{tokenUri}"}</span>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="text-lg">Contract URI</div>
          {contractUriLoading ? (
            <div className="w-full h-4 bg-highlightFaint animate-pulse rounded-md" />
          ) : (
            <div className="flex space-x-2 items-center">
              <Copy
                value={contractUri}
                className="min-h-4 min-w-4 text-secondary hover:text-primary"
              />
              <div className="text-nowrap">{contractUri}</div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="text-lg">Contract Image</div>
          <Image
            src={tokenContract?.image ?? emptyImage}
            width={256}
            height={256}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
}

function EditName({ tokenContract }: { tokenContract?: TokenConfig }) {
  const { data: name } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    functionName: "name",
    abi: TokenAbi,
  });

  const formSchema = z.object({
    name: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });
  const { writeContractAsync } = useWriteContract();
  const { ctaOverride, hash, pending, initiate } = useTransactionWrapper({
    chainId: tokenContract?.chainId,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    initiate(async () => {
      return await writeContractAsync({
        chainId: tokenContract?.chainId,
        address: tokenContract?.contractAddress!,
        abi: TokenMetadataAbi,
        functionName: "setName",
        args: [data.name],
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="unemphasized">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Name</DialogTitle>
          <DialogDescription>
            Requires a transaction to update.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        defaultValue={name}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row space-x-4 items-center">
              <Button
                type="submit"
                variant="unemphasized"
                disabled={!form.formState.isValid}
                loading={pending}
              >
                {ctaOverride ?? "Save"}
              </Button>
              <TransactionLink chainId={tokenContract?.chainId} hash={hash} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function EditSymbol({ tokenContract }: { tokenContract?: TokenConfig }) {
  const { data: symbol } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress,
    functionName: "symbol",
    abi: TokenAbi,
  });

  const formSchema = z.object({
    symbol: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: symbol,
    },
  });
  const { writeContractAsync } = useWriteContract();
  const { ctaOverride, hash, pending, initiate } = useTransactionWrapper({
    chainId: tokenContract?.chainId,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    initiate(async () => {
      return await writeContractAsync({
        chainId: tokenContract?.chainId,
        address: tokenContract?.contractAddress!,
        abi: TokenMetadataAbi,
        functionName: "setSymbol",
        args: [data.symbol],
      });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="unemphasized">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Symbol</DialogTitle>
          <DialogDescription>
            Requires a transaction to update.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        defaultValue={symbol}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row space-x-4 items-center">
              <Button
                type="submit"
                variant="unemphasized"
                disabled={!form.formState.isValid}
                loading={pending}
              >
                {ctaOverride ?? "Save"}
              </Button>
              <TransactionLink chainId={tokenContract?.chainId} hash={hash} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
