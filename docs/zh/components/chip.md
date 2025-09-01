<script setup>
import { Chip } from '@heroui-vue/core'
import { NotificationIcon, CheckIcon } from '@heroui-vue/icon'
</script>

# Chip
Chip是一个呈现输入信息、属性或操作的小型信息块。

## 安装
::: code-group
```sh [npm]
npm add @heroui-vue/chip
```
```sh [pnpm]
pnpm add @heroui-vue/chip
```
```sh [yarn]
yarn add @heroui-vue/chip
```
```sh [bun]
bun add @heroui-vue/chip
```
:::

## 使用

::: component-view
<Chip>Chip</Chip>
:::

### 禁用

::: component-view
<Chip isDisabled color="primary">Chip</Chip>
:::

### 尺寸


::: component-view
<div class="flex gap-4">
    <Chip size="sm">Small</Chip>
    <Chip size="md">Medium</Chip>
    <Chip size="lg">Large</Chip>
</div>
:::

### 颜色

::: component-view
<div class="flex gap-4">
    <Chip color="default">Default</Chip>
    <Chip color="primary">Primary</Chip>
    <Chip color="secondary">Secondary</Chip>
    <Chip color="success">Success</Chip>
    <Chip color="warning">Warning</Chip>
    <Chip color="danger">Danger</Chip>
</div>
:::


### 半径

::: component-view
<div class="flex gap-4">
    <Chip radius="full">Full</Chip>
    <Chip radius="lg">Large</Chip>
    <Chip radius="md">Medium</Chip>
    <Chip radius="sm">Small</Chip>
</div>
:::

### 变体

::: component-view
<div class="flex gap-4">
    <Chip color="warning" variant="solid">Solid</Chip>
    <Chip color="warning" variant="bordered">Bordered</Chip>
    <Chip color="warning" variant="light">Light</Chip>
    <Chip color="warning" variant="flat">Flat</Chip>
    <Chip color="warning" variant="faded">Faded</Chip>
    <Chip color="warning" variant="shadow">Shadow</Chip>
    <Chip color="warning" variant="dot">Dot</Chip>
</div>
:::

### Start 和 End 内容

::: component-view
<div className="flex gap-4">
    <Chip color="success" variant="faded">
        <template #startContent>
            <CheckIcon :size="18" />
        </template>
        Chip
    </Chip>
    <Chip color="secondary" variant="flat">
        <template #endContent>
            <NotificationIcon :size="18" />
        </template>
        Chip
    </Chip>
</div>
:::

### 带关闭按钮

::: component-view
<div className="flex gap-4">
    <Chip @close="console.log('close')">Chip</Chip>
    <Chip variant="bordered" @close="console.log('close')">
    Chip
    </Chip>
</div>
:::

### 带头像

::: info
依赖`Avatar`组件
:::

::: warning
Work in progress
:::

## 样式插槽Slots
- **base**：Chip的基座插槽，它是Chip的容器。
- **content**：Chip的内容插槽，它是Chip子项的容器。
- **dot**：Chip左侧的小圆点。设置 `variant="dot"` 属性时可见。
- **avatar**：Chip的头像类。使用 `avatar` 插槽时可见。
- **closeButton**：Chip的关闭按钮类。监听 `@close` 事件时可见。

### 自定义样式

::: component-view
<Chip
  :classNames="{
    base: 'bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
    content: 'drop-shadow-xs shadow-black text-white',
  }"
  variant="shadow"
>
  New
</Chip>
:::

###
