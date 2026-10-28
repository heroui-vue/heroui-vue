# Installation

```bash
npm add @heroui-vue/button @heroui-org/theme
```

# Configuration

```ts
// tailwind.config.js
const { heroui } = require("@heroui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@heroui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
```

# Usage

```vue
<script lang="ts" setup>
import { Button } from "@heroui-vue/button";
</script>

<template>
  <Button>Click</Button>
</template>
```
