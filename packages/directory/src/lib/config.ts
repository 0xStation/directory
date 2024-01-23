import { GroupOsConfig } from "./types";

export const defaultConfig: GroupOsConfig = {
  logo: "",
  name: "Default Group",
  theme: {
    colors: {
      // accents
      action: "#AD72FF",
      red: "#FF5650",
      green: "#63EBAF",
      blue: "#5F6FFF",
      orange: "#FF9956",
      yellow: "#CEDC4B",
      purple: "#AD72FF",
      // dark mode
      primary: "#ffffff",
      secondary: "#858585",
      highlight: "#2E2E2E",
      highlightFaint: "#1A1A1A",
      background: "#000000",
    },
  },
  tokenContracts: [],
  tokenboundAccounts: {
    registry: "0x000000006551c19487814612e58fe06813775758",
    implementation: "0xee0b927f5065923d49dda69dce229ef467663310",
    salt: "0x852517b7ffed0f98d714dd1787995aff4d6b1892000000000000000000000000",
  },
};

export function createConfig(overrides: Partial<GroupOsConfig>): GroupOsConfig {
  return {
    ...defaultConfig,
    ...overrides,
  };
}
