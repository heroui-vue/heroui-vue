# Badge

[HeroUI Badge Docs](https://v2.heroui.com/docs/components/badge)

Badges are used as a small numerical value or status descriptor for UI elements.

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/badge
```

```sh [pnpm]
pnpm add @heroui-vue/badge
```

```sh [yarn]
yarn add @heroui-vue/badge
```

```sh [bun]
bun add @heroui-vue/badge
```
:::

> [!NOTE]
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import

::: code-group
```js [On-demand import]
import { Badge } from "@heroui-vue/badge";
```

```js [Global import]
import { Badge } from "heroui-vue";
```
:::

## Usage

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
</script>

<template>
  <Badge color="primary" content="5">
    <Avatar radius="md" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
  </Badge>
</template>
:::
