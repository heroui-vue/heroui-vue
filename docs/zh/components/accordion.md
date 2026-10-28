<script setup>
import { ref } from 'vue'
import { Accordion, AccordionItem, Avatar } from '@heroui-vue/core/raw'

const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const selectedKey = ref('1')
</script>

# Accordion

Accordion 用于展示可展开/折叠的高层级信息列表。

## 安装

::: code-group
```sh [npm]
npm add @heroui-vue/accordion
```

```sh [pnpm]
pnpm add @heroui-vue/accordion
```

```sh [yarn]
yarn add @heroui-vue/accordion
```

```sh [bun]
bun add @heroui-vue/accordion
```
:::

> [!NOTE]
> 如果你使用[全局安装](/guide/installation#全局安装)的方式，可忽略此安装步骤

## 导入

HeroUI 提供 2 个 Accordion 相关组件：

- **Accordion**：用于渲染一组折叠项。
- **AccordionItem**：用于渲染单个折叠项。

::: code-group
```js [按需导入]
import { Accordion, AccordionItem } from "@heroui-vue/accordion";
```

```js [全局导入]
import { Accordion, AccordionItem } from "heroui-vue";
```
:::

## 使用

::: component-view
<Accordion>
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 带副标题

::: component-view
<Accordion>
  <AccordionItem itemKey="1" title="Accordion 1" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <template #subtitle>
      <span>Press to expand <strong>key 2</strong></span>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 展开多个项目

当 `selectionMode` 设置为 `multiple` 时，`Accordion` 可同时展开多个项目。

::: component-view
<Accordion selectionMode="multiple">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 紧凑模式

当 `isCompact` 设置为 `true` 时，`Accordion` 会使用更紧凑的样式。

::: component-view
<Accordion isCompact>
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 变体

Accordion 提供 4 种变体：`light`、`shadow`、`bordered`、`splitted`。

#### Light variant

::: component-view
<Accordion variant="light">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

#### Shadow variant

::: component-view
<Accordion variant="shadow">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

#### Bordered variant

::: component-view
<Accordion variant="bordered">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

#### Splitted variant

::: component-view
<Accordion variant="splitted">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 默认展开键

如需默认展开某些项目，可将 `defaultExpandedKeys` 设为键数组。

::: component-view
<Accordion :defaultExpandedKeys="['2']">
  <AccordionItem itemKey="1" title="Accordion 1" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 禁用键

如需禁用某些项目，可将 `disabledKeys` 设为键数组。

::: component-view
<Accordion :disabledKeys="['2']">
  <AccordionItem itemKey="1" title="Accordion 1" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 前置内容

如果你希望在折叠项前展示内容，可使用 `startContent`。

::: component-view
<Accordion selectionMode="multiple">
  <AccordionItem itemKey="1" title="Chung Miller" subtitle="4 unread messages">
    <template #startContent>
      <Avatar isBordered color="primary" radius="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="2" title="Janelle Lenard" subtitle="3 incompleted steps">
    <template #startContent>
      <Avatar isBordered color="success" radius="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="3" title="Zoey Lang">
    <template #startContent>
      <Avatar isBordered color="warning" radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
    </template>
    <template #subtitle>
      <p class="flex">2 issues to <span class="text-primary ml-1">fix now</span></p>
    </template>
    {{ defaultContent }}
  </AccordionItem>
</Accordion>
:::

### 自定义指示器

AccordionItem 有 `indicator` 属性，你可以自定义展开/收起指示器。

::: component-view
<Accordion>
  <AccordionItem itemKey="anchor" title="Anchor">
    <template #indicator>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8.4 11.3a3 3 0 0 1 4.2 0l.7.7 1.4-1.4-.7-.7a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 0 7.1 5 5 0 0 0 7.1 0l.7-.7-1.4-1.4-.7.7a3 3 0 1 1-4.2-4.2l2.1-2.2Z"/><path d="M12 4.9 11.3 5.6l1.4 1.4.7-.7a3 3 0 1 1 4.2 4.2l-2.1 2.1a3 3 0 0 1-4.2 0l-.7-.7-1.4 1.4.7.7a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0 0-7.1 5 5 0 0 0-7.1 0Z"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="moon" title="Moon">
    <template #indicator>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="sun" title="Sun">
    <template #indicator>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
</Accordion>
:::

指示器也可以用 `function` 实现，函数可接收 `isOpen`、`isDisabled` 与默认 `indicator`。

::: component-view
<Accordion :defaultExpandedKeys="['theme']">
  <AccordionItem itemKey="theme" title="Theme">
    <template #indicator="{ isOpen }">
      <svg v-if="isOpen" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="anchor" title="Anchor">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="sun" title="Sun">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### 自定义动画

Accordion 提供 `motionProps` 可用于定制 `enter` / `exit` 动画。

::: component-view
<Accordion>
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

> 你可以在 [Framer Motion variants](https://www.framer.com/motion/animation/#variants) 查看更多动画配置。
>
> **Vue 提示**：HeroUI Vue 目前尚未实现 `motionProps`。

### 受控

Accordion 是受控组件，你需要自行控制 `selectedKeys`。

::: component-view
<Accordion v-model="selectedKey">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

## Accordion Item 插槽

- **base**：折叠项外层容器。
- **heading**：折叠项标题容器，包含 `indicator` 与 `title`。
- **trigger**：控制展开/收起的按钮。
- **titleWrapper**：`title` 与 `subtitle` 的包裹层。
- **title**：折叠项标题。
- **subtitle**：折叠项副标题。
- **startContent**：折叠项前置内容。
- **indicator**：展开/收起状态指示元素。
- **content**：折叠项内容。

### 自定义 Accordion 样式

你可以通过以下属性自定义 Accordion 与 AccordionItem：

- `className`：Accordion 容器类名。(Accordion)
- `itemClasses`：统一设置全部 AccordionItem 插槽类名。(Accordion)
- `classNames`：单独设置某个 AccordionItem 的插槽类名。(AccordionItem)

示例：

::: component-view
<Accordion
className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
:itemClasses="{
base: 'py-0 w-full',
title: 'font-normal text-medium',
trigger: 'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
indicator: 'text-medium',
content: 'text-small px-2',
}"
variant="shadow"

>

  <AccordionItem itemKey="1" title="Connected devices">
    <template #startContent><span class="text-primary">◉</span></template>
    <template #subtitle><p class="flex">2 issues to <span class="text-primary ml-1">fix now</span></p></template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="2" title="Apps Permissions" subtitle="3 apps have read permissions">
    <template #startContent><span>▣</span></template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="3" title="Pending tasks" subtitle="Complete your profile" :classNames="{ subtitle: 'text-warning' }">
    <template #startContent><span class="text-warning">●</span></template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="4" :classNames="{ subtitle: 'text-danger' }">
    <template #title><p class="flex gap-1 items-center">Card expired <span class="text-default-400 text-small">*4812</span></p></template>
    <template #subtitle>Please, update now</template>
    <template #startContent><span class="text-danger">◆</span></template>
    {{ defaultContent }}
  </AccordionItem>
</Accordion>
:::

## 数据属性

`AccordionItem` 在 `base` 元素上包含以下属性：

- **data-open**：当前是否展开。
- **data-disabled**：当前是否禁用。
- **data-hover**：当前是否悬停。
- **data-focus**：当前是否聚焦。
- **data-focus-visible**：当前是否为键盘可见焦点。
- **data-disabled**：是否禁用（基于 `isDisabled`）。
- **data-pressed**：当前是否按压。

## 无障碍

- 支持 `Space`、`Enter`、`Arrow Up`、`Arrow Down`、`Home`、`End` 键盘操作。
- 提供跨浏览器一致的焦点管理。
- 为折叠项提供 `aria-expanded`。
- 为折叠项提供 `aria-disabled`。
- 为折叠项提供 `aria-controls`。

## API

### Accordion 属性

| 属性                      | 类型                                      | 说明                                   | 默认值   |
| ------------------------- | ----------------------------------------- | -------------------------------------- | -------- |
| children                  | `VNodeChild \| VNodeChild[]`              | 集合内容，一般是 AccordionItem 数组。  | `-`      |
| variant                   | `light \| shadow \| bordered \| splitted` | Accordion 视觉风格。                   | `light`  |
| selectionMode             | `none \| single \| multiple`              | 集合允许的选择模式。                   | `single` |
| selectionBehavior         | `toggle \| replace`                       | 选择行为。                             | `toggle` |
| isCompact                 | `boolean`                                 | 是否让所有 AccordionItem 更紧凑。      | `false`  |
| isDisabled                | `boolean`                                 | 是否禁用 AccordionItem。               | `false`  |
| showDivider               | `boolean`                                 | 是否显示每个项目底部分割线。           | `true`   |
| dividerProps              | `DividerProps`                            | Divider 组件属性。                     | `-`      |
| hideIndicator             | `boolean`                                 | 是否隐藏 AccordionItem 指示器。        | `false`  |
| disableAnimation          | `boolean`                                 | 是否禁用 AccordionItem 展开/收起动画。 | `false`  |
| disableIndicatorAnimation | `boolean`                                 | 是否禁用指示器动画。                   | `false`  |
| disallowEmptySelection    | `boolean`                                 | 是否不允许空选择。                     | `false`  |
| keepContentMounted        | `boolean`                                 | 是否始终挂载 AccordionItem 内容。      | `false`  |
| fullWidth                 | `boolean`                                 | 是否占满父容器宽度。                   | `true`   |
| motionProps               | `MotionProps`                             | Accordion 动画属性。                   | `-`      |
| disabledKeys              | `string[]`                                | 禁用项键集合，这些项不可交互。         | `-`      |
| itemClasses               | `AccordionItemClassnames`                 | AccordionItem 插槽类名集合。           | `-`      |
| selectedKeys              | `string[] \| string`                      | 当前选中键（受控）。                   | `-`      |
| defaultSelectedKeys       | `string[] \| string`                      | 初始选中键（非受控）。                 | `-`      |

### Accordion 事件

| 属性              | 类型                                | 说明                                                | 默认值 |
| ----------------- | ----------------------------------- | --------------------------------------------------- | ------ |
| onSelectionChange | `(keys: string[] \| string) => any` | 选择变化时触发。Vue 中使用 `@change` 或 `v-model`。 | `-`    |

### Accordion Item 属性

| 属性                      | 类型                      | 说明                            | 默认值  |
| ------------------------- | ------------------------- | ------------------------------- | ------- |
| children                  | `VNodeChild`              | 组件内容。                      | `-`     |
| title                     | `VNodeChild`              | 折叠项标题。                    | `-`     |
| subtitle                  | `VNodeChild`              | 折叠项副标题。                  | `-`     |
| indicator                 | `IndicatorProps`          | 展开指示器，通常为箭头图标。    | `-`     |
| startContent              | `VNodeChild`              | 前置内容，通常为图标或头像。    | `-`     |
| motionProps               | `MotionProps`             | 用于修改动画的属性。            | `-`     |
| isCompact                 | `boolean`                 | 是否为紧凑模式。                | `false` |
| isDisabled                | `boolean`                 | 是否禁用。                      | `false` |
| keepContentMounted        | `boolean`                 | 关闭时是否仍保留内容挂载。      | `false` |
| hideIndicator             | `boolean`                 | 是否隐藏指示器。                | `false` |
| disableAnimation          | `boolean`                 | 是否禁用动画。                  | `false` |
| disableIndicatorAnimation | `boolean`                 | 是否禁用指示器动画。            | `false` |
| HeadingComponent          | `string`                  | 自定义标题标签（可访问性）。    | `h2`    |
| classNames                | `AccordionItemClassnames` | 自定义 AccordionItem 插槽类名。 | `-`     |

### Accordion Item 事件

| 属性          | 类型                           | 说明                                         | 默认值 |
| ------------- | ------------------------------ | -------------------------------------------- | ------ |
| onFocus       | `(e: FocusEvent) => void`      | 获取焦点时触发。                             | `-`    |
| onBlur        | `(e: FocusEvent) => void`      | 失去焦点时触发。                             | `-`    |
| onFocusChange | `(isFocused: boolean) => void` | 焦点状态变化时触发。                         | `-`    |
| onKeyDown     | `(e: KeyboardEvent) => void`   | 按键按下时触发。                             | `-`    |
| onKeyUp       | `(e: KeyboardEvent) => void`   | 按键抬起时触发。                             | `-`    |
| onPress       | `(e: PressEvent) => void`      | 按压释放并命中目标时触发。                   | `-`    |
| onPressStart  | `(e: PressEvent) => void`      | 按压开始时触发。                             | `-`    |
| onPressEnd    | `(e: PressEvent) => void`      | 按压结束时触发。                             | `-`    |
| onPressChange | `(isPressed: boolean) => void` | 按压状态变化时触发。                         | `-`    |
| onPressUp     | `(e: PressEvent) => void`      | 按压释放时触发。                             | `-`    |
| onClick       | `MouseEventHandler`            | 原生按钮点击事件（已废弃，建议用 onPress）。 | `-`    |

### 类型

#### Accordion Item Indicator Props

```ts
type AccordionItemIndicatorProps = {
  indicator?: any;
  isOpen?: boolean;
  isDisabled?: boolean;
}

type indicator?: any | ((props: AccordionItemIndicatorProps) => any) | null
```

### Accordion Item classNames

```ts
export type AccordionItemClassnames = {
  base?: string;
  heading?: string;
  trigger?: string;
  titleWrapper?: string;
  title?: string;
  subtitle?: string;
  startContent?: string;
  indicator?: string;
  content?: string;
};
```

#### Motion Props

```ts
export type MotionProps = {
  animateOpacity?: boolean;
  startingHeight?: number;
  endingHeight?: number | string;
  startingY?: number;
  endingY?: number;
} & Record<string, any>;
```
