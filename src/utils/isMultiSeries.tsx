import type { MultiPoint, SinglePoint } from "../types/globalTypes";

export function isMultiSeries(
  data: (SinglePoint | MultiPoint)[]
): data is MultiPoint[] {
  return Array.isArray(data[0][1]);
}
