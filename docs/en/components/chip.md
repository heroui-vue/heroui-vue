<script setup>
import { Chip } from '@heroui-vue/core/raw'
import { NotificationIcon, CheckIcon } from '@heroui-vue/icon'
</script>

# Chip
A small block of information that displays input information, attributes, or actions.

## Installation
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

## Usage

::: component-view
<Chip>Chip</Chip>
:::

### Disabled

::: component-view
<Chip isDisabled color="primary">Chip</Chip>
:::

### Sizes


::: component-view
<div class="flex gap-4">
    <Chip size="sm">Small</Chip>
    <Chip size="md">Medium</Chip>
    <Chip size="lg">Large</Chip>
</div>
:::

### Colors

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


### Radius

::: component-view
<div class="flex gap-4">
    <Chip radius="full">Full</Chip>
    <Chip radius="lg">Large</Chip>
    <Chip radius="md">Medium</Chip>
    <Chip radius="sm">Small</Chip>
</div>
:::

### Variants

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

### Start and End Content

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

### With Close Button

::: component-view
<div className="flex gap-4">
    <Chip @close="console.log('close')">Chip</Chip>
    <Chip variant="bordered" @close="console.log('close')">
    Chip
    </Chip>
</div>
:::

### With Avatar

::: info
Depends on the `Avatar` component
:::

::: warning
Work in progress
:::

## Style Slots
- **base**: The base slot of the Chip, which is the container of the Chip.
- **content**: The content slot of the Chip, which is the container of the Chip's children.
- **dot**: The dot on the left side of the Chip. Visible when the `variant="dot"` property is set.
- **avatar**: The avatar class of the Chip. Visible when using the `avatar` slot.
- **closeButton**: The close button class of the Chip. Visible when listening to the `@close` event.

### Custom Styles

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