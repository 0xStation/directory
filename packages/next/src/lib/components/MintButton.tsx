import { useState } from "react";
import {
  useAccount,
  useConnect,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { TokenConfig } from "../types";
import { Button } from "./ui/Button";
import { useMintErc721GasCoin } from "../hooks/mint/useMintErc721GasCoin";
import { useModal } from "connectkit";
import { useOnePerAddress } from "../hooks/mint/useOnePerAddress";

const MintButton = ({ tokenContract }: { tokenContract?: TokenConfig }) => {
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
  const { switchChainAsync } = useSwitchChain();
  const { connect } = useConnect();
  const { setOpen } = useModal();

  const [loading, setLoading] = useState<boolean>();

  return (
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
              await sendTransactionAsync({
                to: call.to,
                value: call.value,
                data: call.data,
              });
            } catch (e: any) {}
            setLoading(false);
          }}
          disabled={mintDisabled || onePerAddressDisabled}
          loading={loading}
        >
          Mint
        </Button>
      )}
      {onePerAddressMessage ?? mintMessage}
    </div>
  );
};

export default MintButton;
