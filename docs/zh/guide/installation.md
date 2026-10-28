# 安装

快速安装配置并使用

## 全局安装

你可以在 `heroui-vue` 命名空间下使用所有组件。

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

HeroUI Vue内置了一个具有默认配置的 `@heroui/theme`，并导出了用于配置TailwindCSS的插件。

## 按需安装

你也可以仅安装你需要的组件，请参考每个组件的文档以了解如何安装。但使用按需安装前请确保你已经完成了[配置](#配置)。

## 配置

Heroui Vue默认支持TailwindCSS V4，且对V3也提供有限的支持。

::: tip

这里有一个[模板项目](https://github.com/heroui-vue/template-heroui-vue)，可以参考它是如何配置的。

:::

### TailwindCSS

可通过两种不同的方式来配置TailwindCSS，即**有** `tailwind.config.js` 文件和**无** `tailwind.config.js`文件。

#### 有tailwind.config.js文件

如果你更喜欢通过 `tailwind.config.js` 文件来配置TailwindCSS，可以这样配置：

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

::: details 使用 `tailwind.config.js` 的好处
通过 `tailwind.config.js` 文件来配置TailwindCSS有几个好处：

- 降低迁移成本。保留 `tailwind.config.js` 文件也可以使用TailwindCSS V4。
- 符合直觉。在不需要了解新版TailwindCSS配置细节的情况下，仍然可以按照以往的经验进行配置，但是有[一些限制](https://tailwindcss.com/docs/functions-and-directives#config-directive)。
- 兼容性。一些库可能还没有适配新版TailwindCSS，但是仍然可以在旧版本中使用，保留`tailwind.config.js`文件为未来留下了适配空间。
:::

#### 无tailwind.config.js文件

如果你的入口文件中包含了一个css导入，假设名称是`index.css`，则按如下配置:

```css
/* index.css */
@import "tailwindcss";
@source "./node_modules/heroui-vue/dist/index.js";
@plugin "heroui-vue/plugin";
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
