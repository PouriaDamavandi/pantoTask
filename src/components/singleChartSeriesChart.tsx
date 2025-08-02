import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { SinglePoint } from "../types/globalTypes";

type SingleSeriesChartProps = {
  data: SinglePoint[];
};

export default function SingleSeriesChart({ data }: Readonly<SingleSeriesChartProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous render
    const container = ref.current;
    container.innerHTML = "";

    // Filter out null values
    const cleanData = data.filter(([, v]) => v !== null) as [number, number][];

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

    // Create scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(cleanData, (d) => d[0]) as [number, number])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(cleanData, (d) => d[1]) as [number, number])
      .nice()
      .range([height, 0]);

    // Draw line
    const line = d3
      .line<[number, number]>()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    svg
      .append("path")
      .datum(cleanData)
      .attr("fill", "none")
      .attr("stroke", "#1f77b4")
      .attr("stroke-width", 1.5)
      .attr("d", line);

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

  return <div ref={ref} className="single-series-chart" />;
}
