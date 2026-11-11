# Alert

[HeroUI Alert Docs](https://v2.heroui.com/docs/components/alert)

Temporary notifications that provide concise feedback about actions or events

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/alert
```

```sh [pnpm]
pnpm add @heroui-vue/alert
```

```sh [yarn]
yarn add @heroui-vue/alert
```

```sh [bun]
bun add @heroui-vue/alert
```
:::

> [!NOTE]
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import

::: code-group
```js [On-demand import]
import { Alert } from "@heroui-vue/alert";
```

```js [Global import]
import { Alert } from "heroui-vue";
```
:::

## Usage

::: sfc
<script setup>
import { Alert } from '@heroui-vue/alert'
</script>

<template>
    <Alert title="This is an alert" description="Thanks for subscribing to our newsletter!"/>
</template>
:::

### Colors

Alert has 6 color variants to convey different meanings.

::: sfc
<script setup>
import { Alert } from '@heroui-vue/alert'
</script>

<template>
    <div style="display: grid; row-gap: 1rem;">
      <Alert v-for="color in ['default', 'primary', 'secondary', 'success', 'warning', 'danger']" :key="color" :color :title="`This is a ${color} alert`" />
    </div>
</template>
:::

### Variants

::: sfc
<script setup>
import { Alert } from '@heroui-vue/alert'
</script>

<template>
    <div style="display: grid; row-gap: 1rem; margin-top: 1rem;">
      <Alert
       v-for="variant in ['solid', 'bordered', 'flat', 'faded']"
       :key="variant"
       :variant color="secondary"
       :title="`This is a ${variant} alert`" />
    </div>
</template>
:::

### Custom Icon

By default, the Alert component displays a corresponding icon based on the `color` prop. You can override this behavior by providing a custom icon using the `icon` slot.

::: sfc
<script setup>
import { Alert } from '@heroui-vue/alert'
import { AvatarIcon } from '@heroui-vue/icon'
</script>

<template>
    <Alert title="An alert with a custom icon">
      <template #icon>
          <AvatarIcon />
      </template>
    </Alert>
</template>
:::

### Without Icon

You can hide the icon by setting the `hideIcon` prop to `true`.

::: sfc
<script setup>
import { Alert } from '@heroui-vue/alert'
</script>

<template>
    <Alert
      hideIcon
      color="success"
      description="Thanks for subscribing to our newsletter!"
      title="This is an alert"
      variant="faded"
    />
</template>
:::

### Without Icon Wrapper

You can hide the icon wrapper by setting the `hideIconWrapper` prop to `true`.

::: sfc
<script setup>
import { Alert } from '@heroui-vue/alert'
</script>

<template>
    <Alert
      hideIconWrapper
      color="secondary"
      description="This is a bordered variant alert"
      title="Bordered Alert"
      variant="bordered"
    />
</template>
:::
