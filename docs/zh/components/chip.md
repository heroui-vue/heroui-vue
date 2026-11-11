# Chip

[HeroUI Chip 文档](https://v2.heroui.com/docs/components/chip)

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

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
    <Chip>Chip</Chip>
</template>
:::

### 禁用

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
    <Chip isDisabled color="primary">Chip</Chip>
</template>
:::

### 尺寸

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
    <div class="flex gap-4">
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
        <Chip size="lg">Large</Chip>
    </div>
</template>
:::

### 颜色

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
    <div class="flex gap-4">
        <Chip color="default">Default</Chip>
        <Chip color="primary">Primary</Chip>
        <Chip color="secondary">Secondary</Chip>
        <Chip color="success">Success</Chip>
        <Chip color="warning">Warning</Chip>
        <Chip color="danger">Danger</Chip>
    </div>
</template>
:::

### 半径

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
    <div class="flex gap-4">
        <Chip radius="full">Full</Chip>
        <Chip radius="lg">Large</Chip>
        <Chip radius="md">Medium</Chip>
        <Chip radius="sm">Small</Chip>
    </div>
</template>
:::

### 变体

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
    <div class="flex gap-4">
        <Chip color="warning" variant="solid">Solid</Chip>
        <Chip color="warning" variant="bordered">Bordered</Chip>
        <Chip color="warning" variant="light">Light</Chip>
        <Chip color="warning" variant="flat">Flat</Chip>
        <Chip color="warning" variant="faded">Faded</Chip>
        <Chip color="warning" variant="shadow">Shadow</Chip>
        <Chip color="warning" variant="dot">Dot</Chip>
    </div>
</template>
:::

### Start 和 End 内容

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
import { NotificationIcon, CheckIcon } from '@heroui-vue/icon'
</script>

<template>
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
</template>
:::

### 带关闭按钮

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
    <div className="flex gap-4">
        <Chip @close="console.log('close')">Chip</Chip>
        <Chip variant="bordered" @close="console.log('close')">
        Chip
        </Chip>
    </div>
</template>
:::

### 带头像

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4">
        <Chip variant="flat">
            <template #avatar>
            <Avatar
                name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
            />
            </template>
            Avatar
        </Chip>
      <Chip variant="flat">
        <template #avatar>
          <Avatar
            :getInitials="(name) => name.charAt(0)"
            name="JW"
            size="sm"
          />
        </template>
        Avatar
      </Chip>
    </div>
</template>
:::

## 样式插槽Slots

- **base**：Chip的基座插槽，它是Chip的容器。
- **content**：Chip的内容插槽，它是Chip子项的容器。
- **dot**：Chip左侧的小圆点。设置 `variant="dot"` 属性时可见。
- **avatar**：Chip的头像类。使用 `avatar` 插槽时可见。
- **closeButton**：Chip的关闭按钮类。监听 `@close` 事件时可见。

### 自定义样式

::: sfc
<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

<template>
<Chip
    :classNames="{
        base: 'bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
        content: 'drop-shadow-xs shadow-black text-white',
    }"
    variant="shadow">
    New
</Chip>
</template>
:::
