import { applyCanvasToElement, createCanvas } from "../utils/dom-manipulation";

import { TransitionFunction } from "../types";

export const splitScreenTransition: TransitionFunction = async (
  element,
  fromTheme,
  toTheme,
  config,
  onProgress
) => {
  const { duration, direction = "horizontal" } = config;
  const start = performance.now();

  const canvas = createCanvas(element);
  const ctx = canvas.getContext("2d")!;

  const animate = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    onProgress(progress);

    if (direction === "horizontal") {
      const split = canvas.width * progress;
      ctx.fillStyle = fromTheme;
      ctx.fillRect(0, 0, canvas.width - split, canvas.height);
      ctx.fillStyle = toTheme;
      ctx.fillRect(canvas.width - split, 0, split, canvas.height);
    } else {
      const split = canvas.height * progress;
      ctx.fillStyle = fromTheme;
      ctx.fillRect(0, 0, canvas.width, canvas.height - split);
      ctx.fillStyle = toTheme;
      ctx.fillRect(0, canvas.height - split, canvas.width, split);
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
