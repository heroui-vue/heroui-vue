# 快速开始

## 全局安装

::: code-group
```bash [npm]
npm install heroui-vue tailwindcss
```

```bash [pnpm]
pnpm install heroui-vue tailwindcss
```

```bash [yarn]
yarn install heroui-vue tailwindcss
```

```bash [bun]
bun install heroui-vue tailwindcss
```
:::

可以从 `heroui-vue` 命名空间下导入所有已有组件。

HeroUI Vue 内置了一个具有默认配置的 `@heroui/theme`，因此你还需要安装`tailwindcss`以及[配置TailwindCSS](#TailwindCSS)。

## 按需安装

组件可以独立安装使用。以组件 [Button](/zh/components/button.html) 为例：

::: code-group
```bash [npm]
npm install @heroui-vue/button
```

```bash [pnpm]
pnpm install @heroui-vue/button
```

```bash [yarn]
yarn install @heroui-vue/button
```

```bash [bun]
bun install @heroui-vue/button
```
:::

要了解更多，请参考组件文档。

## 配置

HeroUI Vue使用TailwindCSS V4，且对V3也提供有限的支持。

::: tip
这里有一个[模板项目](https://github.com/heroui-vue/template-heroui-vue)，可以参考它是如何配置的。
:::

### TailwindCSS

可以通过`TailwindCSS`配置文件或者`.css`导入的方式完成配置。

#### 使用配置文件

假设你使用 `tailwind.config.js` 配置TailwindCSS：

```js{2,6,7,8,9,10}
// tailwind.config.js
import herouiVue from 'heroui-vue/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/heroui-vue/dist/index.js"
  ],
  darkMode: 'class',
  plugins: [herouiVue]
}
```

#### 通过`.css`导入

创建一个`index.css`文件，然后写入:

```css
/* index.css */
@import "tailwindcss";
@source "./node_modules/heroui-vue/dist/index.js";
@plugin "heroui-vue/plugin";
@custom-variant dark (&:is(.dark *));
```

在入口文件中导入它，假设它是`main.ts`:

```ts
// main.ts
import "index.css";
```

### Vite

建议通过[Vite](https://cn.vite.dev/)开始，不保证其他构建工具的可用性。

安装`tailwindcss`插件

```bash
npm install @tailwindcss/vite
```

然后在Vite配置文件中使用它：

```ts{3,6}
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```
