import { useSendTransaction } from "wagmi";

export function useSendWaitTransaction() {
    const { sendTransactionAsync } = useSendTransaction()
}