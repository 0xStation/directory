import { Color, TokenStandard } from "../types";
import { Pill } from "./ui/Pill";

export function TokenStandardPill({
  tokenStandard,
}: {
  tokenStandard: TokenStandard;
}) {
  const standardToColor: Record<TokenStandard, Color> = {
    ERC20: "green",
    ERC721: "blue",
    ERC1155: "orange",
  };
  return <Pill color={standardToColor[tokenStandard]}>{tokenStandard}</Pill>;
}
