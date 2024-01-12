import { GroupOsConfig } from "./types";
import defaultConfig from "./default";
import grouposConfig from "./groupos";

function getGroupOsConfig(): GroupOsConfig {
  return {
    ...defaultConfig,
    ...grouposConfig,
  };
}

export default getGroupOsConfig;
