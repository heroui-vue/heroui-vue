import { defineConfig } from "tsdown";
import vue from "unplugin-vue/rolldown";

export default defineConfig([
  {
    entry: ["src/index.ts", "src/heroui.ts"],
    plugins: [vue()],
    external: ["vue"],
    minify: true,
    dts: {
      vue: true,
      sourcemap: true,
      resolve: true,
    },
  },
  {
    entry: {
      heroui: "src/heroui.ts",
    },
    minify: false,
    platform: "browser",
    format: "iife",
    outDir: "dist/browser",
  },
]);
