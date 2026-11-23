# Switch 开关

[HeroUI Switch 文档](https://v2.heroui.com/docs/components/switch)

Switch 用于表示开启和关闭两种状态，通常用于切换设置。

::: warning 当前实现状态
Vue 版本目前提供开关的外观和内容插槽，交互逻辑尚未完成。下方示例用于展示样式，不能作为可交互的表单开关使用。

当前隐藏输入框尚未设置 `type="checkbox"`、`role="switch"`，也未绑定选中状态和变更事件。`isSelected`、`defaultSelected`、表单属性及键盘切换尚未完整接入；请勿直接套用 React 版本的受控用法或无障碍能力说明。
:::

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
import { ref } from "vue"
import { Switch } from "@heroui-vue/switch";

const isSelected = ref(true);
</script>

<template>
  <Switch defaultSelected>
    <template #label>启用通知</template>
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
  <Switch isDisabled>
    <template #label>禁用开关</template>
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
    <Switch size="sm"><template #label>小号</template></Switch>
    <Switch size="md"><template #label>中号</template></Switch>
    <Switch size="lg"><template #label>大号</template></Switch>
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
    <Switch color="default"><template #label>Default</template></Switch>
    <Switch color="primary"><template #label>Primary</template></Switch>
    <Switch color="secondary"><template #label>Secondary</template></Switch>
    <Switch color="success"><template #label>Success</template></Switch>
    <Switch color="warning"><template #label>Warning</template></Switch>
    <Switch color="danger"><template #label>Danger</template></Switch>
  </div>
</template>
:::

### 滑块图标

通过 `thumbIcon` 作用域插槽自定义滑块内的图标。将插槽属性绑定到图标上，以保留主题提供的尺寸和样式。

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch size="lg">
    <template #thumbIcon="iconProps">
      <svg v-bind="iconProps" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
      </svg>
    </template>
    <template #label>外观设置</template>
  </Switch>
</template>
:::

### 两端图标

使用 `startContent` 和 `endContent` 命名插槽设置开关两端的图标，而不是传入 React 节点属性。

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch size="lg">
    <template #startContent="iconProps">
      <svg v-bind="iconProps" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
      </svg>
    </template>
    <template #endContent="iconProps">
      <svg v-bind="iconProps" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z" />
      </svg>
    </template>
    <template #label>主题</template>
  </Switch>
</template>
:::

## 样式插槽

通过 `classNames` 为各个部分设置 Tailwind CSS 类。这里的样式插槽与 Vue 内容插槽不同。

- **base**：最外层容器，默认渲染为 `label`。
- **wrapper**：包裹两端图标和滑块的轨道。
- **hiddenInput**：内部隐藏的输入框。
- **thumb**：圆形滑块。
- **label**：标签文本容器。
- **startContent**：开关起始位置的图标。
- **endContent**：开关末尾位置的图标。
- **thumbIcon**：滑块内的图标。

### 自定义样式

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch
    :classNames="{
      base: 'inline-flex max-w-md w-full flex-row-reverse justify-between gap-4 rounded-lg bg-content1 p-4 shadow-sm',
      wrapper: 'mr-0',
      label: 'text-small',
      thumb: 'shadow-md',
    }"
  >
    <template #label>
      <div class="flex flex-col gap-1">
        <span>营销邮件</span>
        <span class="text-tiny text-default-400">接收产品更新和活动信息。</span>
      </div>
    </template>
  </Switch>
</template>
:::

### 自定义实现

包中同时导出了 `useSwitch` 和 `UseSwitchProps`，可用于组合自己的组件。该 composable 提供 `baseProps`、`inputProps`、`wrapperProps`、`thumbProps`、`labelProps` 以及图标属性和渲染函数。

`useSwitch` 与 `Switch` 使用同一套未完成的交互逻辑，并不会额外提供状态同步、表单或键盘支持。

## Data 属性

以下属性设置在 `base` 元素上，值为布尔值。编写自定义选择器时请使用 `[data-selected=true]` 等值匹配方式，而不是仅判断属性是否存在。

| 属性                 | 当前行为                                            |
| -------------------- | --------------------------------------------------- |
| `data-selected`      | 内部选中状态；当前未完整同步输入框或 `isSelected`。 |
| `data-pressed`       | 容器的鼠标按压状态；禁用或只读时为 `false`。        |
| `data-readonly`      | 对应 `isReadOnly`。                                 |
| `data-hover`         | 容器的悬停状态。                                    |
| `data-focus`         | 容器的聚焦状态，尚未跟踪内部输入框焦点。            |
| `data-focus-visible` | 当前固定为 `false`。                                |
| `data-disabled`      | `isDisabled` 或 `isReadOnly` 为真时启用。           |

## 无障碍

当前版本尚未完成开关语义、输入框标签关联、键盘切换和焦点可见性支持。`label` 插槽只渲染可见文本，不代表已经具备完整的辅助技术支持。在这些能力完成前，请勿将此组件用于需要无障碍或表单交互的生产场景。

## API

### Switch Props

| 属性               | 类型                                                         | 默认值    | 说明                                               |
| ------------------ | ------------------------------------------------------------ | --------- | -------------------------------------------------- |
| `as`               | `string / Component`                                         | `label`   | 最外层元素或 Vue 组件。                            |
| `size`             | `sm / md / lg`                                               | `md`      | 开关尺寸。                                         |
| `color`            | `default / primary / secondary / success / warning / danger` | `primary` | 选中状态的主题色。                                 |
| `isDisabled`       | `boolean`                                                    | `—`       | 应用禁用样式；尚未绑定输入框的原生禁用状态。       |
| `isReadOnly`       | `boolean`                                                    | `false`   | 设置只读标记，同时应用禁用样式；尚未绑定到输入框。 |
| `disableAnimation` | `boolean`                                                    | `false`   | 禁用主题动画。                                     |
| `class`            | `string`                                                     | `—`       | 最外层容器的自定义类。                             |
| `classNames`       | `Partial<Record<ToggleSlots, string>>`                       | `—`       | 各样式插槽的自定义类。                             |

以下属性已在 `UseSwitchProps` 中声明，但尚未接入输入框行为：

| 属性                  | 类型      | 默认值  | 当前限制                                                |
| --------------------- | --------- | ------- | ------------------------------------------------------- |
| `isSelected`          | `boolean` | `—`     | 尚不支持受控状态。                                      |
| `defaultSelected`     | `boolean` | `false` | 仅初始化内部状态；挂载后可能被输入框的 `checked` 覆盖。 |
| `value`               | `string`  | `''`    | 尚未绑定到输入框。                                      |
| `name`                | `string`  | `—`     | 尚未绑定到输入框。                                      |
| `form`                | `string`  | `—`     | 尚未绑定到输入框。                                      |
| `autoFocus`           | `boolean` | `false` | 尚未实现自动聚焦。                                      |
| `excludeFromTabOrder` | `boolean` | `—`     | 尚未实现 Tab 顺序控制。                                 |

### Switch 内容插槽

| 插槽           | 作用域属性                         | 说明                 |
| -------------- | ---------------------------------- | -------------------- |
| `label`        | 无                                 | 可见的标签内容。     |
| `thumbIcon`    | `width, height, class, isSelected` | 滑块内的图标。       |
| `startContent` | `width, height, class`             | 开关起始位置的图标。 |
| `endContent`   | `width, height, class`             | 开关末尾位置的图标。 |

图标插槽提供的 `width` 和 `height` 均为 `1em`。当前 `thumbIcon` 插槽实际未传递 `data-checked`；请勿依赖类型声明中的该字段。`default` 插槽虽在类型中声明，但当前不会渲染，请使用 `#label`。

### Switch 事件与受控状态

当前未声明 `update:isSelected` 或 `valueChange` 事件，不支持 `v-model:isSelected`。透传的 `@change` 监听器会绑定到最外层容器，并非完整的状态变更 API；当前输入框也没有开关切换行为，因此此处不提供受控示例。
