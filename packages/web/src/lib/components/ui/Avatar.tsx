import { useTbaMetadata } from "@/lib/api/hooks";
import { PFP_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Address } from "viem";
import { useEnsName, useEnsAvatar } from "wagmi";
interface AvatarProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  address?: Address;
  className?: string;
}

const sizeMap: { [key: string]: string } = {
  ["xs"]: "min-h-[16px] min-w-[16px] max-h-[16px] max-w-[16px]",
  ["sm"]: "min-h-[24px] min-w-[24px] max-h-[24px] max-w-[24px]",
  ["base"]: "min-h-[32px] min-w-[32px] max-h-[32px] max-w-[32px]",
  ["lg"]: "min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px]",
  ["xl"]: "w-[70px] h-[70px] aspect-square",
};

const sizeRadiusMap: { [key: string]: string } = {
  ["xs"]: "",
  ["sm"]: "rounded-xs",
  ["base"]: "rounded-sm",
  ["lg"]: "rounded-md",
  ["xl"]: "rounded-lg",
};

export const Avatar = ({ size = "base", address, className }: AvatarProps) => {
  const { data: ensName } = useEnsName({
    chainId: 1,
    address,
  });
  const { data: ensAvatar } = useEnsAvatar({
    chainId: 1,
    name: ensName as string,
  });
  const { data: metadata } = useTbaMetadata(address as Address);

  return (
    // wrapped in div with relative to handle non-square images via cropping
    // https://nextjs.org/docs/api-reference/next/image#fill
    <div className={`relative ${sizeMap[size]}`}>
      {/* @ts-ignore */}
      {!!metadata?.image ? (
        <Image
          // @ts-ignore
          src={metadata!.image}
          alt="Account profile picture."
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "border border-highlight object-cover",
            sizeRadiusMap[size],
            className
          )}
        />
      ) : !!ensAvatar ? (
        <Image
          src={ensAvatar}
          alt="Account profile picture."
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`rounded-full border border-highlight object-cover ${className}`}
        />
      ) : (
        <Image
          src={
            // convert hexadecimal to its number value and modulo by the num of pfps
            PFP_MAP[(parseInt(Number(address)?.toString(), 10) % 4) as number]
          }
          alt="Account profile picture. If no profile picture is set, there is a picture of a Terminal."
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`rounded-full border border-highlight object-cover ${className}`}
        />
      )}
    </div>
  );
};
