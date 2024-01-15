import { Color, TokenStandard } from "../types";
import { Pill } from "./ui/Pill";

export function TokenStandardPill({
  tokenStandard,
}: {
  tokenStandard: TokenStandard;
}) {
  const standardToColor: Record<TokenStandard, Color> = {
    "ERC-20": "green",
    "ERC-721": "blue",
    "ERC-1155": "orange",
  };
  return <Pill color={standardToColor[tokenStandard]}>{tokenStandard}</Pill>;
}
