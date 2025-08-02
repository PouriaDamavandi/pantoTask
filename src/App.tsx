import { useEffect, useState } from "react";
import { type ChartEntry } from "./types/globalTypes";
import ChartWrapper from "./components/chartWrapper";
import "./App.css";

function App() {
  const [charts, setCharts] = useState<ChartEntry[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((json: ChartEntry[]) => setCharts(json))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  return (
    <div className="container">
      {charts.map((c, i) => (
        <ChartWrapper key={i} title={c.title} data={c.data} />
      ))}
    </div>
  );
}
export default App;
