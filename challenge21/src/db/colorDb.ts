import type { Color } from "../types/color.ts";

const colors: Color[] = []

export const findColors = (): Color[] => {
  return colors
}

export const createColor = (
  code: string,
): Color => {
  const color: Color = {
    id: globalThis.crypto.randomUUID(),
    code,
  }
  colors.push(color)
  return color
};
