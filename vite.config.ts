/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "@testing-library/jest-dom";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["setup_test.ts"],
    exclude: [
      "tests/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
