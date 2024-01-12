import { Ethereum } from "./Ethereum"
import { Goerli } from "./Goerli"
import { Optimism } from "./Optimism"
import { Polygon } from "./Polygon"
import { Linea } from "./Linea"

export const NetworkIcon = ({
  chainId,
  className,
}: {
  chainId?: number
  className?: string
}) => {
  switch (chainId) {
    case 1:
      return <Ethereum className={className} />
    case 5:
      return <Goerli className={className} />
    case 10:
      return <Optimism className={className} />
    case 137:
      return <Polygon className={className} />
    case 59144:
      return <Linea className={className} />
    case 59140:
      return <Linea className={className} />
  }
  return <span className="h-6 w-6 rounded-full bg-gray-80"></span>
}
