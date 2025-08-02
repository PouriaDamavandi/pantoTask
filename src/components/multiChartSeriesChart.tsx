import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { MultiPoint } from "../types/globalTypes";

const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c"]; // D3 category10 colors

type MultiSeriesChartProps = {
  data: MultiPoint[];
};

export default function MultiSeriesChart({
  data,
}: Readonly<MultiSeriesChartProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous render
    const container = ref.current;
    container.innerHTML = "";

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Process data
    const timestamps = data.map(([t]) => t);
    const allValues = data.flatMap(([, values]) =>
      values.filter((v) => v !== null)
    );

    // Create scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(timestamps) as [number, number])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(allValues) as [number, number])
      .nice()
      .range([height, 0]);

    // Draw lines for each series
    for (let i = 0; i < 3; i++) {
      const lineData = data
        .map(([t, values]) => [t, values[i]])
        .filter(([, v]) => v !== null) as [number, number][];

      const line = d3
        .line<[number, number]>()
        .x((d) => x(d[0]))
        .y((d) => y(d[1]));

      svg
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", COLORS[i])
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // Cleanup function
    return () => {
      container.innerHTML = "";
    };
  }, [data]);

  return <div ref={ref} className="multi-series-chart" />;
}
