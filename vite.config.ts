import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "fissionui",
      fileName: "fissionui",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "commander",
        "chalk",
        "react/jsx-runtime",
        "@inquirer/prompts",
        "node:fs",
        "node:path",
        "node:url",
      ],
      output: {
        globals: {
          react: "react",
          "react-dom": "react-dom",
          "react/jsx-runtime": "react/jsx-runtime",
          "@inquirer/prompts": "@inquirer/prompts",
          commander: "commander",
          chalk: "chalk",
          fs: "node:fs",
          "node:path": "node:path",
          "node:url": "node:url",
        },
      },
    },
  },
});
