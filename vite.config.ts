import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import createBanner from "create-banner";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";

const banner = createBanner();

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
      output: {
        banner,
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
