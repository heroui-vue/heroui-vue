import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
  entry: "src/index.ts",
  deps: {
    neverBundle: ["vue", "@heroui/theme"],
  },
  dts: true,
});

export default config;
