import type { ColorName } from "@/data/products";

/** Swatch treatment for the four supplied container colours. */
export const swatches: Record<ColorName, { hex: string; ring: string; label: string }> = {
  White: { hex: "#FFFFFF", ring: "border-mid/40", label: "White" },
  Green: { hex: "#1F7A3F", ring: "border-transparent", label: "Green" },
  Red: { hex: "#E51827", ring: "border-transparent", label: "Red" },
  Black: { hex: "#111111", ring: "border-transparent", label: "Black" },
};
