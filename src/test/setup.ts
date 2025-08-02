import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Mock D3.js since it requires a real DOM
vi.mock("d3", () => ({
  select: () => ({
    append: () => ({
      attr: () => ({
        append: () => ({
          attr: () => ({
            call: vi.fn(),
          }),
        }),
      }),
    }),
    html: vi.fn(),
  }),
  extent: vi.fn(),
  scaleLinear: () => ({
    domain: () => ({
      range: () => ({
        nice: vi.fn(),
      }),
    }),
  }),
  line: () => ({
    x: () => ({
      y: vi.fn(),
    }),
  }),
  axisBottom: vi.fn(),
  axisLeft: vi.fn(),
}));

afterEach(() => {
  cleanup();
});
