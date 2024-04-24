import { NetworkIcon } from "@/lib/components/icons/chains/NetworkIcon";
import { TokenSettings } from "@/lib/components/views/TokenSettings";
import { emptyImage } from "@/lib/constants";
import {
  useTokenContractName,
  useTokenContractRoute,
  useTokenContractSymbol,
} from "@/lib/hooks";
import { TokenConfig } from "@/lib/types";
import { truncateBytes } from "@/lib/utils";
import Image from "next/image";

const TokenContractSettingsPage = () => {
  const tokenContract = useTokenContractRoute();

  console.log("tokenContract", tokenContract);

  return <TokenSettings tokenContract={tokenContract} />;
};

export default TokenContractSettingsPage;
