import React, { createContext, useContext } from "react";

import { useTransitionEngine } from "../hooks/use-transition-engine";

const ShadeShiftContext = createContext<ReturnType<
  typeof useTransitionEngine
> | null>(null);

export const ShadeShiftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const transitionEngine = useTransitionEngine();

  return (
    <ShadeShiftContext.Provider value={transitionEngine}>
      {children}
    </ShadeShiftContext.Provider>
  );
};

export const useShadeShiftContext = () => {
  const context = useContext(ShadeShiftContext);
  if (!context) {
    throw new Error(
      "useShadeShiftContext must be used within a ShadeShiftProvider"
    );
  }
  return context;
};
