# Alert

[HeroUI Alert 文档](https://v2.heroui.com/docs/components/alert)

提供关于操作或事件的简洁反馈的临时通知

## 安装

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
> 如果你使用[全局安装](/zh/guide/installation#全局安装)的方式，可忽略此安装步骤

## 导入

::: code-group
```js [按需导入]
import { Alert } from "@heroui-vue/alert";
```

```js [全局导入]
import { Alert } from "heroui-vue";
```
:::

## 使用

::: sfc
<script setup>
import { Alert } from '@heroui-vue/alert'
</script>

<template>
    <Alert title="This is an alert" description="Thanks for subscribing to our newsletter!"/>
</template>
:::

### 颜色

Alert有6种颜色变体，用以传达不同的含义。

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

### 变体

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

### 自定义图标

默认情况下，Alert 组件会根据`color`属性显示相应的图标。你可以通过使用`icon`插槽提供自定义图标来覆盖这一行为。

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

### 不带图标

您可以通过将 `hideIcon` 属性设置为 `true` 来隐藏图标。

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

### 不带图标容器

您可以通过将 `hideIconWrapper` 属性设置为 `true` 来隐藏图标容器。

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
