import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Operation } from "@/lib/constants";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, useFieldArray } from "react-hook-form";
import { AvatarAddress } from "../../ui/AvatarAddress";
import { Button } from "../../ui/Button";
import { Address, encodeFunctionData } from "viem";
import { TokenConfig } from "@/lib/types";
import LoadingSpinner from "../../ui/LoadingSpinner";
import TextLink from "../../TextLink";
import { getTransactionUrl } from "@/lib/utils";
import { PermissionsAbi } from "@/lib/abi/Permissions";
import { MulticallAbi } from "@/lib/abi/Multicall";
import { Input } from "../../ui/Input";

type Admin = {
  account: string;
  operation: string;
  pending?: {
    isAdd: boolean;
    transactionHash: string;
  };
};

const PermissionItem = ({
  admin,
  admins,
  setAdmins,
  tokenContract,
  toRemove,
  removeToRemove,
  appendToRemove,
}: {
  admin: Admin;
  admins: Admin[];
  setAdmins: (admins: Admin[]) => void;
  tokenContract?: TokenConfig;
  toRemove: string[];
  removeToRemove: (index: number) => void;
  appendToRemove: (address: string) => void;
}) => {
  //   const { setToastState } = useContext(ToastContext);
  const [pendingTransactionHash, setPendingTransactionHash] = useState<
    string | undefined
  >(admin.pending?.transactionHash);

  useWaitForTransactionReceipt({
    hash: pendingTransactionHash as `0x${string}`,
    query: {
      enabled: !!pendingTransactionHash,
    },
    // onSuccess: () => {
    //   //   setToastState({
    //   //     isToastShowing: true,
    //   //     type: ToastType.SUCCESS,
    //   //     message: "Admins updated.",
    //   //   });
    //   setPendingTransactionHash(undefined);
    //   setAdmins(
    //     admins
    //       .filter(
    //         (a) =>
    //           a.account !== admin.account ||
    //           !(!!admin.pending && !admin.pending.isAdd)
    //       )
    //       .map((a) => {
    //         if (a.account === admin.account) {
    //           return {
    //             ...a,
    //             pending: undefined,
    //           };
    //         }
    //         return a;
    //       })
    //   );
    // },
  });

  return (
    <div
      className="flex flex-row items-center justify-between"
      key={admin.account}
    >
      <AvatarAddress address={admin.account} />

      {admin.pending?.transactionHash ? (
        <div className="flex flex-row gap-x-2 items-center">
          <LoadingSpinner />
          <span className="text-xs text-gray-50">
            {admin.pending.isAdd ? "Adding" : "Removing"} admin
          </span>
          <TextLink
            className="text-xs"
            href={getTransactionUrl(
              tokenContract?.chainId,
              admin.pending.transactionHash
            )}
          >
            View on Explorer
          </TextLink>
        </div>
      ) : (
        <>
          {admins.length === 1 ? (
            <Button disabled={true} size="md" variant="error">
              Remove
            </Button>
          ) : (
            <Button
              disabled={!!admin.pending}
              variant={toRemove.includes(admin.account) ? "secondary" : "error"}
              onClick={() => {
                if (toRemove.includes(admin.account)) {
                  removeToRemove(toRemove.indexOf(admin.account));
                } else {
                  appendToRemove(admin.account);
                }
              }}
            >
              {toRemove.includes(admin.account) ? "Undo" : "Remove"}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export const PermissionTab = ({
  tokenContract,
}: {
  tokenContract?: TokenConfig;
}) => {
  //   const { setToastState } = useContext(ToastContext);
  const [admins, setAdmins] = useState<Admin[]>([]);

  const { data: permissionsData, refetch: refetchPermissions } =
    useReadContract({
      chainId: tokenContract?.chainId,
      address: tokenContract?.contractAddress as `0x${string}`,
      abi: PermissionsAbi,
      functionName: "getAllPermissions",
    });

  useEffect(() => {
    if (permissionsData) {
      setAdmins(
        (permissionsData as any[])
          .map((permission: any) => ({
            account: permission.account,
            operation: permission.operation,
          }))
          .filter((permission) => permission.operation === Operation.ADMIN)
      );
    }
  }, [permissionsData]);

  const {
    register,
    handleSubmit,
    watch,
    formState,
    control,
    reset: resetForm,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      toAdd: [] as string[],
      toRemove: [] as string[],
    },
  });

  const { errors, isValid, isDirty } = formState;

  const {
    fields: fieldsToAdd,
    append: appendToAdd,
    remove: removeToAdd,
  } = useFieldArray({
    control,
    // @ts-ignore not sure why this is throwing an error
    name: "toAdd",
  });

  const { append: appendToRemove, remove: removeToRemove } = useFieldArray({
    control,
    // @ts-ignore not sure why this is throwing an error
    name: "toRemove",
  });

  const toAdd = watch("toAdd");
  const toRemove = watch("toRemove");

  // was breaking when trying to do all of this in one line within the prepare hook, so segmenting out for sanity and it fixed it :O
  const filteredAdd = toAdd.filter((address) =>
    address.match(/^0x[a-fA-F0-9]{40}$/)
  );
  const filteredRemove = toRemove.filter((address) =>
    address.match(/^0x[a-fA-F0-9]{40}$/)
  );
  const mappedAdd = filteredAdd.map((address) =>
    encodeFunctionData({
      abi: PermissionsAbi,
      functionName: "addPermission",
      args: [Operation.ADMIN, address as Address],
    })
  );
  const mappedRemove = filteredRemove.map((address) =>
    encodeFunctionData({
      abi: PermissionsAbi,
      functionName: "removePermission",
      args: [Operation.ADMIN, address as Address],
    })
  );
  const merged = [...mappedAdd, ...mappedRemove];

  const {
    data: batchAdminsTxHash,
    writeContractAsync,
    isPending: isBatchLoading,
  } = useWriteContract();

  const onSubmit = async (_data: any) => {
    let txData: any;
    try {
      txData = await writeContractAsync({
        chainId: tokenContract?.chainId,
        address: tokenContract?.contractAddress!,
        abi: MulticallAbi,
        functionName: "multicall",
        args: [merged as `0x${string}`[]],
      });
    } catch (e: any) {
      console.error(e);
      //   setToastState({
      //     isToastShowing: true,
      //     type: ToastType.ERROR,
      //     message: e.message || "Something went wrong. Please try again.",
      //   });
      return;
    }

    // if the on-chain write fails, we should not proceed with the off-chain write
    if (!txData) {
      //   setToastState({
      //     isToastShowing: true,
      //     type: ToastType.ERROR,
      //     message: "Something went wrong. Please try again.",
      //   });
      return;
    }

    // optimistically set front-end state
    setAdmins([
      ...admins.filter((admin) => !toRemove.includes(admin.account)),
      ...admins
        .filter((admin) => toRemove.includes(admin.account))
        .map((admin) => {
          return {
            ...admin,
            pending: {
              isAdd: false,
              transactionHash: txData!.hash,
            },
          };
        }),
      ...toAdd
        .filter((address) => address.match(/^0x[a-fA-F0-9]{40}$/))
        .map((address) => {
          return {
            account: address,
            operation: Operation.ADMIN,
            pending: {
              isAdd: true,
              transactionHash: txData!.hash,
            },
          };
        }),
    ]);

    resetForm();
  };

  useWaitForTransactionReceipt({
    hash: batchAdminsTxHash,
    // onSuccess: () => {
    //   //   setToastState({
    //   //     isToastShowing: true,
    //   //     type: ToastType.SUCCESS,
    //   //     message: "Admins updated.",
    //   //   });
    //   refetchPermissions();
    // },
  });

  return (
    <div className="max-w-[600px]">
      {/* <p className="mb-8">
        Admins can add or remove admins and manage Token permissions.
      </p> */}

      <div className="mt-8 space-y-4 mb-4">
        {admins?.map((admin, i) => {
          return (
            <PermissionItem
              key={`${admin.account}-${i}`}
              admin={admin}
              admins={admins}
              setAdmins={setAdmins}
              tokenContract={tokenContract}
              toRemove={toRemove}
              removeToRemove={removeToRemove}
              appendToRemove={appendToRemove}
            />
          );
        })}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fieldsToAdd.map((field: any, index: number) => {
          return (
            <div
              className="bg-highlightFaint p-4 rounded mb-2"
              key={`new-admin-${field.id}`}
            >
              <div className="flex flex-row justify-between items-center mb-4">
                <span className="text-sm text-secondary">
                  Admin {(admins?.length || 0) + (index + 1)}
                </span>
                <XMarkIcon
                  className="h-6 w-6 text-secondary cursor-pointer hover:text-primary"
                  aria-hidden="true"
                  onClick={() => {
                    removeToAdd(index);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label>Wallet address</label>
                <Input name={`toAdd.${index}`} placeholder="0x" />
              </div>
            </div>
          );
        })}

        <Button fullWidth variant="input" onClick={() => appendToAdd("")}>
          + New admin
        </Button>

        <div className="mt-8 flex flex-row-reverse">
          <Button
            variant="secondary"
            disabled={
              !writeContractAsync || !isValid || !isDirty || merged.length === 0
            }
            loading={isBatchLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
