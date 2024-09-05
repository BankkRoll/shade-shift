export const createCanvas = (element: HTMLElement): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = element.clientWidth;
  canvas.height = element.clientHeight;
  return canvas;
};

export const applyCanvasToElement = (
  canvas: HTMLCanvasElement,
  element: HTMLElement
) => {
  element.style.backgroundImage = `url(${canvas.toDataURL()})`;
};

export const interpolateColors = (
  color1: string,
  color2: string,
  factor: number
): string => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r + factor * (rgb2.r - rgb1.r));
  const g = Math.round(rgb1.g + factor * (rgb2.g - rgb1.g));
  const b = Math.round(rgb1.b + factor * (rgb2.b - rgb1.b));

  return `rgb(${r}, ${g}, ${b})`;
};
