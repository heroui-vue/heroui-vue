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
```js [Individual]
import { Badge } from "@heroui-vue/badge";
```

```js [Global]
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

### Sizes

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
</script>

<template>
  <div class="flex gap-3 items-center">
    <Badge color="primary" content="5" size="sm">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
    <Badge color="primary" content="5" size="md">
      <Avatar radius="md" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
    </Badge>
    <Badge color="primary" content="5" size="lg">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
    </Badge>
  </div>
</template>
:::

### Colors

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
</script>

<template>
  <div class="flex gap-3 items-center">
    <Badge color="default" content="5">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
    </Badge>
    <Badge color="primary" content="5">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
    <Badge color="secondary" content="5">
      <Avatar radius="md" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
    </Badge>
    <Badge color="success" content="5">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
    </Badge>
    <Badge color="warning" content="5">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </Badge>
    <Badge color="danger" content="5">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    </Badge>
  </div>
</template>
:::

### Variants

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
</script>

<template>
  <div class="flex gap-3 items-center">
    <Badge color="warning" content="5" variant="solid">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
    </Badge>
    <Badge color="warning" content="5" variant="flat">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
    <Badge color="warning" content="5" variant="faded">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </Badge>
    <Badge color="warning" content="5" variant="shadow">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
    </Badge>
  </div>
</template>
:::

### Placements

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
</script>

<template>
  <div class="flex gap-4 items-center">
    <Badge color="danger" content="5" placement="top-right">
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
    </Badge>
    <Badge color="danger" content="5" placement="bottom-right">
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
    <Badge color="danger" content="5" placement="top-left">
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </Badge>
    <Badge color="danger" content="5" placement="bottom-left">
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
    </Badge>
  </div>
</template>
:::

### Shapes

For a better positioning, you can use the `shape` property to define the shape of the badge.

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
</script>

<template>
  <div class="flex gap-4 items-center">
    <Badge color="danger" content="5" shape="rectangle">
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
    </Badge>
    <Badge color="danger" content="5" shape="circle">
      <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
  </div>
</template>
:::

### Badge Visibility

You can control the visibility of the badge by using the `isInvisible` property.

:::sfc
<script setup>
import { ref } from "vue";
import { Badge } from "@heroui-vue/badge";
import { NotificationIcon, Cart as CartIcon } from "@heroui-vue/icon";

const isInvisible = ref(true);
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-3">
      <Badge color="danger" content="5" :isInvisible="!isInvisible" shape="circle">
        <NotificationIcon class="fill-current" :size="30" />
      </Badge>
      <Badge color="danger" content="50" :isInvisible="!isInvisible" shape="circle">
        <CartIcon :size="30" />
      </Badge>
    </div>
    <label>
      Show badge
      <input v-model="isInvisible" type="checkbox" />
    </label>
  </div>
</template>
:::

### Content Examples

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
import { NotificationIcon, CheckIcon } from "@heroui-vue/icon";
</script>

<template>
  <div className="flex gap-5 items-center">
    <Badge color="danger" content="5">
      <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    </Badge>
    <Badge color="success" content="" placement="bottom-right" shape="circle">
      <Avatar radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
    <Badge color="danger" content="new" size="sm">
      <Avatar
        isBordered
        color="danger"
        radius="md"
        src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
      />
    </Badge>
    <Badge isOneChar color="success" placement="bottom-right">
      <Avatar
        isBordered
        color="success"
        radius="md"
        src="https://i.pravatar.cc/300?u=a042581f4e290267072"
      />
      <template #content>
        <CheckIcon />
      </template>
    </Badge>
    <Badge isOneChar color="danger" placement="top-right" shape="circle">
      <Avatar radius="full" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026704f" />
      <template #content>
        <NotificationIcon :size="12" />
      </template>
    </Badge>
  </div>
</template>
:::

### Disable Outline

By default, the badge has an outline, you can disable it by using the `:showOutline=false` property.

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Avatar } from "@heroui-vue/avatar";
</script>

<template>
  <div className="flex gap-4 items-center">
    <Badge color="danger" content="5" shape="rectangle" :showOutline="false">
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
    </Badge>
    <Badge color="danger" content="5" shape="circle" :showOutline="false">
      <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </Badge>
  </div>
</template>
:::

### Accessibility

It's not advisable to depend on the badge's content for accurate announcement.
Instead, consider supplying a comprehensive description, such as using `aria-label`.

:::sfc
<script setup>
import { Badge } from "@heroui-vue/badge";
import { Button } from "@heroui-vue/button";
import { NotificationIcon } from "@heroui-vue/icon";
</script>

<template>
  <Badge color="danger" content="99+" shape="circle">
    <Button isIconOnly aria-label="more than 99 notifications" radius="full" variant="light">
      <NotificationIcon :size="24" />
    </Button>
  </Badge>
</template>
:::

## Slots

The Badge component has two slots:

- **base**: The base slot for the badge, which is the container of the badge.

- **badge**: The main slot for the badge content, which is the content of the badge.

## API

:::warning
WIP
:::

### Badge Props

:::warning
WIP
:::
