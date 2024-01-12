import { GroupOsConfig } from "./types";

const defaultConfig: GroupOsConfig = {
  name: "New Project",
  tokenContracts: [],
  colors: {
    tokenStandard: {
      ERC20: "blue",
      ERC721: "green",
      ERC1155: "orange",
    },
  },
};

export default defaultConfig;
