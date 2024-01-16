import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TokenConfig } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pages = {
  tokenDirectory: (token: TokenConfig) => `/${token.slug}/directory`,
  settings: (token: TokenConfig) => `/${token.slug}/settings`,
};

export const networkName: Record<number, string> = {
  1: "Ethereum",
  5: "Ethereum Goerli",
  11155111: "Ethereum Sepolia",
  10: "Optimism",
  137: "Polygon",
};

export function truncateBytes(bytes: string = "0x", visibleChars: number = 4) {
  if (2 * visibleChars + 1 < bytes.length) {
    return (
      bytes?.slice(0, 2 + visibleChars) +
      "..." +
      bytes?.slice(bytes.length - visibleChars, bytes.length)
    );
  }

  return bytes;
}
