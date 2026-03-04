<script setup>
import { Avatar, AvatarGroup } from '@heroui-vue/core/raw'
</script>

# Avatar

The Avatar component is used to represent a user, and displays the profile picture, initials or fallback icon.

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
import { Avatar, AvatarGroup } from '@heroui-vue/avatar'
```
```js [Global import]
import { Avatar, AvatarGroup } from 'heroui-vue'
```
:::

## Usage

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

### Sizes

::: component-view
<div class="flex gap-4 items-center">
  <Avatar class="w-6 h-6 text-tiny" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
  <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar class="w-20 h-20 text-large" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
</div>
:::

### Disabled

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

### Bordered

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

### Radius

::: component-view
<div class="flex gap-4 items-center">
  <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
  <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
  <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
</div>
:::

### Colors

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

### Avatar Fallbacks

If there is an error loading the `src` of the avatar, there are 2 fallbacks:

- If there's a `name` prop, we use it to generate the initials.
- If there's no `name` prop, we use a default avatar icon.

If `showFallback` is not passed, the fallbacks will not be displayed.

::: component-view
<div class="flex gap-4 items-center">
  <Avatar showFallback src="https://images.unsplash.com/broken" />
  <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
  <Avatar name="Joe" src="https://images.unsplash.com/broken" />
</div>
:::

### Custom Fallback

You can also provide a custom fallback component to be displayed when the `src` fails to load.

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

### Custom Implementation

In case you need to customize avatar behavior further, HeroUI Vue currently keeps `useAvatar` as an internal composition utility and does not expose it as a stable public API yet.

### Custom initials logic

HeroUI React supports `getInitials` for custom initials logic. HeroUI Vue does not expose this prop yet; by default initials are derived from the first characters of up to two words in `name`.

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

You can limit the number of avatars displayed by passing the `max` prop to the `AvatarGroup` component.

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

You can display the total number of avatars by passing the `total` prop to the `AvatarGroup` component.

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

HeroUI React supports `renderCount` as a render function. HeroUI Vue currently supports `renderCount` as a boolean switch to show/hide the built-in count badge.

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

By passing the `isGrid` prop to the `AvatarGroup` component, avatars will be displayed in a grid layout.

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

In case you need lower-level customization, HeroUI React exposes `useAvatarGroup` and `AvatarGroupProvider`. HeroUI Vue has not exposed equivalent public APIs yet.

## Slots

- **base**: Avatar wrapper, it includes styles for focus ring, position, and general appearance.
- **img**: Image element within the avatar, it includes styles for opacity transition and size.
- **fallback**: Fallback content when the image fails to load or is not provided, it includes styles for centering the content.
- **name**: Initials displayed when the image is not provided or fails to load, it includes styles for font and text alignment.
- **icon**: Icon element within the avatar, it includes styles for centering the content and size.

### Custom Avatar Styles

You can customize any part of the avatar by using the `classNames` prop.

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

`Avatar` has the following attributes on the `base` element:

- **data-hover**: When the avatar is being hovered.
- **data-focus**: When the avatar is being focused.
- **data-focus-visible**: When the avatar is being focused with keyboard navigation.

## API

### Avatar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | - | The source URL of the image to be displayed. |
| color | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | `"default"` | Sets the avatar background color. |
| radius | `"none" \| "sm" \| "md" \| "lg" \| "full"` | `"full"` | Sets the avatar border radius. |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Sets the avatar size. |
| name | `string` | - | Displays initials if the image is not provided or fails to load. |
| icon | `any` | - | Displays a custom icon inside the avatar fallback. |
| fallback | `any` | - | A custom fallback component to display when the image fails to load. |
| isBordered | `boolean` | `false` | If true, adds a border around the avatar. |
| isDisabled | `boolean` | `false` | If true, disables the avatar and applies disabled styling. |
| isFocusable | `boolean` | `false` | If true, makes the avatar focusable for keyboard navigation. |
| showFallback | `boolean` | `false` | If true, shows fallback icon/initials when image fails to load. |
| imgProps | `ImgHTMLAttributes` | - | Props passed to the internal image element. |
| classNames | `Partial<Record<"base" \| "img" \| "fallback" \| "name" \| "icon", string>>` | - | Custom class names for avatar slots. |

### Avatar Group Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| max | `number` | - | The maximum number of visible avatars. |
| total | `number` | - | Controls the number of avatars not visible. |
| isGrid | `boolean` | `false` | Whether avatars should be displayed in a grid. |
| renderCount | `boolean` | `true` | Whether to render the built-in count badge. |
| classNames | `Partial<Record<"base" \| "count", string>>` | - | Custom class names for avatar group slots. |
