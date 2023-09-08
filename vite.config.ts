/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["setup_test.ts"],
    exclude: [
      "tests/**",
    ],
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
