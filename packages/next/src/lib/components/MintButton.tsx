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

const MintButton = ({ tokenContract }: { tokenContract?: TokenConfig }) => {
  const { call, fees, message, disabled } = useMintErc721GasCoin({
    tokenContract,
  });
  const account = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const { connect } = useConnect();

  const [loading, setLoading] = useState<boolean>();

  return (
    <div className="flex flex-col w-full gap-3">
      <span className="text-lg mb-4 block">
        {fees.map((fee) => fee.amount + " " + fee.currency).join(" + ")}
      </span>
      {!account.address ? (
        <Button
          size="lg"
          fullWidth
          onClick={() => connect({ connector: injected() })}
        >
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
          disabled={disabled}
          loading={loading}
        >
          Claim
        </Button>
      )}
      {message}
    </div>
  );
};

export default MintButton;
