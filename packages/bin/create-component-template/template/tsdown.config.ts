import { defineConfig } from "tsdown";
import vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: "index.ts",
  plugins: [vue({ isProduction: true })],
  external: ["vue", "@heroui/theme"],
});
