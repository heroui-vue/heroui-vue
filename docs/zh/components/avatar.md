<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

# Avatar <sup><Chip class="tracking-wider" size="sm" color="secondary">更新</Chip></sup>

[HeroUI Avatar 文档](https://v2.heroui.com/docs/components/avatar)

Avatar 组件用于表示一个用户，并显示头像图片、姓名缩写或回退图标。

::: tip
当前版本同步至 `2.8.2`，因此文档中的示例可能与 HeroUI 最新 v2 版本不完全一致。
:::

## 安装

::: code-group
```sh [npm]
npm add @heroui-vue/avatar
```

```sh [pnpm]
pnpm add @heroui-vue/avatar
```

```sh [yarn]
yarn add @heroui-vue/avatar
```

```sh [bun]
bun add @heroui-vue/avatar
```
:::

> [!NOTE]
> 如果你使用的是[全局安装](/zh/guide/installation#global-installation)，可以跳过这一步。

## 导入

HeroUI Vue 当前导出 2 个头像相关组件：

- **Avatar**：用于展示单个头像的主组件。
- **AvatarGroup**：用于组合展示多个头像的容器组件。

HeroUI Vue 暂时没有独立导出 `AvatarIcon` 组件。你可以使用内置回退图标，或通过 `icon` 自定义。

::: code-group
```js [按需导入]
import { Avatar, AvatarGroup } from "@heroui-vue/avatar";
```

```js [全局导入]
import { Avatar, AvatarGroup } from "heroui-vue";
```
:::

## 用法

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-3 items-center">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar name="Junior" showFallback />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar name="Jane" showFallback />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar name="Joe" showFallback />
    </div>
</template>
:::

### 尺寸

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar class="w-6 h-6 text-tiny" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar class="w-20 h-20 text-large" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </div>
</template>
:::

### 禁用

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-3 items-center">
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isDisabled name="Junior" showFallback />
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isDisabled name="Jane" showFallback />
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isDisabled name="Joe" showFallback />
    </div>
</template>
:::

### 边框

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </div>
</template>
:::

### 圆角

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </div>
</template>
:::

### 颜色

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isBordered color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </div>
</template>
:::

### Avatar 回退内容

当头像 `src` 加载失败时，有 2 种回退方式：

- 如果传了 `name`，会根据名字生成缩写。
- 如果没有 `name`，会显示默认头像图标。

如果没有传 `showFallback`，则不会显示回退内容。

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar showFallback src="https://images.unsplash.com/broken" />
      <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
      <Avatar name="Joe" src="https://images.unsplash.com/broken" />
    </div>
</template>
:::

### 自定义回退内容

你也可以在 `src` 加载失败时提供自定义回退内容。

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
import { Camera } from '@heroui-vue/icon'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar showFallback src="https://images.unsplash.com/broken">
        <template #fallback>
            <Camera class="animate-pulse w-6 h-6 text-default-500" />
        </template>
      </Avatar>
      <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
      <Avatar name="Joe" src="https://images.unsplash.com/broken" />
    </div>
</template>
:::

### 自定义实现

如果你需要更底层地自定义 Avatar 行为，可以使用 `useAvatar` 组合式工具。

### 自定义姓名缩写逻辑

支持用 `getInitials` 自定义缩写逻辑。当前默认会从 `name` 中最多取前两个单词的首字母。

## Avatar Group

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered>
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### 组禁用

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered isDisabled>
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### 组最大数量

你可以通过 `max` 属性限制 `AvatarGroup` 显示的头像数量。

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered :max="3">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### 组总数量

你可以通过 `total` 属性控制不可见头像的数量。

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered :max="3" :total="10">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### 自定义计数

`AvatarGroup` 提供 `renderCount` 属性，用于在传入 `total` 时自定义计数内容。

::: sfc
<script setup>
import { Avatar, AvatarGroup } from '@heroui-vue/avatar'
</script>

<template>
  <AvatarGroup isBordered :max="3" :total="10" :render-count="renderCount">
    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    <template #renderCount="{ count }">
        <p class="text-small text-foreground font-medium ms-2">+{{ count }} others</p>
    </template>
  </AvatarGroup>
</template>

<style scoped>
p {
  all: revert-layer;
}
</style>
:::

### 网格布局

给 `AvatarGroup` 传入 `isGrid` 后，头像会以网格布局展示。

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered isGrid :max="7">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026707d" />
  <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
  <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
</AvatarGroup>
</template>
:::

### 组合自定义实现

如果你需要更底层地自定义头像组，可以使用 `useAvatarGroup` 组合式函数。`AvatarGroup` 内部会提供头像组上下文，供子 `Avatar` 消费。

## 插槽 <sup><Chip class="tracking-wider" size="sm" color="warning">已过时</Chip></sup>

:::warning
内容不具有参考性，以 `Avatar` 声明的slot类型为准
:::

- **base**：Avatar 外层容器，包含焦点环、定位和整体外观样式。
- **img**：Avatar 内的图片元素，包含透明度过渡和尺寸样式。
- **fallback**：图片加载失败或未提供时的回退内容容器。
- **name**：图片缺失/失败时显示的姓名缩写内容。
- **icon**：Avatar 回退状态下的图标容器。

### 自定义 Avatar 样式

你可以通过 `classNames` 自定义 Avatar 各个部位的样式。

::: sfc
<script setup>
import { Avatar } from "@heroui-vue/avatar";
import { AvatarIcon } from "@heroui-vue/icon";
</script>

<template>
  <Avatar
    showFallback
    :class-names="{
      base: 'bg-linear-to-br from-[#FFB457] to-[#FF705B]',
      icon: 'text-black/80',
    }"
  >
    <template #icon>
        <AvatarIcon />
    </template>
  </Avatar>
</template>
:::

## 数据属性

`Avatar` 在 `base` 元素上有这些数据属性：

- **data-hover**：头像处于 hover 状态时。
- **data-focus**：头像获得焦点时。
- **data-focus-visible**：键盘导航导致焦点可见时。

## API

### Avatar 属性

| 名称         | 类型                                                                          | 默认值      | 描述                                  |
| ------------ | ----------------------------------------------------------------------------- | ----------- | ------------------------------------- |
| src          | `string`                                                                      | -           | 要显示的图片地址。                    |
| color        | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | `"default"` | 设置头像背景色。                      |
| radius       | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                    | `"full"`    | 设置头像圆角。                        |
| size         | `"sm" \| "md" \| "lg"`                                                        | `"md"`      | 设置头像尺寸。                        |
| name         | `string`                                                                      | -           | 图片缺失或加载失败时显示姓名缩写。    |
| icon         | `any`                                                                         | -           | 在头像回退状态中显示自定义图标。      |
| fallback     | `any`                                                                         | -           | 图片加载失败时显示的自定义回退内容。  |
| isBordered   | `boolean`                                                                     | `false`     | 是否显示头像边框。                    |
| isDisabled   | `boolean`                                                                     | `false`     | 是否禁用头像并应用禁用样式。          |
| isFocusable  | `boolean`                                                                     | `false`     | 是否支持键盘聚焦。                    |
| showFallback | `boolean`                                                                     | `false`     | 图片加载失败时是否显示回退图标/缩写。 |
| imgProps     | `ImgHTMLAttributes`                                                           | -           | 透传给内部图片元素的属性。            |
| classNames   | `Partial<Record<"base" \| "img" \| "fallback" \| "name" \| "icon", string>>`  | -           | Avatar 各插槽的自定义类名。           |

### Avatar Group 属性

| 名称       | 类型                                                                          | 默认值  | 描述                     |
| ---------- | ----------------------------------------------------------------------------- | ------- | ------------------------ |
| max        | `number`                                                                      | `5`     | 可见头像的最大数量。     |
| total      | `number`                                                                      | -       | 控制不可见头像的数量。   |
| size       | `"sm" \| "md" \| "lg"`                                                        | -       | 设置组内头像的尺寸。     |
| color      | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | -       | 设置组内头像的颜色。     |
| radius     | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                    | -       | 设置组内头像的圆角。     |
| isGrid     | `boolean`                                                                     | `false` | 是否以网格布局展示头像。 |
| isDisabled | `boolean`                                                                     | -       | 是否禁用组内头像。       |
| isBordered | `boolean`                                                                     | -       | 组内头像是否显示边框。   |
| classNames | `Partial<Record<"base" \| "count", string>>`                                  | -       | 头像组插槽自定义类名。   |
