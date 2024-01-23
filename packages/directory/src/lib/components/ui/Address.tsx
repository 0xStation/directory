import { truncateBytes } from "@/lib/utils";
// import { useAccountMetadata } from "@/pages/api/v1/account/metadata";
import { useEnsName } from "wagmi";

interface AddressProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  address: string;
  interactive?: boolean;
  showRichName?: boolean;
}

const textSizeMap: { [key: string]: string } = {
  ["xs"]: "text-sm",
  ["sm"]: "text-base",
  ["base"]: "text-base",
  ["lg"]: "text-xl font-bold",
};

export const Address = ({
  size = "base",
  address,
  interactive = true,
  showRichName = true,
}: AddressProps) => {
  const { data: ensName } = useEnsName({
    chainId: 1,
    address: address as `0x${string}`,
  });
  //   const { metadata } = useAccountMetadata(address as `0x${string}`);
  const metadata = null;

  const userInfo =
    !showRichName || (!ensName && !metadata) ? (
      <span
        className={`flex flex-row items-center whitespace-nowrap overflow-hidden text-ellipsis ${textSizeMap[size]}`}
      >
        {truncateBytes(address)}
      </span>
    ) : (
      <>
        <span
          className={`flex flex-row items-center whitespace-nowrap overflow-hidden text-ellipsis  ${
            // if interactive, hide ENS name on hover
            interactive ? "group-hover:hidden" : ""
          } ${textSizeMap[size]}`}
        >
          {/* @ts-ignore */}
          {ensName ?? metadata?.name}
        </span>
        {interactive && (
          <span
            // show on hover
            className={`hidden flex-row items-center whitespace-nowrap overflow-hidden text-ellipsis group-hover:flex ${textSizeMap[size]}`}
          >
            {truncateBytes(address)}
          </span>
        )}
      </>
    );

  return interactive ? (
    <div
      className="group cursor-pointer overflow-hidden"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(address);
      }}
    >
      {userInfo}
    </div>
  ) : (
    <div className="group overflow-hidden">{userInfo}</div>
  );
};
