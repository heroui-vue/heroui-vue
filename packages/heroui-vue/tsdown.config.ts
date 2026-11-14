import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig[] = defineConfig([
  {
    entry: ["src/index.ts", "src/heroui.ts"],
    minify: true,
    deps: {
      neverBundle: ["vue"],
    },
  },
  // for CDN and static resources
  {
    entry: {
      heroui: "src/heroui.ts",
    },
    minify: true,
    platform: "browser",
    format: "iife",
    outDir: "dist/browser",
  },
]);

export default config;
