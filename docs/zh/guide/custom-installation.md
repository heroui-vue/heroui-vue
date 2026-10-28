# 自定义安装

你可以通过 `@heroui-vue/core` 来与任意主题进行集成。

## 安装

::: code-group
```bash [pnpm]
pnpm install @heroui-vue/core
```

```bash [npm]
npm install @heroui-vue/core
```

```bash [yarn]
yarn install @heroui-vue/core
```

```bash [bun]
bun install @heroui-vue/core
```
:::

## 介绍

`@heroui-vue/core` 是一个以HeroUI为设计目标的无头Vue3库。它包含了目前所有HeroUI Vue组件。它并不内置`@heroui/theme`，因此具有高度的灵活性和可定制性。假设你想自定义HeroUI主题并在Vue中使用，你可以通过此包轻松完成集成。

## 举例

这里以集成 `@heroui/theme` 举例来实现 `heroui-vue` 相同的效果。

### 依赖

安装必要依赖

::: code-group
```bash [pnpm]
pnpm install tailwindcss @heroui/theme
```

```bash [npm]
npm install tailwindcss @heroui/theme
```

```bash [yarn]
yarn install tailwindcss @heroui/theme
```

```bash [bun]
bun install tailwindcss @heroui/theme
```
:::

### 配置TailwindCSS

假设源代码在`src`目录下，创建一个`heroui.ts`文件，用来导出HeroUI的TailwindCSS插件:

```ts
// src/heroui.ts
import { heroui } from "@heroui/theme";

export default heroui(); // 别忘记调用`heroui`函数
```

然后在同级目录下创建一个css文件（如果没有），假设名称是`index.css`，导入插件并且配置TailwindCSS:

::: tip
你也可以在已有的css文件中配置TailwindCSS，同时确保文件路径正确。
:::

```css
/* src/index.css */
@import "tailwindcss";
@source "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}";
@plugin "./heroui.ts";
@custom-variant dark (&:is(.dark *));
```

### Vite

如果你的项目使用Vite，需要安装官方的`@tailwindcss/vite`插件，然后在你的vite配置文件使用它。

#### 安装插件

```sh
npm install @tailwindcss/vite // [!=npm auto]
```

#### 配置vite

```ts{3,6}
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

## 与 `heroui-vue` 的区别

实际上，`heroui-vue` 正是基于 `@heroui-vue/core` 实现的，区别是 `heroui-vue` 默认集成了 `@heroui/theme`。
