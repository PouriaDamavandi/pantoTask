import { isMultiSeries } from "../utils/isMultiSeries";
import SingleSeriesChart from "./singleChartSeriesChart";
import MultiSeriesChart from "./multiChartSeriesChart";
import type { SinglePoint, MultiPoint } from "../types/globalTypes";

type ChartWrapperProps = {
  title: string;
  data: SinglePoint[] | MultiPoint[];
};

export default function ChartWrapper({
  title,
  data,
}: Readonly<ChartWrapperProps>) {
  const multi = isMultiSeries(data);
  return (
    <div style={{ margin: "2rem 0" }}>
      <h2>{title}</h2>
      {multi ? (
        <MultiSeriesChart data={data} />
      ) : (
        <SingleSeriesChart data={data} />
      )}
    </div>
  );
}
