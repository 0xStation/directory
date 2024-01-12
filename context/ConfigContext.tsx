import React, { createContext } from "react";

const defaultConfig = {
  theme: {
    backgroundColor: "#FFF",
    textColor: "#000",
  },
};

const ConfigContext = createContext(defaultConfig);

export const ConfigProvider = ({
  config,
  children,
}: {
  config: { theme: { backgroundColor: string; textColor: string } };
  children: any;
}) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export default ConfigContext;
