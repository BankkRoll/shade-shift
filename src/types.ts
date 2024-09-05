export type TransitionType =
  | "splitScreen"
  | "diagonalWipe"
  | "morphology"
  | "pixelate"
  | "vortex";

export interface TransitionConfig {
  type: TransitionType;
  duration: number;
  easing: string;
  direction?:
    | "horizontal"
    | "vertical"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  intensity?: number;
}

export interface TransitionState {
  isTransitioning: boolean;
  currentTransition: TransitionConfig | null;
  progress: number;
}

export type TransitionFunction = (
  element: HTMLElement,
  fromTheme: string,
  toTheme: string,
  config: TransitionConfig,
  onProgress: (progress: number) => void
) => Promise<void>;

export interface RouteThemeConfig {
  theme: string;
  transition: TransitionConfig;
}
