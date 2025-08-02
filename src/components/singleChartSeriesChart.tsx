import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { type SinglePoint } from "../types/globalTypes";

type SingleSeriesChartProps = {
  data: SinglePoint[];
};

export default function SingleSeriesChart({
  data,
}: Readonly<SingleSeriesChartProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanData = data.filter(([, v]) => v !== null) as [number, number][];

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

    const x = d3
      .scaleLinear()
      .domain(d3.extent(cleanData, (d) => d[0]) as [number, number])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(cleanData, (d) => d[1]) as [number, number])
      .nice()
      .range([height, 0]);

    const lineGen = d3
      .line<[number, number]>()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    svg
      .append("path")
      .datum(cleanData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", lineGen);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));
  }, [data]);

  return <div ref={ref} />;
}
