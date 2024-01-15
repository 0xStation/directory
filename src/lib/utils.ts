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
