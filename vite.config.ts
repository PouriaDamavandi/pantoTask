import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    deps: {
      inline: ["d3", "d3-array", "d3-scale", "d3-shape", "d3-axis"],
    },
    // Add this if you're using TypeScript
    typecheck: {
      checker: "tsc",
    },
  },
});
