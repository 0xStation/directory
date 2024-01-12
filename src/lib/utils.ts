import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TokenConfig } from "./config/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pages = {
  tokenDirectory: (token: TokenConfig) => `/${token.slug}/directory`,
  settings: (token: TokenConfig) => `/${token.slug}/settings`,
};
