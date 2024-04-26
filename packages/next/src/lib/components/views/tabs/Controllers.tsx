import { GasCoinPurchaseControllerAbi } from "@/lib/abi/GasCoinPurchaseController";
import { TokenConfig } from "@/lib/types";
import { useForm } from "react-hook-form";
import { useReadContract, useWriteContract } from "wagmi";
import { Input } from "../../ui/Input";
import { encodeAbiParameters, formatUnits, parseUnits } from "viem";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { ContractLink } from "../../ContractLink";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { useTransactionWrapper } from "@/lib/hooks/useTransactionWrapper";
import { TransactionLink } from "../../TransactionLink";

export function GasCoinPurchaseController({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  const { data: price } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.mintPage?.controller!,
    abi: GasCoinPurchaseControllerAbi,
    functionName: "prices",
    args: [tokenContract?.contractAddress!],
  });

  const { data: requirePermits } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.mintPage?.controller!,
    abi: GasCoinPurchaseControllerAbi,
    functionName: "requirePermits",
    args: [
      encodeAbiParameters(
        [{ name: "collection", type: "address" }],
        [tokenContract?.contractAddress!]
      ),
    ],
  });

  return (
    <Dialog>
      <div className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <div>ETH Mint</div>
            <ContractLink
              contract={{
                chainId: tokenContract?.chainId!,
                contractAddress: tokenContract?.mintPage?.controller!,
              }}
            />
          </div>
          <DialogTrigger asChild>
            <Button variant="unemphasized">Edit</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-2">
          <div className="font-bold">Price</div>
          <div>{formatUnits(price ?? BigInt(0), 18)} ETH</div>
        </div>
        <div className="space-y-2">
          <div className="font-bold">Mint auth</div>
          <div>{requirePermits ? "Offchain signature" : "Public"}</div>
        </div>
      </div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit parameters</DialogTitle>
          <DialogDescription>
            Requires a transaction to update.
          </DialogDescription>
        </DialogHeader>
        <SetUpForm tokenContract={tokenContract} />
      </DialogContent>
    </Dialog>
  );
}

export function SetUpForm({ tokenContract }: { tokenContract?: TokenConfig }) {
  const formSchema = z.object({
    price: z.string(),
    auth: z.enum(["public", "offchain"]),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      auth: "public",
    },
  });

  const { writeContractAsync } = useWriteContract();
  const { ctaOverride, hash, pending, initiate } = useTransactionWrapper({
    chainId: tokenContract?.chainId,
  });

  async function onSubmit(data: any) {
    initiate(
      async () =>
        await writeContractAsync({
          chainId: tokenContract?.chainId,
          address: tokenContract?.mintPage?.controller!,
          abi: GasCoinPurchaseControllerAbi,
          functionName: "setUp",
          args: [
            tokenContract?.contractAddress!,
            parseUnits(data.price, 18),
            data.auth === "offchain",
          ],
        })
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (ETH)</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="auth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mint authentication</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="offchain">Offchain signature</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-4 items-center">
          <Button
            type="submit"
            variant="unemphasized"
            disabled={!form.formState.isValid}
            loading={pending}
          >
            {ctaOverride ?? "Save"}
          </Button>
          {hash && (
            <TransactionLink chainId={tokenContract?.chainId} hash={hash} />
          )}
        </div>
      </form>
    </Form>
  );
}
