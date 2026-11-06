import { defineConfig, type UserConfig } from "tsdown";
import vue from "unplugin-vue/rolldown";

const config: UserConfig = defineConfig({
  entry: "src/index.ts",
  plugins: [vue({ isProduction: true })],
  deps: {
    neverBundle: ["vue", "@heroui/theme"],
  },
  dts: {
    vue: true,
    eager: true,
  },
});

export default config;
