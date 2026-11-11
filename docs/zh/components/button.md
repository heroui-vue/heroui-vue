# Button

[HeroUI Button Docs](https://v2.heroui.com/docs/components/button)

允许用户通过单次轻触执行操作和选择。

## 安装

::: code-group
```sh [npm]
npm add @heroui-vue/button
```

```sh [pnpm]
pnpm add @heroui-vue/button
```

```sh [yarn]
yarn add @heroui-vue/button
```

```sh [bun]
bun add @heroui-vue/button
```
:::

> [!NOTE]
> 如果你使用[全局安装](/zh/guide/installation#全局安装)的方式，可忽略此安装步骤

## 导入

::: code-group
```js [按需导入]
import { Button } from "@heroui-vue/button";
```

```js [全局导入]
import { Button } from "heroui-vue";
```
:::

## 使用

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <Button color="primary">Button</Button>
</template>
:::

### 禁用

按钮将无法点击

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <Button color="primary" isDisabled>Button</Button>
</template>
:::

### 大小

显示不同尺寸的按钮

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <div class="flex gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
    </div>
</template>
:::

### 半径

显示不同角度的按钮

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <div className="flex gap-4 items-center">
      <Button radius="full">Full</Button>
      <Button radius="lg">Large</Button>
      <Button radius="md">Medium</Button>
      <Button radius="sm">Small</Button>
      <Button radius="none">None</Button>
    </div>
</template>
:::

### 颜色

显示不同颜色的按钮

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <div class="flex flex-wrap gap-4 items-center">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
    </div>
</template>
:::

### 变体

显示不同种类的按钮

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <div className="flex flex-wrap gap-4 items-center">
      <Button color="primary" variant="solid">
        Solid
      </Button>
      <Button color="primary" variant="faded">
        Faded
      </Button>
      <Button color="primary" variant="bordered">
        Bordered
      </Button>
      <Button color="primary" variant="light">
        Light
      </Button>
      <Button color="primary" variant="flat">
        Flat
      </Button>
      <Button color="primary" variant="ghost">
        Ghost
      </Button>
      <Button color="primary" variant="shadow">
        Shadow
      </Button>
    </div>
</template>
:::

### 加载

传递 `isLoading` 属性以在按钮内显示 `Spinner` 组件。

:::warning
正在开发中
:::

你还可以通过将自定义组件传递给`spinner`插槽来自定义加载spinner。

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
import { Loading } from '@heroui-vue/icon'
</script>

<template>
    <Button color="secondary" isLoading>
      <template #spinner>
          <Loading />
      </template>
      Loading
    </Button>
</template>
:::

`spinner`插槽默认显示在按钮的开始位置，你也可以在按钮的结束位置显示自定义组件，通过指定`spinnerPlacement`来实现。

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
import { Loading } from '@heroui-vue/icon'
</script>

<template>
    <Button color="secondary" spinnerPlacement="end" isLoading>
      <template #spinner>
          <Loading />
      </template>
      Loading
    </Button>
</template>
:::

### 带图标

你可以通过传递`startContent`或`endContent`插槽来添加图标。

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
import { Camera, AvatarIcon } from '@heroui-vue/icon'
</script>

<template>
    <div className="flex gap-4 items-center">
      <Button color="success">
        <template #endContent>
            <Camera />
        </template>
        Take a photo
      </Button>
      <Button color="danger" variant="bordered">
        <template #startContent>
            <AvatarIcon />
        </template>
        Delete user
      </Button>
    </div>
</template>
:::

### 仅图标

你还可以通过将`isIconOnly`属性和所需的图标作为默认子元素传递来显示不带文本的按钮。

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
import { Camera, Heart } from '@heroui-vue/icon'
</script>

<template>
    <div className="flex gap-4 items-center">
        <Button isIconOnly aria-label="Like" color="danger">
            <Heart />
        </Button>
        <Button isIconOnly aria-label="Take a photo" color="warning" variant="faded">
            <Camera />
        </Button>
    </div>
</template>
:::

### 自定义样式

你可以通过将自定义 Tailwind CSS 类传递给组件槽来自定义 Button 组件。

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <Button class="bg-gradient-to-tr from-pink-500 to-yellow-500 bg-sky-500 text-white shadow-lg" radius="full">
        Button
    </Button>
</template>
:::

### 禁用Ripple

按钮按下时将不会出现涟漪效果

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <Button disableRipple>
      Button
    </Button>
</template>
:::

### 禁用动画

按钮按下时将不会出现动画效果

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <Button disableAnimation>
      Button
    </Button>
</template>
:::

## 数据属性

`Button` 在 `base` 元素上具有以下属性：

- **data-hover**:
  当按钮被悬停时。基于 [useElementHover](https://vueuse.org/core/useElementHover/#useelementhover)
- **data-focus**:
  当按钮被聚焦时。基于 [useFocus](https://vueuse.org/core/useFocus/#usefocus)。
- **data-focus-visible**: 目前尚不支持，默认为 `false`。
- **data-disabled**:
  当按钮被禁用时。基于 `isDisabled` 属性。
- **data-pressed**:
  当按钮被按下时。基于 [useMousePressed](https://vueuse.org/core/useMousePressed/#usemousepressed)
- **data-loading**:
  当按钮正在加载时。基于 `isLoading` 属性。

## 无障碍访问

:::info
某些功能可能不够完善，如果你发现任何问题，请提交 issue
:::

- Button 具有 `button` 角色（目前尚不支持，计划支持）。
- 支持 <Kbd>Space</Kbd> 和 <Kbd>Enter</Kbd> 键的键盘事件。
- 鼠标和触摸事件处理，以及按下状态管理。
- 键盘焦点管理和跨浏览器标准化。

:heart:来自 HeroUI：我们推荐阅读这篇[博客文章](https://react-spectrum.adobe.com/blog/building-a-button-part-1.html)，了解构建在各种设备和交互方法下都能良好工作的按钮的复杂性。

## API

### Button 属性

| 名称             | 类型                                                                           | 默认值      | 描述                             |
| ---------------- | ------------------------------------------------------------------------------ | ----------- | -------------------------------- |
| variant          | `"solid" \| "bordered" \| "light" \| "flat" \| "faded" \| "shadow" \| "ghost"` | `"solid"`   | 按钮外观样式。                   |
| color            | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"`  | `"default"` | 按钮颜色主题。                   |
| size             | `"sm" \| "md" \| "lg"`                                                         | `"md"`      | 按钮大小                         |
| radius           | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                     | `"md"`      | 按钮边框圆角。                   |
| spinnerPlacement | `"start" \| "end"`                                                             | `"start"`   | 加载器位置。                     |
| fullWidth        | `boolean`                                                                      | `false`     | 按钮是否应占据其父元素的全宽。   |
| isIconOnly       | `boolean`                                                                      | `false`     | 按钮是否应具有相同的宽度和高度。 |
| isDisabled       | `boolean`                                                                      | `false`     | 按钮是否被禁用。                 |
| isLoading        | `boolean`                                                                      | `false`     | 按钮是否正在加载。               |
| disableRipple    | `boolean`                                                                      | `false`     | 按钮是否应在按下时显示涟漪效果。 |
| disableAnimation | `boolean`                                                                      | `false`     | 按钮是否应显示动画。             |

### Button 插槽

| 名称         | 作用域 | 描述           |
| ------------ | ------ | -------------- |
| default      | -      | 默认插槽。     |
| startContent | -      | 开始内容插槽。 |
| endContent   | -      | 结束内容插槽。 |
| spinner      | -      | 加载器插槽。   |

### Button 事件 (开发中)

| 名称        | 类型                           | 默认值 |
| ----------- | ------------------------------ | ------ |
| press       | `(e: PressEvent) => void`      | -      |
| pressStart  | `(e: PressEvent) => void`      | -      |
| pressEnd    | `(e: PressEvent) => void`      | -      |
| pressChange | `(isPressed: boolean) => void` | -      |
| pressUp     | `(e: PressEvent) => void`      | -      |
| keyDown     | `(e: KeyboardEvent) => void`   | -      |
| keyUp       | `(e: KeyboardEvent) => void`   | -      |
