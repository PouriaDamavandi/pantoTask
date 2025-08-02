import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { type MultiPoint } from "../types/globalTypes";

type MultiSeriesChartProps = {
  data: MultiPoint[];
};

export default function MultiSeriesChart({
  data,
}: Readonly<MultiSeriesChartProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const colors = ["blue", "green", "red"];

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const outerWidth = 600;
    const outerHeight = 300;
    const width = outerWidth - margin.left - margin.right;
    const height = outerHeight - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .html("")
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const timestamps = data.map(([t]) => t);
    const x = d3
      .scaleLinear()
      .domain(d3.extent(timestamps) as [number, number])
      .range([0, width]);

    const flatValues = data.flatMap(([, arr]) => arr.filter((v) => v !== null));
    const y = d3
      .scaleLinear()
      .domain(d3.extent(flatValues) as [number, number])
      .nice()
      .range([height, 0]);

    for (let i = 0; i < 3; i++) {
      const lineData = data
        .map(([t, values]) => [t, values[i]])
        .filter(([, v]) => v !== null) as [number, number][];

      const lineGen = d3
        .line<[number, number]>()
        .x((d) => x(d[0]))
        .y((d) => y(d[1]));

      svg
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 1.5)
        .attr("d", lineGen);
    }

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));
  }, [data]);

  return <div ref={ref} />;
}
