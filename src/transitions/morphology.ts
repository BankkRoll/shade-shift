import {
  applyCanvasToElement,
  createCanvas,
  interpolateColors,
} from "../utils/dom-manipulation";

import { TransitionFunction } from "../types";

export const morphologyTransition: TransitionFunction = async (
  element,
  fromTheme,
  toTheme,
  config,
  onProgress
) => {
  const { duration, intensity = 20 } = config;
  const start = performance.now();

  const canvas = createCanvas(element);
  const ctx = canvas.getContext("2d")!;

  const animate = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    onProgress(progress);

    const cellSize = Math.max(1, Math.floor(intensity * (1 - progress)));

    for (let x = 0; x < canvas.width; x += cellSize) {
      for (let y = 0; y < canvas.height; y += cellSize) {
        const cellProgress = Math.random();
        const color = interpolateColors(
          fromTheme,
          toTheme,
          cellProgress < progress ? 1 : 0
        );

        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }

    applyCanvasToElement(canvas, element);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);

  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
};
