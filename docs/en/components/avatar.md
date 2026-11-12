<script setup>
import { Chip } from '@heroui-vue/chip'
</script>

# Avatar <sup><Chip class="tracking-wider" size="sm" color="secondary">updated</Chip></sup>

[HeroUI Avatar Docs](https://v2.heroui.com/docs/components/avatar)

The Avatar component is used to represent a user, and displays the profile picture, initials or fallback icon.

::: tip
The version is synced to `2.8.2` so tha the examples in the documentation may not align with the HeroUI's latest v2 version.
:::

## Installation

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
> If you use [global installation](/en/guide/installation#global-installation), you can skip this step.

## Import

HeroUI Vue currently exports 2 avatar-related components:

- **Avatar**: The main component to display an avatar.
- **AvatarGroup**: A wrapper component to display a group of avatars.

`AvatarIcon` is still not exported as a standalone component in HeroUI Vue. You can use the built-in fallback icon or provide a custom `icon`.

::: code-group
```js [On-demand import]
import { Avatar, AvatarGroup } from "@heroui-vue/avatar";
```

```js [Global import]
import { Avatar, AvatarGroup } from "heroui-vue";
```
:::

## Usage

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-3 items-center">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar name="Junior" showFallback />
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar name="Jane" showFallback />
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar name="Joe" showFallback />
    </div>
</template>
:::

### Sizes

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar class="w-6 h-6 text-tiny" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar class="w-20 h-20 text-large" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </div>
</template>
:::

### Disabled

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-3 items-center">
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isDisabled name="Junior" showFallback />
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isDisabled name="Jane" showFallback />
      <Avatar isDisabled src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isDisabled name="Joe" showFallback />
    </div>
</template>
:::

### Bordered

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </div>
</template>
:::

### Radius

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    </div>
</template>
:::

### Colors

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isBordered color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    </div>
</template>
:::

### Avatar Fallbacks

If there is an error loading the `src` of the avatar, there are 2 fallbacks:

- If there's a `name` prop, we use it to generate the initials.
- If there's no `name` prop, we use a default avatar icon.

If `showFallback` is not passed, the fallbacks will not be displayed.

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar showFallback src="https://images.unsplash.com/broken" />
      <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
      <Avatar name="Joe" src="https://images.unsplash.com/broken" />
    </div>
</template>
:::

### Custom Fallback

You can also provide a custom fallback component to be displayed when the `src` fails to load.

::: sfc
<script setup>
import { Avatar } from '@heroui-vue/avatar'
import { Camera } from '@heroui-vue/icon'
</script>

<template>
    <div class="flex gap-4 items-center">
      <Avatar showFallback src="https://images.unsplash.com/broken">
        <template #fallback>
            <Camera class="animate-pulse w-6 h-6 text-default-500" />
        </template>
      </Avatar>
      <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
      <Avatar name="Joe" src="https://images.unsplash.com/broken" />
    </div>
</template>
:::

### Custom Implementation

In case you need to customize avatar behavior further, use the `useAvatar` composition utility.

### Custom initials logic

Supports `getInitials` for custom initials logic by default initials are derived from the first characters of up to two words in `name`.

## Avatar Group

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered>
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### Group Disabled

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered isDisabled>
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### Group Max Count

You can limit the number of avatars displayed by passing the `max` prop to the `AvatarGroup` component.

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered :max="3">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### Group Total Count

You can control the number of avatars not visible by passing the `total` prop to the `AvatarGroup` component.

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
<AvatarGroup isBordered :max="3" :total="10">
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</AvatarGroup>
</template>
:::

### Group Custom count

`AvatarGroup` provides a `renderCount` prop to customize the count displayed when the `total` prop is passed.

::: sfc
<script setup>
import { Avatar, AvatarGroup } from '@heroui-vue/avatar'
</script>

<template>
  <AvatarGroup isBordered :max="3" :total="10" :render-count="renderCount">
    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
    <template #renderCount="{ count }">
        <p class="text-small text-foreground font-medium ms-2">+{{ count }} others</p>
    </template>
  </AvatarGroup>
</template>

<style scoped>
p {
  all: revert-layer;
}
</style>
:::

### Group Grid

By passing the `isGrid` prop to the `AvatarGroup` component, avatars will be displayed in a grid layout.

::: sfc
<script setup>
import { AvatarGroup, Avatar } from '@heroui-vue/avatar'
</script>

<template>
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
</template>
:::

### Group Custom Implementation

In case you need lower-level customization, use the `useAvatarGroup` composable. `AvatarGroup` internally provides the group context that `Avatar` children consume.

## Slots <sup><Chip class="tracking-wider" size="sm" color="warning">outdated</Chip></sup>

:::warning
This content should not be used as a reference; please rely on the slot type defined in the `Avatar` declaration instead.
:::

- **base**: Avatar wrapper, it includes styles for focus ring, position, and general appearance.
- **img**: Image element within the avatar, it includes styles for opacity transition and size.
- **fallback**: Fallback content when the image fails to load or is not provided, it includes styles for centering the content.
- **name**: Initials displayed when the image is not provided or fails to load, it includes styles for font and text alignment.
- **icon**: Icon element within the avatar, it includes styles for centering the content and size.

### Custom Avatar Styles

You can customize any part of the avatar by using the `classNames` prop.

::: sfc
<script setup>
import { Avatar } from "@heroui-vue/avatar";
import { AvatarIcon } from "@heroui-vue/icon";
</script>

<template>
  <Avatar
    showFallback
    :class-names="{
      base: 'bg-linear-to-br from-[#FFB457] to-[#FF705B]',
      icon: 'text-black/80',
    }"
  >
    <template #icon>
        <AvatarIcon />
    </template>
  </Avatar>
</template>
:::

## Data Attributes

`Avatar` has the following attributes on the `base` element:

- **data-hover**: When the avatar is being hovered.
- **data-focus**: When the avatar is being focused.
- **data-focus-visible**: When the avatar is being focused with keyboard navigation.

## API

### Avatar Props

| Name         | Type                                                                          | Default     | Description                                                          |
| ------------ | ----------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| src          | `string`                                                                      | -           | The source URL of the image to be displayed.                         |
| color        | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | `"default"` | Sets the avatar background color.                                    |
| radius       | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                    | `"full"`    | Sets the avatar border radius.                                       |
| size         | `"sm" \| "md" \| "lg"`                                                        | `"md"`      | Sets the avatar size.                                                |
| name         | `string`                                                                      | -           | Displays initials if the image is not provided or fails to load.     |
| icon         | `any`                                                                         | -           | Displays a custom icon inside the avatar fallback.                   |
| fallback     | `any`                                                                         | -           | A custom fallback component to display when the image fails to load. |
| isBordered   | `boolean`                                                                     | `false`     | If true, adds a border around the avatar.                            |
| isDisabled   | `boolean`                                                                     | `false`     | If true, disables the avatar and applies disabled styling.           |
| isFocusable  | `boolean`                                                                     | `false`     | If true, makes the avatar focusable for keyboard navigation.         |
| showFallback | `boolean`                                                                     | `false`     | If true, shows fallback icon/initials when image fails to load.      |
| imgProps     | `ImgHTMLAttributes`                                                           | -           | Props passed to the internal image element.                          |
| classNames   | `Partial<Record<"base" \| "img" \| "fallback" \| "name" \| "icon", string>>`  | -           | Custom class names for avatar slots.                                 |

### Avatar Group Props

| Name        | Type                                                                          | Default | Description                                                |
| ----------- | ----------------------------------------------------------------------------- | ------- | ---------------------------------------------------------- |
| max         | `number`                                                                      | `5`     | The maximum number of visible avatars.                     |
| total       | `number`                                                                      | -       | Controls the number of avatars not visible.                |
| size        | `"sm" \| "md" \| "lg"`                                                        | -       | Sets the size of the avatars in the group.                 |
| color       | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | -       | Sets the color of the avatars in the group.                |
| radius      | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                    | -       | Sets the border radius of the avatars in the group.        |
| isGrid      | `boolean`                                                                     | `false` | Whether avatars should be displayed in a grid.             |
| isDisabled  | `boolean`                                                                     | -       | Whether the avatars in the group are disabled.             |
| isBordered  | `boolean`                                                                     | -       | Whether the avatars in the group have a border.            |
| renderCount | `(count: number) => VNode \| VNode[] \| string \| null`                       | -       | Renders a custom count component when `total` is provided. |
| classNames  | `Partial<Record<"base" \| "count", string>>`                                  | -       | Custom class names for avatar group slots.                 |
