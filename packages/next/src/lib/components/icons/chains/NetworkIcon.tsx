import { Ethereum } from "./Ethereum";
import { Goerli } from "./Goerli";
import { Optimism } from "./Optimism";
import { Polygon } from "./Polygon";
import { Linea } from "./Linea";
import Base from "./Base";

export const NetworkIcon = ({
  chainId,
  className,
}: {
  chainId?: number;
  className?: string;
}) => {
  switch (chainId) {
    case 1:
      return <Ethereum className={className} />;
    case 5:
      return <Goerli className={className} />;
    case 11155111:
      return <Goerli className={className} />;
    case 10:
      return <Optimism className={className} />;
    case 8453:
      return <Base className={className} />;
    case 137:
      return <Polygon className={className} />;
    case 59144:
      return <Linea className={className} />;
    case 59140:
      return <Linea className={className} />;
  }
  return <span className="h-6 w-6 rounded-full [#4d4d4d]"></span>;
};
