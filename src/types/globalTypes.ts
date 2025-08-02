export type SinglePoint = [number, number | null];
export type MultiPoint = [number, (number | null)[]];

export type ChartEntry = {
  title: string;
  data: SinglePoint[] | MultiPoint[];
};
