# Custom Installation

You can integrate with any theme through `@heroui-vue/core`.

## Installation

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

## Introduction

`@heroui-vue/core` is a headless Vue3 library designed with HeroUI as the target. It contains all current HeroUI Vue components. It does not include `@heroui/theme` by default, making it highly flexible and customizable. If you want to customize the HeroUI theme and use it in Vue, you can easily integrate it through this package.

## Example

Here's an example of integrating with `@heroui/theme` to achieve the same effect as `heroui-vue`.

### Dependencies

Install the necessary dependencies

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

### Configure TailwindCSS

Assuming your source code is in the `src` directory, create a `heroui.ts` file to export the HeroUI TailwindCSS plugin:

```ts
// src/heroui.ts
import { heroui } from "@heroui/theme";

export default heroui(); // Don't forget to call the `heroui` function
```

Then create a CSS file in the same directory (if you don't have one), let's say it's named `index.css`, import the plugin and configure TailwindCSS:

::: tip
You can also configure TailwindCSS in an existing CSS file, just make sure the file path is correct.
:::

```css
/* src/index.css */
@import "tailwindcss";
@source "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}";
@plugin "./heroui.ts";
@custom-variant dark (&:is(.dark *));
```

### Vite

If your project uses Vite, you need to install the official `@tailwindcss/vite` plugin and use it in your Vite configuration file.

#### Install the plugin

```sh
npm install @tailwindcss/vite // [!=npm auto]
```

#### Configure Vite

```ts{3,6}
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

## Difference from `heroui-vue`

In fact, `heroui-vue` is implemented based on `@heroui-vue/core`. The difference is that `heroui-vue` integrates `@heroui/theme` by default.
