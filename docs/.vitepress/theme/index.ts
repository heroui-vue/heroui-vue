import DefaultTheme from "vitepress/theme";
import { enhanceAppWithComponentView } from "vitepress-plugin-sfc/client";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import type { Theme } from "vitepress";

import "vitepress-plugin-sfc/style";
import "./styles.css";
import "virtual:group-icons.css";

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    await enhanceAppWithComponentView(app, {
      disableRender: false,
      nativeIfNotRender: true,
    });
    enhanceAppWithTabs(app);
  },
} satisfies Theme;
