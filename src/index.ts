import {
  ShadeShiftProvider,
  useShadeShiftContext,
} from "./context/shade-shift-provider";
import { TransitionConfig, TransitionType } from "./types";

import { useRouteThemeSync } from "./hooks/use-route-theme-sync";
import { useThemeTransition } from "./hooks/use-theme-transition";

export const shadeShift = {
  Provider: ShadeShiftProvider,
  useContext: useShadeShiftContext,
  useThemeTransition,
  useRouteThemeSync,
};

export type { TransitionConfig, TransitionType };
