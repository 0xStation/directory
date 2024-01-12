import { TokenContractCard } from "@/lib/components/TokenContractCard";
import getGroupOsConfig from "@/lib/config";
import { pages } from "@/lib/utils";

export default function Home() {
  const cfg = getGroupOsConfig();
  return (
    <div className="p-12">
      <h1>{cfg.name}</h1>
      <div className="px-4 py-6 max-w-content mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-wrap w-full xl:justify-items-center gap-4 xl:gap-x-2">
          {cfg.tokenContracts.map((tokenContract, i) => (
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
    </div>
  );
}
