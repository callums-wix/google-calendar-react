/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "@testing-library/jest-dom";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    // setupFiles: ["src/setuptest.js"],
  },
  plugins: [react()],
});
