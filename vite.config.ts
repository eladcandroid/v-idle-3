import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/index.ts",
      name: pkg.scope,
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          format: "esm",
          globals: {
            vue: "Vue",
          },
          paths: {
            vue: "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
          },
        },
        {
          format: "es",
          globals: {
            vue: "Vue",
          },
        },
        {
          format: "cjs",
          globals: {
            vue: "Vue",
          },
        },
        {
          format: "umd",
          globals: {
            vue: "Vue",
          },
        },
      ],
    },
  },
});
