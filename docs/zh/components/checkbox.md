<script setup>
import { ref } from 'vue'
import { Checkbox } from '@heroui-vue/core/raw'

const isSelected = ref(false)
const customSelected = ref(true)
</script>

# Checkbox
Checkbox 用于从独立选项列表中选择多个项目，或将单个项目标记为选中。

## 安装
::: code-group
```sh [npm]
npm add @heroui-vue/checkbox
```
```sh [pnpm]
pnpm add @heroui-vue/checkbox
```
```sh [yarn]
yarn add @heroui-vue/checkbox
```
```sh [bun]
bun add @heroui-vue/checkbox
```
:::

> [!NOTE]
> 如果你使用[全局安装](/guide/installation#全局安装)的方式，可忽略此安装步骤

## 导入
::: code-group
```js [按需导入]
import { Checkbox } from '@heroui-vue/checkbox'
```
```js [全局导入]
import { Checkbox } from 'heroui-vue'
```
:::

## 使用

::: component-view
<Checkbox :defaultSelected="true">Option</Checkbox>
:::

### 禁用

::: component-view
<div class="flex gap-4">
  <Checkbox isDisabled>Option</Checkbox>
  <Checkbox :defaultSelected="true" isDisabled>Option</Checkbox>
</div>
:::

### 尺寸

::: component-view
<div class="flex gap-4">
  <Checkbox :defaultSelected="true" size="sm">Small</Checkbox>
  <Checkbox :defaultSelected="true" size="md">Medium</Checkbox>
  <Checkbox :defaultSelected="true" size="lg">Large</Checkbox>
</div>
:::

### 颜色

::: component-view
<div class="flex gap-4 flex-wrap">
  <Checkbox :defaultSelected="true" color="default">Default</Checkbox>
  <Checkbox :defaultSelected="true" color="primary">Primary</Checkbox>
  <Checkbox :defaultSelected="true" color="secondary">Secondary</Checkbox>
  <Checkbox :defaultSelected="true" color="success">Success</Checkbox>
  <Checkbox :defaultSelected="true" color="warning">Warning</Checkbox>
  <Checkbox :defaultSelected="true" color="danger">Danger</Checkbox>
</div>
:::

### 圆角

::: component-view
<div class="flex gap-4 flex-wrap">
  <Checkbox :defaultSelected="true" radius="full">Full</Checkbox>
  <Checkbox :defaultSelected="true" radius="lg">Large</Checkbox>
  <Checkbox :defaultSelected="true" radius="md">Medium</Checkbox>
  <Checkbox :defaultSelected="true" radius="sm">Small</Checkbox>
  <Checkbox :defaultSelected="true" radius="none">None</Checkbox>
</div>
:::

### 半选状态

`isIndeterminate` 属性会让 `Checkbox` 显示为半选状态，并在设置为 `false` 前持续保持该状态，不受用户交互影响。

::: component-view
<Checkbox isIndeterminate>Option</Checkbox>
:::

### 删除线

::: component-view
<Checkbox :defaultSelected="true" lineThrough>Option</Checkbox>
:::

### 自定义勾选图标

> HeroUI React 默认会给图标透传 `IconProps`。在 HeroUI Vue 中，请使用 `icon` 插槽自定义图标。

::: component-view
<div class="flex gap-4">
  <Checkbox :defaultSelected="true">
    <template #icon>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z" />
      </svg>
    </template>
    Option
  </Checkbox>
  <Checkbox :defaultSelected="true" color="warning">
    <template #icon>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <path d="M6 12H18" />
        <path d="M12 18V6" />
      </svg>
    </template>
    Option
  </Checkbox>
</div>
:::

### 受控

::: component-view
<div class="flex flex-col gap-2">
  <Checkbox v-model="isSelected">Subscribe (controlled)</Checkbox>
  <p class="text-default-500">Selected: {{ isSelected ? 'true' : 'false' }}</p>
</div>
:::

> **Note**: HeroUI Vue `Checkbox` 支持 `@change` 与 `@valueChange`，可用于表单集成。

## 插槽

- **base**：Checkbox 外层容器，负责对齐、布局和整体外观。
- **wrapper**：内部容器，处理相对定位、flex、overflow 以及 hover/selected 状态样式。
- **hiddenInput**：用于维护 checkbox 状态的隐藏 input。
- **icon**：复选框图标，控制尺寸、可见性与选中状态变化。
- **label**：Checkbox 文本。

### 自定义样式

你可以给不同插槽传入 Tailwind CSS 类来自定义 `Checkbox`。

::: component-view
<Checkbox
  v-model="customSelected"
  aria-label="custom checkbox"
  :classNames="{
    base: 'inline-flex w-full max-w-md bg-content1 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary',
    label: 'w-full',
  }"
>
  <div class="w-full flex justify-between gap-2">
    <div class="flex flex-col">
      <span class="font-medium">Junior Garcia</span>
      <span class="text-sm text-default-500">@jrgarciadev</span>
    </div>
    <div class="text-right">
      <div class="text-tiny text-default-500">Software Developer</div>
      <span class="text-success text-sm">Active</span>
    </div>
  </div>
</Checkbox>
:::

### 自定义实现

如果你需要更深度自定义，HeroUI React 提供 `useCheckbox`。HeroUI Vue 目前还未暴露该 Hook。

::: component-view
<label class="inline-flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer">
  <input type="checkbox" checked />
  <span>Enabled (native custom implementation)</span>
</label>
:::

> **Note**: 上游示例使用了 [Tailwind Variants](https://www.tailwind-variants.org/)。在 Vue 中可按你的类名方案实现。

## 数据属性

`Checkbox` 在 `base` 元素上具有以下属性：

- **data-selected**：选中时为真，基于 `isSelected`/`modelValue`。
- **data-pressed**：按下时为真。
- **data-invalid**：无效状态时为真，基于 `isInvalid`。
- **data-readonly**：只读状态时为真，基于 `isReadOnly`。
- **data-indeterminate**：半选状态时为真，基于 `isIndeterminate`。
- **data-hover**：悬停时为真。
- **data-disabled**：禁用状态时为真，基于 `isDisabled`。

## 无障碍

- 基于原生 HTML `<input>` 构建。
- 支持浏览器原生能力（如表单自动填充）。
- 提供统一的键盘焦点管理。
- 支持 `Tab` 与 `Space` 键盘交互。
- 支持辅助技术可读的 label 关联。
- 支持半选状态。

## API

### Checkbox 属性

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| children | `VNodeChild` | Checkbox 标签内容。 | `-` |
| icon | `CheckboxIconProps` | 上游 React 的属性。Vue 中请使用 `#icon` 插槽。 | `-` |
| value | `string \| number` | Checkbox 的表单值。 | `-` |
| name | `string` | Checkbox 的表单字段名。 | `-` |
| size | `sm \| md \| lg` | Checkbox 尺寸。 | `md` |
| color | `default \| primary \| secondary \| success \| warning \| danger` | Checkbox 颜色。 | `primary` |
| radius | `none \| sm \| md \| lg \| full` | Checkbox 圆角。 | `-` |
| lineThrough | `boolean` | 是否对标签应用删除线。 | `false` |
| isSelected | `boolean` | 受控选中状态。 | `-` |
| defaultSelected | `boolean` | 非受控初始选中状态。 | `-` |
| isRequired | `boolean` | 上游 React 属性，Vue 版暂未实现。 | `false` |
| isReadOnly | `boolean` | 是否只读（可选中但不可修改）。 | `-` |
| isDisabled | `boolean` | 是否禁用。 | `false` |
| isIndeterminate | `boolean` | 半选展示状态。 | `-` |
| isInvalid | `boolean` | 是否无效。 | `false` |
| validationState | `valid \| invalid` | 上游已废弃属性，建议使用 `isInvalid`。 | `-` |
| disableAnimation | `boolean` | 是否禁用动画。 | `false` |
| classNames | `Partial<Record<"base" \| "wrapper" \| "icon" \| "label", string>>` | 为各插槽设置自定义类名。 | `-` |

### Checkbox 事件

| 属性 | 类型 | 说明 | 默认值 |
| --- | --- | --- | --- |
| onChange | `(isSelected: boolean) => void` | 选中状态变化时触发。Vue 中使用 `@change`。 | `-` |
| onValueChange | `(isSelected: boolean) => void` | 选中状态变化时触发。Vue 中使用 `@valueChange`。 | `-` |

### 类型

#### Checkbox Icon Props

```ts
type IconProps = {
  "data-checked": string;
  isSelected: boolean;
  isIndeterminate: boolean;
  disableAnimation: boolean;
  className: string;
};

type CheckboxIconProps = ReactNode | ((props: IconProps) => ReactNode);
```

> HeroUI Vue 使用 `#icon` 插槽提供自定义图标。

###
