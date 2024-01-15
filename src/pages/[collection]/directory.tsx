import { Button } from "@/lib/components/ui/Button";
import { DirectoryDropdown } from "@/lib/components/DirectoryDropdown";
import { TokenStandard } from "@/lib/types";

const TokenDirectoryPage = () => {
  const fakeToken = {
    name: "0xTokenName",
    symbol: "0xTokenSymbol",
    image: "https://via.placeholder.com/250",
    chainId: 1,
    contractAddress: "0x1234" as `0x${string}`,
    tokenStandard: "ERC-20" as TokenStandard,
    slug: "0xTokenName",
  };
  return (
    <>
      <nav className="z-20 border-b border-highlight py-2 px-6">
        <div className="relative flex items-center justify-between max-w-content mx-auto">
          <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-xl font-bold">
            0xTokenName
          </h2>
          <div className="flex flex-row space-x-2">
            <Button variant="unemphasized">Claim page</Button>
            <DirectoryDropdown isAdmin={true} token={fakeToken} />
          </div>
        </div>
      </nav>
      <section className="px-6 py-6">
        <p>Directory</p>
      </section>
    </>
  );
};

export default TokenDirectoryPage;
