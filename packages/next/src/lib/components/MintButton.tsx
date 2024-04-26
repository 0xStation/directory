import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { TokenConfig } from "../types";
import { Button } from "./ui/Button";
import { useMintErc721GasCoin } from "../hooks/mint/useMintErc721GasCoin";
import { useOnePerAddress } from "../hooks/mint/useOnePerAddress";
import { TransactionLink } from "./TransactionLink";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
import Link from "next/link";
import { getTransactionUrl } from "../utils";
import { useTransactionWrapper } from "../hooks/useTransactionWrapper";

const MintButton = ({ tokenContract }: { tokenContract?: TokenConfig }) => {
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
  const { sendTransactionAsync } = useSendTransaction();

  const { ctaOverride, hash, pending, initiate } = useTransactionWrapper({
    chainId: tokenContract?.chainId,
    onSuccess: () => setOpenSuccessDialog(true),
  });

  return (
    <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
      <div className="flex flex-col w-full gap-3">
        <span className="text-lg mb-4 block">
          {fees.map((fee) => fee.amount + " " + fee.currency).join(" + ")}
        </span>
        <Button
          size="lg"
          fullWidth
          onClick={() =>
            initiate(async () => {
              return await sendTransactionAsync({
                to: call.to,
                value: call.value,
                data: call.data,
              });
            })
          }
          disabled={mintDisabled || onePerAddressDisabled}
          loading={pending}
        >
          {ctaOverride ?? tokenContract?.mintPage?.cta ?? "Mint"}
        </Button>
        {onePerAddressMessage ?? mintMessage}
        {!!hash && (
          <TransactionLink chainId={tokenContract?.chainId} hash={hash} />
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
              href={getTransactionUrl(tokenContract?.chainId, hash)}
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
            href={getTransactionUrl(tokenContract?.chainId, hash)}
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
