# Quick Start

## Global Installation

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

You can import all available components from the `heroui-vue` namespace.

HeroUI Vue includes `@heroui/theme` with default configuration. You still need to install `tailwindcss` and [configure Tailwind CSS](#tailwind-css).

## On-Demand Installation

Components can also be installed and used individually. For example, to install [Button](/en/components/button.html):

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

See the component documentation for more information.

## Configuration

HeroUI Vue uses Tailwind CSS v4 and also provides limited support for v3.

::: tip
See the [template project](https://github.com/heroui-vue/template-heroui-vue) for an example configuration.
:::

### Tailwind CSS

You can configure Tailwind CSS with a configuration file or through CSS imports.

#### Using a configuration file

Assuming you use `tailwind.config.js` to configure Tailwind CSS:

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

#### Importing through `.css`

Create an `index.css` file with the following content:

```css
/* index.css */
@import "tailwindcss";
@source "./node_modules/heroui-vue/dist/index.js";
@plugin "heroui-vue/plugin";
@custom-variant dark (&:is(.dark *));
```

Then import it from your entry file, for example `main.ts`:

```ts
// main.ts
import "index.css";
```

### Vite

We recommend starting with [Vite](https://vite.dev/). Other build tools are not guaranteed to work.

Install the `tailwindcss` plugin:

```bash
npm install @tailwindcss/vite
```

Then use it in your Vite configuration:

```ts{3,6}
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```
