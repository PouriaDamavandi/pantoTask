import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import App from "../App";
import type { ChartEntry } from "../types/globalTypes";

const mockChartData: ChartEntry[] = [
  {
    title: "single series chart",
    data: [
      [0, 10],
      [1, 15],
      [2, null],
      [3, 20],
    ],
  },
  {
    title: "multi series chart",
    data: [
      [0, [10, 20, 30]],
      [1, [null, 25, 35]],
      [2, [15, null, 40]],
    ],
  },
];

describe("App", () => {
  beforeEach(() => {
    // Type-safe global fetch mock
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockChartData),
        } as Response)
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders chart titles correctly", async () => {
    // Mock the D3 components to avoid DOM operations
    vi.mock("../components/ChartWrapper", () => ({
      default: ({ title }: { title: string }) => <div>{title}</div>,
    }));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("single series chart")).toBeInTheDocument();
      expect(screen.getByText("multi series chart")).toBeInTheDocument();
    });
  });

  it("handles fetch errors gracefully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error")))
    );

    const originalError = console.error;
    console.error = vi.fn();

    render(<App />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Failed to load data:",
        expect.any(Error)
      );
    });

    console.error = originalError;
  });
});
