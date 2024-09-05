import { TransitionConfig, TransitionType } from "../types";

import { transitions } from "../transitions";
import { useCallback } from "react";
import { useTheme } from "next-themes";
import { useTransitionEngine } from "./use-transition-engine";

export const useThemeTransition = () => {
  const { theme, setTheme } = useTheme();
  const { state, queueTransition, updateProgress } = useTransitionEngine();

  const transitionTheme = useCallback(
    async (newTheme: string, config: TransitionConfig) => {
      if (theme === newTheme || state.isTransitioning) return;

      queueTransition(config);
      const transitionFn = transitions[config.type as TransitionType];
      const rootElement = document.documentElement;

      try {
        await transitionFn(
          rootElement,
          theme!,
          newTheme,
          config,
          updateProgress
        );
        setTheme(newTheme);
      } catch (error) {
        console.error("Theme transition failed:", error);
      }
    },
    [theme, state.isTransitioning, queueTransition, setTheme, updateProgress]
  );

  return { theme, transitionTheme, transitionState: state };
};
