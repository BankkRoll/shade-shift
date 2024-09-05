import {
  applyCanvasToElement,
  createCanvas,
  interpolateColors,
} from "../utils/dom-manipulation";

import { TransitionFunction } from "../types";

export const vortexTransition: TransitionFunction = async (
  element,
  fromTheme,
  toTheme,
  config,
  onProgress
) => {
  const { duration, intensity = 5 } = config;
  const start = performance.now();

  const canvas = createCanvas(element);
  const ctx = canvas.getContext("2d")!;

  const animate = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    onProgress(progress);

    const radius = Math.min(canvas.width, canvas.height) * 0.5 * progress;
    const angle = progress * Math.PI * 10 * intensity;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    for (let i = 0; i < canvas.width; i += 5) {
      for (let j = 0; j < canvas.height; j += 5) {
        const dist = Math.sqrt(i * i + j * j);
        const p = Math.min(Math.max((dist - radius) / 50, 0), 1);
        const color = interpolateColors(fromTheme, toTheme, p);

        ctx.fillStyle = color;
        ctx.fillRect(i - canvas.width / 2, j - canvas.height / 2, 5, 5);
      }
    }

    ctx.restore();
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
