import { TransitionFunction } from "../types";
import { diagonalWipeTransition } from "./diagonal-wipe";
import { morphologyTransition } from "./morphology";
import { pixelateTransition } from "./pixelate";
import { splitScreenTransition } from "./split-screen";
import { vortexTransition } from "./vortex";

export const transitions: Record<string, TransitionFunction> = {
  vortex: vortexTransition,
  splitScreen: splitScreenTransition,
  diagonalWipe: diagonalWipeTransition,
  morphology: morphologyTransition,
  pixelate: pixelateTransition,
};
