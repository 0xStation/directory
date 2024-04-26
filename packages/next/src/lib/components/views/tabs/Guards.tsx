import { TokenConfig } from "@/lib/types";
import { ContractLink } from "../../ContractLink";
import { Button } from "../../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWriteContract } from "wagmi";
import { GuardsAbi } from "@/lib/abi/Guards";
import { Operation, maxAddress } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { Address, zeroAddress } from "viem";
import { Input } from "../../ui/Input";
import { cn, toSentenceCase } from "@/lib/utils";
import { useTransactionWrapper } from "@/lib/hooks/useTransactionWrapper";
import { TransactionLink } from "../../TransactionLink";

export function EditGuard({
  tokenContract,
  operation,
}: {
  tokenContract?: TokenConfig;
  operation: Operation;
}) {
  const name = toSentenceCase(
    Object.entries(Operation).find(([key, value]) => value === operation)?.[0]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="unemphasized">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {name} Guard</DialogTitle>
          <DialogDescription>
            Requires a transaction to update.
          </DialogDescription>
        </DialogHeader>
        <EditGuardForm tokenContract={tokenContract} operation={operation} />
      </DialogContent>
    </Dialog>
  );
}

function EditGuardForm({
  tokenContract,
  operation,
}: {
  tokenContract?: TokenConfig;
  operation: Operation;
}) {
  const formSchema = z.object({
    type: z.enum(["none", "blocked", "custom"]),
    custom: z.optional(z.string().regex(/^(0x)?[0-9a-fA-F]{40}$/)),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "none",
      //   custom: "",
    },
  });
  const type = form.watch("type");

  const { writeContractAsync } = useWriteContract();
  const { ctaOverride, hash, pending, initiate } = useTransactionWrapper({
    chainId: tokenContract?.chainId,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    initiate(async () => {
      if (data.type === "none") {
        return await writeContractAsync({
          chainId: tokenContract?.chainId,
          address: tokenContract?.contractAddress!,
          abi: GuardsAbi,
          functionName: "removeGuard",
          args: [operation],
        });
      } else {
        return await writeContractAsync({
          chainId: tokenContract?.chainId,
          address: tokenContract?.contractAddress!,
          abi: GuardsAbi,
          functionName: "setGuard",
          args: [
            operation,
            (data.type === "blocked" ? maxAddress : data.custom!) as Address,
          ],
        });
      }
    });
  }

  const name = toSentenceCase(
    Object.entries(Operation).find(([key, value]) => value === operation)?.[0]
  );

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{name} restrictions</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="custom"
            render={({ field }) => (
              <FormItem className={cn(type === "custom" ? "mt-1" : "hidden")}>
                <FormControl>
                  <Input placeholder="0x" {...field} />
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
          {hash && (
            <TransactionLink chainId={tokenContract?.chainId} hash={hash} />
          )}
        </div>
      </form>
    </Form>
  );
}
