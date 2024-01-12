import { useContext } from "react";
import { TokenContractCard } from "@/lib/components/TokenContractCard";
import { pages } from "@/lib/utils";
import { Button } from "@/lib/components/ui/Button";
import ConfigContext from "../context/ConfigContext";

export default function App() {
  const { tokenContracts } = useContext(ConfigContext);

  return (
    <>
      <nav className="z-20 border-b border-[#1A1A1A] py-2 px-6">
        <div className="relative flex items-center justify-between max-w-content mx-auto">
          <h2>Tokens</h2>
          <div className="hidden md:block">
            <Button>+ New token</Button>
          </div>
        </div>
      </nav>
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-wrap w-full xl:justify-items-center gap-4 xl:gap-x-2">
          {tokenContracts.map((tokenContract, i) => (
            <TokenContractCard
              key={`tokenContract-${i}`}
              href={pages.tokenDirectory(tokenContract)}
              image={tokenContract.image}
              chainId={tokenContract.chainId}
              contractAddress={tokenContract.contractAddress}
              tokenStandard={tokenContract.tokenStandard}
            />
          ))}
        </div>
      </div>
    </>
  );
}
