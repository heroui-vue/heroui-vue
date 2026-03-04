import { defineConfig } from "tsdown";
import vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: "index.ts",
  plugins: [vue()],
  external: ["vue", "@heroui/theme"],
  dts: {
    vue: true,
  },
});
