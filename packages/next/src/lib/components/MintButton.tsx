import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { TokenConfig } from "../types";
import { Button } from "./ui/Button";
import { useMintErc721GasCoin } from "../hooks/mint/useMintErc721GasCoin";
import { useModal } from "connectkit";
import { useOnePerAddress } from "../hooks/mint/useOnePerAddress";
import { Hex } from "viem";
import TextLink from "./TextLink";
import { TransactionLink } from "./TransactionLink";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import Link from "next/link";
import { getTransaction } from "viem/actions";
import { getTransactionUrl } from "../utils";

const MintButton = ({ tokenContract }: { tokenContract?: TokenConfig }) => {
  const [txHash, setTxHash] = useState<Hex>();
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  const { disabled: onePerAddressDisabled, message: onePerAddressMessage } =
    useOnePerAddress(tokenContract);
  const {
    call,
    fees,
    message: mintMessage,
    disabled: mintDisabled,
  } = useMintErc721GasCoin({
    tokenContract,
  });
  const account = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { status } = useWaitForTransactionReceipt({
    chainId: tokenContract?.chainId,
    hash: txHash,
  });
  const { switchChainAsync } = useSwitchChain();
  const { setOpen } = useModal();

  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (status === "success") {
      setOpenSuccessDialog(true);
    }
  }, [status]);

  return (
    <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
      <div className="flex flex-col w-full gap-3">
        <span className="text-lg mb-4 block">
          {fees.map((fee) => fee.amount + " " + fee.currency).join(" + ")}
        </span>
        {!account.address ? (
          <Button size="lg" fullWidth onClick={() => setOpen(true)}>
            Connect
          </Button>
        ) : (
          <Button
            size="lg"
            fullWidth
            onClick={async () => {
              try {
                setLoading(true);
                if (account.chainId !== tokenContract?.chainId) {
                  await switchChainAsync({ chainId: tokenContract?.chainId! });
                }
                const hash = await sendTransactionAsync({
                  to: call.to,
                  value: call.value,
                  data: call.data,
                });
                setTxHash(hash);
              } catch (e: any) {}
              setLoading(false);
            }}
            disabled={mintDisabled || onePerAddressDisabled}
            loading={loading || (!!txHash && status === "pending")}
          >
            {tokenContract?.mintPage?.cta ?? "Mint"}
          </Button>
        )}
        {onePerAddressMessage ?? mintMessage}
        {!!txHash && (
          <TransactionLink chainId={tokenContract?.chainId} hash={txHash} />
        )}
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Successfully minted!</DialogTitle>
        </DialogHeader>
        <div className="text-secondary">
          {tokenContract?.mintPage?.successMessage ??
            "You have successfully minted this NFT."}
        </div>
        {!!tokenContract?.mintPage?.successAction ? (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={getTransactionUrl(tokenContract?.chainId, txHash)}
              target="_blank"
            >
              <Button fullWidth variant={"unemphasized"}>
                View Transaction
              </Button>
            </Link>
            <Link
              href={tokenContract?.mintPage?.successAction.url}
              target="_blank"
            >
              <Button fullWidth>
                {tokenContract?.mintPage?.successAction.cta}
              </Button>
            </Link>
          </div>
        ) : (
          <Link
            href={getTransactionUrl(tokenContract?.chainId, txHash)}
            target="_blank"
          >
            <Button fullWidth variant={"unemphasized"}>
              View Transaction
            </Button>
          </Link>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MintButton;
