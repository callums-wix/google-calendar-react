/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "@testing-library/jest-dom";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
<<<<<<< Updated upstream
    // setupFiles: ["src/setuptest.js"],
=======
    globals: true,
    setupFiles: ["setup_test.js"],
    exclude: [
      "tests/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
>>>>>>> Stashed changes
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
