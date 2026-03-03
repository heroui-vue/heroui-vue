<script setup>
import { Avatar, AvatarGroup } from '@heroui-vue/core/raw'
</script>

# Avatar
Avatar represents a user or entity with an image, initials, or a fallback icon.

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
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import
::: code-group
```js [On-demand import]
import { Avatar } from '@heroui-vue/avatar'
```
```js [Global import]
import { Avatar } from 'heroui-vue'
```
:::

## Usage

```vue
<Avatar name="HeroUI Vue" showFallback />
```

### With Image

```vue
<Avatar name="Hotdog" src="https://i.pravatar.cc/150?u=heroui-vue-avatar" />
```

### Sizes

```vue
<div class="flex items-center gap-4">
  <Avatar size="sm" name="S" showFallback />
  <Avatar size="md" name="M" showFallback />
  <Avatar size="lg" name="L" showFallback />
</div>
```

### Colors

```vue
<div class="flex items-center gap-4">
  <Avatar color="default" name="D" showFallback />
  <Avatar color="primary" name="P" showFallback />
  <Avatar color="secondary" name="S" showFallback />
  <Avatar color="success" name="S" showFallback />
  <Avatar color="warning" name="W" showFallback />
  <Avatar color="danger" name="D" showFallback />
</div>
```

### Radius

```vue
<div class="flex items-center gap-4">
  <Avatar radius="none" name="N" showFallback />
  <Avatar radius="sm" name="S" showFallback />
  <Avatar radius="md" name="M" showFallback />
  <Avatar radius="lg" name="L" showFallback />
  <Avatar radius="full" name="F" showFallback />
</div>
```

### Bordered

```vue
<div class="flex items-center gap-4">
  <Avatar isBordered color="primary" name="HV" showFallback />
  <Avatar
    isBordered
    color="secondary"
    src="https://i.pravatar.cc/150?u=heroui-vue-avatar-bordered"
  />
</div>
```

### Custom Fallback

```vue
<Avatar fallback="HV" showFallback />
```

## Style Slots
- **base**: The root container.
- **img**: The image element.
- **fallback**: The fallback wrapper.
- **name**: The initials content.
- **icon**: The icon fallback content.

## AvatarGroup

AvatarGroup arranges multiple avatars into a compact cluster.

```vue
<AvatarGroup>
  <Avatar name="Ada Lovelace" showFallback />
  <Avatar name="Grace Hopper" showFallback />
  <Avatar name="Linus Torvalds" showFallback />
</AvatarGroup>
```

### With Count

```vue
<AvatarGroup :max="3" :total="5">
  <Avatar name="Ada Lovelace" showFallback />
  <Avatar name="Grace Hopper" showFallback />
  <Avatar name="Linus Torvalds" showFallback />
</AvatarGroup>
```

### Grid Layout

```vue
<AvatarGroup isGrid>
  <Avatar name="Ada Lovelace" showFallback />
  <Avatar name="Grace Hopper" showFallback />
  <Avatar name="Linus Torvalds" showFallback />
  <Avatar name="Margaret Hamilton" showFallback />
</AvatarGroup>
```
