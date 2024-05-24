import { PermissionsAbi } from "@/lib/abi/Permissions";
import { TokenConfig } from "@/lib/types";
import { useReadContract, useWriteContract } from "wagmi";
import { AvatarAddress } from "../../ui/AvatarAddress";
import { Button } from "../../ui/Button";
import { Operation } from "@/lib/constants";
import { toSentenceCase } from "@/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Address, Hex, encodeFunctionData, isAddressEqual } from "viem";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { Input } from "../../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import { useTransactionWrapper } from "@/lib/hooks/useTransactionWrapper";
import { TransactionLink } from "../../TransactionLink";
import { MulticallAbi } from "@/lib/abi/Multicall";
import { useEffect, useState } from "react";

const formSchema = z.object({
  permissions: z
    .object({
      account: z.string(),
      operation: z.string(),
    })
    .array(),
});

type Permission = {
  account: Address;
  operation: Operation;
};

export function PermissionsTab({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  const { data: permissionsData, refetch: refetchPermissions } =
    useReadContract({
      chainId: tokenContract?.chainId,
      address: tokenContract?.contractAddress as `0x${string}`,
      abi: PermissionsAbi,
      functionName: "getAllPermissions",
    });

  return (
    <div className="pt-8 px-6 space-y-6 max-w-[750px]">
      <div className="text-2xl">Permissions</div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col justify-center text-secondary">
          Address
        </div>
        <div className="flex flex-col justify-center text-secondary">
          Operation
        </div>
        <div>
          <EditPermissions tokenContract={tokenContract} />
        </div>
        {permissionsData?.map((permission) => (
          <>
            <div className="col-span-1">
              <AvatarAddress address={permission.account} />
            </div>
            <div className="col-span-2 flex flex-col justify-center">
              {toSentenceCase(
                Object.entries(Operation).find(
                  ([key, value]) => value === permission.operation
                )?.[0]
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

function EditPermissions({ tokenContract }: { tokenContract?: TokenConfig }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="unemphasized">Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-[750px]">
        <DialogHeader>
          <DialogTitle>Edit Permissions</DialogTitle>
          <DialogDescription>
            Requires a transaction to update.
          </DialogDescription>
        </DialogHeader>
        <EditPermissionsForm tokenContract={tokenContract} />
      </DialogContent>
    </Dialog>
  );
}

function diffPermissions(current: Permission[], updated: Permission[]) {
  const toAdd = updated.filter(
    (v) =>
      !current?.some(
        (permission) =>
          !!permission.account &&
          !!v.account &&
          isAddressEqual(permission.account, v.account as Address) &&
          permission.operation === v.operation
      )
  );
  const toRemove = current.filter(
    (v) =>
      !updated.some(
        (permission) =>
          !!permission.account &&
          !!v.account &&
          isAddressEqual(permission.account as Address, v.account) &&
          permission.operation === v.operation
      )
  );
  const noDiff = toAdd.length + toRemove.length === 0;
  const isValid =
    !noDiff &&
    updated.every(
      (permission) => !!permission.account && !!permission.operation
    );

  return { toAdd, toRemove, noDiff, isValid };
}

function EditPermissionsForm({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) {
  const { data: permissionsData } = useReadContract({
    chainId: tokenContract?.chainId,
    address: tokenContract?.contractAddress as `0x${string}`,
    abi: PermissionsAbi,
    functionName: "getAllPermissions",
  });
  const { writeContractAsync } = useWriteContract();
  const { pending, hash, initiate } = useTransactionWrapper({
    chainId: tokenContract?.chainId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: permissionsData as unknown as Permission[],
    },
  });

  const {
    fields: permissionFields,
    append: appendPermission,
    remove: removePermission,
  } = useFieldArray({
    control: form.control,
    name: "permissions",
    rules: {
      validate: (permissions) => {
        console.log("validate");
        const isValid = permissions.every(
          (permission) => !!permission.account && !!permission.operation
        );
        console.log("validate", permissions, isValid);
        return isValid;
      },
    },
  });

  const permissions = form.watch("permissions");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const { toAdd, toRemove, noDiff } = diffPermissions(
      (permissionsData ?? []) as unknown as Permission[],
      values.permissions as Permission[]
    );

    if (noDiff) return;

    initiate(
      async () =>
        await writeContractAsync({
          chainId: tokenContract?.chainId,
          address: tokenContract?.contractAddress!,
          abi: MulticallAbi,
          functionName: "multicall",
          args: [
            [
              ...toAdd.map((permission) =>
                encodeFunctionData({
                  abi: PermissionsAbi,
                  functionName: "addPermission",
                  args: [
                    permission.operation as Hex,
                    permission.account as Address,
                  ],
                })
              ),
              ...toRemove.map((permission) =>
                encodeFunctionData({
                  abi: PermissionsAbi,
                  functionName: "removePermission",
                  args: [
                    permission.operation as Hex,
                    permission.account as Address,
                  ],
                })
              ),
            ],
          ],
        })
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        {permissionFields.map((permission, i) => (
          <div
            className="flex flex-row gap-2 items-center w-full"
            key={permission.id}
          >
            <FormField
              control={form.control}
              name={`permissions.${i}.account`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Input wallet address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`permissions.${i}.operation`}
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Operation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Operation.ADMIN}>Admin</SelectItem>
                      <SelectItem value={Operation.MINT}>Mint</SelectItem>
                      <SelectItem value={Operation.BURN}>Burn</SelectItem>
                      <SelectItem value={Operation.TRANSFER}>
                        Transfer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pl-4 pr-2">
              <button
                onClick={() => {
                  console.log("i", i);
                  removePermission(i);
                }}
              >
                <TrashIcon className="h-5 w-5 text-secondary hover:text-primary" />
              </button>
            </div>
          </div>
        ))}
        <Button
          fullWidth
          variant="input"
          type="button"
          onClick={() => appendPermission({ account: "", operation: "" })}
        >
          + Add permission
        </Button>
        <div className="pt-6 flex flex-row gap-4 items-center">
          <Button
            variant="unemphasized"
            type="submit"
            loading={pending}
            disabled={
              !diffPermissions(
                (permissionsData ?? []) as unknown as Permission[],
                permissions as Permission[]
              ).isValid
            }
          >
            Save
          </Button>
          <TransactionLink chainId={tokenContract?.chainId} hash={hash} />
        </div>
      </form>
    </Form>
  );
}
