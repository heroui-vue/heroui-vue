# Switch 开关

[HeroUI Switch 文档](https://v2.heroui.com/docs/components/switch)

Switch 用于表示开启和关闭两种状态，通常用于切换设置。

## 安装

::: code-group
```sh [npm]
npm add @heroui-vue/switch
```

```sh [pnpm]
pnpm add @heroui-vue/switch
```

```sh [yarn]
yarn add @heroui-vue/switch
```

```sh [bun]
bun add @heroui-vue/switch
```
:::

## 导入

```js
import { Switch } from "@heroui-vue/switch";
```

## 使用

使用 `label` 命名插槽设置标签。当前实现不会渲染默认插槽中的内容。

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch defaultSelected>
    启用通知
  </Switch>
</template>
:::

### 禁用

`isDisabled` 应用禁用样式，并关闭按压状态反馈。目前不会向内部输入框传递原生 `disabled` 属性。

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch isDisabled defaultSelected>
    禁用开关
  </Switch>
</template>
:::

### 尺寸

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Switch size="sm" defaultSelected>小号</Switch>
    <Switch size="md" defaultSelected>中号</Switch>
    <Switch size="lg" defaultSelected>大号</Switch>
  </div>
</template>
:::

### 颜色

`color` 设置选中状态的主题色。由于选中状态尚未接入，当前预览只展示未选中外观。

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Switch color="default" defaultSelected>Default</Switch>
    <Switch color="primary" defaultSelected>Primary</Switch>
    <Switch color="secondary" defaultSelected>Secondary</Switch>
    <Switch color="success" defaultSelected>Success</Switch>
    <Switch color="warning" defaultSelected>Warning</Switch>
    <Switch color="danger" defaultSelected>Danger</Switch>
  </div>
</template>
:::

### 滑块图标

通过 `thumbIcon` 作用域插槽自定义滑块内的图标。将插槽属性绑定到图标上，以保留主题提供的尺寸和样式。

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
import { SunIcon, MoonIcon } from "@heroui-vue/icon";
</script>

<template>
  <Switch defaultSelected color="secondary" size="lg">
    <template #thumbIcon="{ isSelected }">
      <component :is="isSelected ? SunIcon : MoonIcon" size="1em"></component>
    </template>
    Dark mode
  </Switch>
</template>

:::

### 两端图标

使用 `startContent` 和 `endContent` 命名插槽设置开关两端的图标，而不是传入 React 节点属性。

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
import { SunIcon, MoonIcon } from "@heroui-vue/icon";
</script>

<template>
  <Switch defaultSelected color="success" size="lg">
    <template #startContent>
      <SunIcon size="1em" />
    </template>
    <template #endContent>
      <MoonIcon size="1em" />
    </template>
    Dark mode
  </Switch>
</template>
:::

### 受控

:::sfc
<script setup>
import { ref } from "vue";
import { Switch } from "@heroui-vue/switch";

const isSelected = ref(true);
</script>

<template>
  <div class="flex flex-col gap-2">
    <Switch v-model="isSelected">
      Airplane mode
    </Switch>
    <p class="text-small text-default-500">Selected: {{ isSelected }}</p>
  </div>
</template>
:::

## 样式插槽

通过 `classNames` 为各个部分设置 Tailwind CSS 类。这里的样式插槽与 Vue 内容插槽不同。

- **base**：最外层容器，默认渲染为 `label`。
- **wrapper**：包裹两端图标和滑块的轨道。
- **hiddenInput**：内部隐藏的输入框。
- **thumb**：圆形滑块。
- **default**：标签文本容器。
- **startContent**：开关起始位置的图标。
- **endContent**：开关末尾位置的图标。
- **thumbIcon**：滑块内的图标。

### 自定义样式

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
import { cn } from "@heroui/theme";
</script>

<template>
  <Switch
    :classNames="{
      base: cn(
        'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
        'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
        'data-[selected=true]:border-primary',
      ),
      wrapper: 'p-0 h-4 overflow-visible',
      thumb: cn(
        'w-6 h-6 border-2 shadow-lg',
        'group-data-[hover=true]:border-primary',
        'group-data-[selected=true]:ms-6',
        'group-data-[pressed=true]:w-7',
        'group-data-pressed:group-data-selected:ms-4',
      ),
    }"
  >
    <div class="flex flex-col gap-1">
      <p class="text-medium">Enable early access</p>
      <p class="text-tiny text-default-400">Get access to new features before they are released.</p>
    </div>
  </Switch>
</template>
:::

### 自定义实现

包中同时导出了 `useSwitch` 和 `UseSwitchProps`，可用于组合自己的组件。该 composable 提供 `baseProps`、`inputProps`、`wrapperProps`、`thumbProps`、`labelProps` 以及图标属性和渲染函数。

`useSwitch` 与 `Switch` 使用同一套交互逻辑并提供状态同步，尚**不支持**表单或键盘。

## Data 属性

以下属性设置在 `base` 元素上。

| 属性                 | 当前行为                                          |
| -------------------- | ------------------------------------------------- |
| `data-selected`      | 内部选中状态；当前未完整同步输入框或 `isSelected` |
| `data-pressed`       | 容器的鼠标按压状态。                              |
| `data-readonly`      | 对应 `isReadOnly`                                 |
| `data-hover`         | 容器的悬停状态。                                  |
| `data-focus`         | 容器的聚焦状态，尚未跟踪内部输入框焦点。          |
| `data-focus-visible` | 默认不存在                                        |
| `data-disabled`      | `isDisabled` 或 `isReadOnly` 为`true`时启用       |

## 无障碍

尚不支持。

## API

请参考组件类型
