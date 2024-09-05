import { applyCanvasToElement, createCanvas } from "../utils/dom-manipulation";

import { TransitionFunction } from "../types";

export const diagonalWipeTransition: TransitionFunction = async (
  element,
  fromTheme,
  toTheme,
  config,
  onProgress
) => {
  const { duration, direction = "topLeft" } = config;
  const start = performance.now();

  const canvas = createCanvas(element);
  const ctx = canvas.getContext("2d")!;

  const animate = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    onProgress(progress);

    const diagonalProgress = progress * (canvas.width + canvas.height);

    ctx.save();
    ctx.beginPath();

    switch (direction) {
      case "topLeft":
        ctx.moveTo(0, 0);
        ctx.lineTo(diagonalProgress, 0);
        ctx.lineTo(0, diagonalProgress);
        break;
      case "topRight":
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(canvas.width - diagonalProgress, 0);
        ctx.lineTo(canvas.width, diagonalProgress);
        break;
      case "bottomLeft":
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(diagonalProgress, canvas.height);
        ctx.lineTo(0, canvas.height - diagonalProgress);
        break;
      case "bottomRight":
        ctx.moveTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width - diagonalProgress, canvas.height);
        ctx.lineTo(canvas.width, canvas.height - diagonalProgress);
        break;
    }

    ctx.closePath();
    ctx.fillStyle = toTheme;
    ctx.fill();

    ctx.globalCompositeOperation = "destination-atop";
    ctx.fillStyle = fromTheme;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
