import Erc721Mint from "@/lib/components/views/Erc721Mint";
import { useTokenContractRoute } from "@/lib/hooks";

function Mint() {
  const tokenContract = useTokenContractRoute();

  return <Erc721Mint tokenContract={tokenContract} />;
}

export default Mint;
