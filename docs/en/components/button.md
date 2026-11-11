# Button

[HeroUI Button Docs](https://v2.heroui.com/docs/components/button)

Allows users to perform actions and make choices with a single tap

## Installation

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
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import

::: code-group
```js [On-demand import]
import { Button } from "@heroui-vue/button";
```

```js [Global import]
import { Button } from "heroui-vue";
```
:::

## Usage

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <Button color="primary">Button</Button>
</template>
:::

### Disabled

Button will be unclickable

::: sfc
<script setup>
import { Button } from '@heroui-vue/button'
</script>

<template>
    <Button color="primary" isDisabled>Button</Button>
</template>
:::

### Sizes

Display buttons in different sizes

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

### Radius

Display buttons with different border radius

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

### Colors

Display buttons in different colors

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

### Variants

Display different types of buttons

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

### Loading

Pass the `isLoading` prop to show a `Spinner` component inside the button.

:::warning
Work in progress
:::

You can also customize the loading spinner by passing a custom component to the `spinner` slot.

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

The `spinner` slot is displayed at the start position of the button by default, you can also display custom components at the end position of the button by specifying `spinnerPlacement`.

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

### With Icons

You can add icons by passing the `startContent` or `endContent` slots.

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

### Icon Only

You can also display a button without text by passing the `isIconOnly` prop and the desired icon as the default child.

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

### Custom Styles

You can customize the Button component by passing custom Tailwind CSS classes to the component slots.

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

### Disable Ripple

Button will not show ripple effect when pressed

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

### Disable Animation

Button will not show animation effect when pressed

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

## Data Attributes

`Button` has the following attributes on the `base` element:

- **data-hover**:
  When the button is being hovered. Based on [useElementHover](https://vueuse.org/core/useElementHover/#useelementhover)
- **data-focus**:
  When the button is being focused. Based on [useFocus](https://vueuse.org/core/useFocus/#usefocus).
- **data-focus-visible**: Not supported yet, default to `false`.
- **data-disabled**:
  When the button is disabled. Based on `isDisabled` prop.
- **data-pressed**:
  When the button is pressed. Based on [useMousePressed](https://vueuse.org/core/useMousePressed/#usemousepressed)
- **data-loading**:
  When the button is loading. Based on `isLoading` prop.

## Accessibility

:::info
Some features may not be perfect, if you find any problems, please submit an issue
:::

- Button has role of `button`(Not supported yet, plan to support).
- Keyboard event support for <Kbd>Space</Kbd> and <Kbd>Enter</Kbd> keys.
- Mouse and touch event handling, and press state management.
- Keyboard focus management and cross browser normalization.

:heart:From HeroUI: We recommend to read this [blog post](https://react-spectrum.adobe.com/blog/building-a-button-part-1.html) about the complexities of
building buttons that work well across devices and interaction methods.

## API

### Button Props

| Name             | Type                                                                           | Default     | Description                                                  |
| ---------------- | ------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------ |
| variant          | `"solid" \| "bordered" \| "light" \| "flat" \| "faded" \| "shadow" \| "ghost"` | `"solid"`   | The button appearance style.                                 |
| color            | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"`  | `"default"` | The button color theme.                                      |
| size             | `"sm" \| "md" \| "lg"`                                                         | `"md"`      | The Button size                                              |
| radius           | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                     | `"md"`      | The button border radius.                                    |
| spinnerPlacement | `"start" \| "end"`                                                             | `"start"`   | The spinner placement.                                       |
| fullWidth        | `boolean`                                                                      | `false`     | Whether the button should take the full width of its parent. |
| isIconOnly       | `boolean`                                                                      | `false`     | Whether the button should have the same width and height.    |
| isDisabled       | `boolean`                                                                      | `false`     | Whether the button is disabled.                              |
| isLoading        | `boolean`                                                                      | `false`     | Whether the button is loading.                               |
| disableRipple    | `boolean`                                                                      | `false`     | Whether the button should display a ripple effect on press.  |
| disableAnimation | `boolean`                                                                      | `false`     | Whether the button should display animations.                |

### Button Slots

| Name         | Scope | Description             |
| ------------ | ----- | ----------------------- |
| default      | -     | The default slot.       |
| startContent | -     | The start content slot. |
| endContent   | -     | The end content slot.   |
| spinner      | -     | The spinner slot.       |

### Button Events (WIP)

| Name        | Type                           | Default |
| ----------- | ------------------------------ | ------- |
| press       | `(e: PressEvent) => void`      | -       |
| pressStart  | `(e: PressEvent) => void`      | -       |
| pressEnd    | `(e: PressEvent) => void`      | -       |
| pressChange | `(isPressed: boolean) => void` | -       |
| pressUp     | `(e: PressEvent) => void`      | -       |
| keyDown     | `(e: KeyboardEvent) => void`   | -       |
| keyUp       | `(e: KeyboardEvent) => void`   | -       |
