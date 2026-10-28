# Installation

Quick installation configuration and usage

## Global Installation

You can use all components under the `heroui-vue` namespace.

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

HeroUI Vue has a built-in `@heroui/theme` with default configuration and exports plugins for configuring TailwindCSS.

## On-Demand Installation

You can also install only the components you need. Please refer to each component's documentation to learn how to install them. But make sure you have completed the [Configuration](#configuration) before using on-demand installation.

## Configuration

HeroUI Vue supports TailwindCSS V4 by default and also provides limited support for V3.

::: tip

Here is a [template project](https://github.com/heroui-vue/template-heroui-vue) you can refer to see how it's configured.

:::

### TailwindCSS

TailwindCSS can be configured in two different ways: **with** a `tailwind.config.js` file and **without** a `tailwind.config.js` file.

#### With tailwind.config.js file

If you prefer to configure TailwindCSS through a `tailwind.config.js` file, you can configure it like this:

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

::: details Benefits of using `tailwind.config.js`
Configuring TailwindCSS through a `tailwind.config.js` file has several benefits:

- Reduced migration cost. Keeping the `tailwind.config.js` file allows you to use TailwindCSS V4.
- Intuitive. No need to understand the configuration details of the new TailwindCSS, you can configure it completely based on past experience, but there are [some limitations](https://tailwindcss.com/docs/functions-and-directives#config-directive).
- Compatibility. Some libraries may not have adapted to the new version of TailwindCSS yet, but can still be used in the old version, and keeping the `tailwind.config.js` file reserves space for future adaptation.
:::

#### Without tailwind.config.js file

If your entry file contains a CSS import, assuming the name is `index.css`, configure it as follows:

```css
/* index.css */
@import "tailwindcss";
@source "./node_modules/heroui-vue/dist/index.js";
@plugin "heroui-vue/plugin";
@custom-variant dark (&:is(.dark *));
```

### Vite

If your project uses Vite, you need to install the official `@tailwindcss/vite` plugin and use it in your vite configuration file.

#### Install plugin

```sh
npm install @tailwindcss/vite // [!=npm auto]
```

#### Configure vite

```ts{3,6}
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```
