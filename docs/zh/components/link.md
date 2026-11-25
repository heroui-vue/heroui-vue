# Link

[HeroUI Link Docs](https://v2.heroui.com/docs/components/link)

链接允许用户在页面之间导航。此组件具有超链接样式，默认使用语义化的 `<a>` 元素渲染。

## 安装

::: code-group
```sh [npm]
npm add @heroui-vue/link
```

```sh [pnpm]
pnpm add @heroui-vue/link
```

```sh [yarn]
yarn add @heroui-vue/link
```

```sh [bun]
bun add @heroui-vue/link
```

:::

> [!NOTE]
> 使用[全局安装](/zh/guide/installation#global-installation)时可跳过此步骤。

## 导入

::: code-group
```js [Individual]
import { Link } from "@heroui-vue/link";
```

```js [Global]
import { Link } from "heroui-vue";
```
:::

## 用法

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Link href="#">Default Link</Link>
</template>
:::

### 禁用

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Link isDisabled href="#">
    Disabled Link
  </Link>
</template>
:::

### 尺寸

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link href="#" size="sm">
      Small
    </Link>
    <Link href="#" size="md">
      Medium
    </Link>
    <Link href="#" size="lg">
      Large
    </Link>
  </div>
</template>
:::

### 颜色

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link color="foreground" href="#">
      Foreground
    </Link>
    <Link color="primary" href="#">
      Primary
    </Link>
    <Link color="secondary" href="#">
      Secondary
    </Link>
    <Link color="success" href="#">
      Success
    </Link>
    <Link color="warning" href="#">
      Warning
    </Link>
    <Link color="danger" href="#">
      Danger
    </Link>
  </div>
</template>
:::

### 下划线

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link href="#" underline="none">
      None
    </Link>
    <Link href="#" underline="hover">
      Hover
    </Link>
    <Link href="#" underline="always">
      Always
    </Link>
    <Link href="#" underline="active">
      Active
    </Link>
    <Link href="#" underline="focus">
      Focus
    </Link>
  </div>
</template>
:::

### 外部链接

传入 `isExternal` 后，链接默认带有 `target="_blank"` 和 `rel="noopener noreferrer"` 属性。

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link isExternal href="https://github.com/heroui-inc/heroui">
      External Link
    </Link>
    <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
      External Link Anchor
    </Link>
  </div>
</template>
:::

### 自定义链接图标

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
    Custom Icon
    <template #anchorIcon>
<svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"
        fill="currentColor"
      />
      <path
        d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"
        fill="currentColor"
      />
    </svg>
    </template>
  </Link>
</template>
:::

### 块级链接

传入 `isBlock` 后，链接带有块状背景及悬停效果。

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-2">
    <Link isBlock showAnchorIcon color="foreground" href="#">
      Foreground
    </Link>
    <Link isBlock showAnchorIcon color="primary" href="#">
      Primary
    </Link>
    <Link isBlock showAnchorIcon color="secondary" href="#">
      Secondary
    </Link>
    <Link isBlock showAnchorIcon color="success" href="#">
      Success
    </Link>
    <Link isBlock showAnchorIcon color="warning" href="#">
      Warning
    </Link>
    <Link isBlock showAnchorIcon color="danger" href="#">
      Danger
    </Link>
  </div>
</template>
:::

### 多态组件

通过 `as` 属性可以自定义用于渲染链接的 HTML 元素或 Vue 组件。

:::sfc
<script setup>
import { Button } from "@heroui-vue/button";
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Button
    showAnchorIcon
    :as="Link"
    color="primary"
    href="https://github.com/heroui-inc/heroui"
    variant="solid"
  >
    Button Link
  </Button>
</template>
:::

### 路由

可直接使用原生 `href` 链接，也可以通过 `as` 传入 Vue 路由链接组件，并传递其路由属性（例如 `to`）。路由需要在应用中配置。

```vue
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Link href="/home">Home</Link>
  <Link href="/about">About</Link>
</template>
```

### 自定义实现

使用 `useLink` 组合式函数创建自己的链接组件。

```vue
<script setup lang="ts">
import { mergeProps, ref, useAttrs } from "vue";
import { useLink, type UseLinkProps } from "@heroui-vue/link";
import { LinkIcon } from "@heroui-vue/icon";
import { linkAnchorClasses } from "@heroui/theme";

defineOptions({ inheritAttrs: false });
const props = defineProps<UseLinkProps>();
const attrs = useAttrs();
const el = ref<HTMLElement | null>(null);
const { as, linkProps, showAnchorIcon } = useLink(props, el);
</script>

<template>
  <component :is="as" ref="el" v-bind="mergeProps(attrs, { ...linkProps })">
    <slot />
    <slot v-if="showAnchorIcon" name="anchorIcon">
      <LinkIcon :class="linkAnchorClasses" />
    </slot>
  </component>
</template>
```

## 数据属性

`Link` 在根元素上提供以下属性：

- **data-focus**: 链接获得焦点时存在。
- **data-focus-visible**: 链接显示键盘焦点环时存在。
- **data-disabled**: `isDisabled` 为 true 时存在。

## 无障碍

- 支持鼠标、触摸和键盘交互。
- 支持使用 `<a>` 元素导航，或通过 ARIA 为自定义元素提供链接语义。
- 支持禁用链接。
- 键盘用户可按 **Enter** 激活链接。

## API

### Link 属性

`anchorIcon` 对应 Vue 具名插槽。事件处理器接收原生 DOM 事件或 `LinkPressEvent`（包含 `type`、`pointerType`、`target`、修饰键、`x`、`y`），而非 React 事件。

| 属性               | 类型                                                            | 默认值     | 说明                                          |
| ------------------ | --------------------------------------------------------------- | ---------- | --------------------------------------------- |
| `size`             | `sm / md / lg`                                                  | `md`       | 链接尺寸。                                    |
| `color`            | `foreground / primary / secondary / success / warning / danger` | `primary`  | 链接颜色。                                    |
| `underline`        | `none / hover / always / active / focus`                        | `none`     | 下划线样式。                                  |
| `href`             | `string`                                                        | `—`        | 目标 URL。                                    |
| `target`           | `HTMLAttributeAnchorTarget`                                     | `—`        | 打开链接的目标窗口。                          |
| `rel`              | `string`                                                        | `—`        | 当前页面与链接资源的关系。                    |
| `download`         | `boolean / string`                                              | `—`        | 下载链接资源，可指定文件名。                  |
| `ping`             | `string`                                                        | `—`        | 跟随链接时通知的 URL，以空格分隔。            |
| `referrerPolicy`   | `HTMLAttributeReferrerPolicy`                                   | `—`        | 跟随链接时的来源信息策略。                    |
| `isExternal`       | `boolean`                                                       | `false`    | 默认在新标签页打开；显式 target 和 rel 优先。 |
| `showAnchorIcon`   | `boolean`                                                       | `false`    | 显示链接图标。                                |
| `anchorIcon`       | `slot`                                                          | `LinkIcon` | 自定义链接图标的具名插槽。                    |
| `isBlock`          | `boolean`                                                       | `false`    | 启用块状悬停效果。                            |
| `isDisabled`       | `boolean`                                                       | `false`    | 禁用导航及激活行为。                          |
| `disableAnimation` | `boolean`                                                       | `false`    | 禁用链接及块状背景动画。                      |

### Link 事件

| 事件           | 类型                              | 说明                                                |
| -------------- | --------------------------------- | --------------------------------------------------- |
| `@press`       | `(event: LinkPressEvent) => void` | 在目标上释放按压时触发。                            |
| `@pressStart`  | `(event: LinkPressEvent) => void` | 开始按压时触发。                                    |
| `@pressEnd`    | `(event: LinkPressEvent) => void` | 按压结束或移出目标时触发。                          |
| `@pressChange` | `(event: boolean) => void`        | 按压状态变化时触发。                                |
| `@pressUp`     | `(event: LinkPressEvent) => void` | 在目标上释放按压时触发。                            |
| `@keydown`     | `(event: KeyboardEvent) => void`  | 按下键盘按键时触发。                                |
| `@keyup`       | `(event: KeyboardEvent) => void`  | 释放键盘按键时触发。                                |
| `@click`       | `(event: MouseEvent) => void`     | 原生点击事件；跨输入设备的激活行为推荐使用 @press。 |
