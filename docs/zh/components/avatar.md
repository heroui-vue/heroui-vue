<script setup>
import { Avatar, AvatarGroup } from '@heroui-vue/core/raw'
</script>

# Avatar

Avatar 组件用于表示一个用户，并显示头像图片、姓名缩写或回退图标。

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
import { Avatar, AvatarGroup } from '@heroui-vue/avatar'
```
```js [全局导入]
import { Avatar, AvatarGroup } from 'heroui-vue'
```
:::

## 用法

::: component-view
<div class="flex gap-3 items-center">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar name="Junior" showFallback />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar name="Jane" showFallback />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar name="Joe" showFallback />
</div>
:::

### 尺寸

::: component-view
<div class="flex gap-4 items-center">
  <Avatar class="w-6 h-6 text-tiny" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar class="w-20 h-20 text-large" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</div>
:::

### 禁用

::: component-view
<div class="flex gap-3 items-center">
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar isDisabled name="Junior" showFallback />
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar isDisabled name="Jane" showFallback />
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar isDisabled name="Joe" showFallback />
</div>
:::

### 边框

::: component-view
<div class="flex gap-4 items-center">
  <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</div>
:::

### 圆角

::: component-view
<div class="flex gap-4 items-center">
  <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
  <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
</div>
:::

### 颜色

::: component-view
<div class="flex gap-4 items-center">
  <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar isBordered color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</div>
:::

### Avatar 回退内容

当头像 `src` 加载失败时，有 2 种回退方式：

- 如果传了 `name`，会根据名字生成缩写。
- 如果没有 `name`，会显示默认头像图标。

如果没有传 `showFallback`，则不会显示回退内容。

::: component-view
<div class="flex gap-4 items-center">
  <Avatar showFallback src="https://images.unsplash.com/broken" />
  <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
  <Avatar name="Joe" src="https://images.unsplash.com/broken" />
</div>
:::

### 自定义回退内容

你也可以在 `src` 加载失败时提供自定义回退内容。

::: component-view
<div class="flex gap-4 items-center">
  <Avatar showFallback src="https://images.unsplash.com/broken">
    <template #fallback>
      <svg class="w-6 h-6 text-default-500" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22z"
        />
      </svg>
    </template>
  </Avatar>
  <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
  <Avatar name="Joe" src="https://images.unsplash.com/broken" />
</div>
:::

### 自定义实现

如果你需要更底层地自定义 Avatar 行为，HeroUI Vue 当前把 `useAvatar` 作为内部组合式工具，暂未作为稳定公共 API 暴露。

### 自定义姓名缩写逻辑

HeroUI React 支持用 `getInitials` 自定义缩写逻辑。HeroUI Vue 暂未暴露该属性；当前默认会从 `name` 中最多取前两个单词的首字母。

## Avatar Group

::: component-view
<AvatarGroup isBordered>
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
:::

### Group Disabled

::: component-view
<AvatarGroup isBordered>
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
:::

### Group Max Count

你可以通过 `max` 属性限制 `AvatarGroup` 显示的头像数量。

::: component-view
<AvatarGroup isBordered :max="3">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
:::

### Group Total Count

你可以通过 `total` 属性指定头像总数。

::: component-view
<AvatarGroup isBordered :max="3" :total="10">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
:::

### Group Custom count

HeroUI React 的 `renderCount` 支持渲染函数。HeroUI Vue 当前的 `renderCount` 是布尔开关，用于显示/隐藏内置计数徽标。

::: component-view
<AvatarGroup isBordered :max="3" :total="10" :render-count="false">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
:::

### Group Grid

给 `AvatarGroup` 传入 `isGrid` 后，头像会以网格布局展示。

::: component-view
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
:::

### Group Custom Implementation

如果你需要更底层地自定义头像组，HeroUI React 提供了 `useAvatarGroup` 和 `AvatarGroupProvider`。HeroUI Vue 目前尚未暴露对应公共 API。

## 插槽

- **base**：Avatar 外层容器，包含焦点环、定位和整体外观样式。
- **img**：Avatar 内的图片元素，包含透明度过渡和尺寸样式。
- **fallback**：图片加载失败或未提供时的回退内容容器。
- **name**：图片缺失/失败时显示的姓名缩写内容。
- **icon**：Avatar 回退状态下的图标容器。

### 自定义 Avatar 样式

你可以通过 `classNames` 自定义 Avatar 各个部位的样式。

::: component-view
<Avatar
  showFallback
  :class-names="{
    base: 'bg-linear-to-br from-[#FFB457] to-[#FF705B]',
    icon: 'text-black/80'
  }"
>
  <template #icon>
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z M11.837 11.174a4.372 4.372 0 10-.031 0z"
      />
    </svg>
  </template>
</Avatar>
:::

## Data Attributes

`Avatar` 在 `base` 元素上有这些数据属性：

- **data-hover**：头像处于 hover 状态时。
- **data-focus**：头像获得焦点时。
- **data-focus-visible**：键盘导航导致焦点可见时。

## API

### Avatar 属性

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| src | `string` | - | 要显示的图片地址。 |
| color | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | `"default"` | 设置头像背景色。 |
| radius | `"none" \| "sm" \| "md" \| "lg" \| "full"` | `"full"` | 设置头像圆角。 |
| size | `"sm" \| "md" \| "lg"` | `"md"` | 设置头像尺寸。 |
| name | `string` | - | 图片缺失或加载失败时显示姓名缩写。 |
| icon | `any` | - | 在头像回退状态中显示自定义图标。 |
| fallback | `any` | - | 图片加载失败时显示的自定义回退内容。 |
| isBordered | `boolean` | `false` | 是否显示头像边框。 |
| isDisabled | `boolean` | `false` | 是否禁用头像并应用禁用样式。 |
| isFocusable | `boolean` | `false` | 是否支持键盘聚焦。 |
| showFallback | `boolean` | `false` | 图片加载失败时是否显示回退图标/缩写。 |
| imgProps | `ImgHTMLAttributes` | - | 透传给内部图片元素的属性。 |
| classNames | `Partial<Record<"base" \| "img" \| "fallback" \| "name" \| "icon", string>>` | - | Avatar 各插槽的自定义类名。 |

### Avatar Group 属性

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| max | `number` | - | 可见头像的最大数量。 |
| total | `number` | - | 控制不可见头像数量。 |
| isGrid | `boolean` | `false` | 是否以网格布局展示头像。 |
| renderCount | `boolean` | `true` | 是否渲染内置计数徽标。 |
| classNames | `Partial<Record<"base" \| "count", string>>` | - | 头像组插槽自定义类名。 |
