<script setup>
import { Avatar } from '@heroui-vue/core/raw'
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

::: component-view
<Avatar
  name="HeroUI Vue"
  showFallback
/>
:::

### With Image

::: component-view
<Avatar
  name="Hotdog"
  src="https://i.pravatar.cc/150?u=heroui-vue-avatar"
/>
:::

### Sizes

::: component-view
<div class="flex items-center gap-4">
  <Avatar size="sm" name="S" showFallback />
  <Avatar size="md" name="M" showFallback />
  <Avatar size="lg" name="L" showFallback />
</div>
:::

### Colors

::: component-view
<div class="flex items-center gap-4">
  <Avatar color="default" name="D" showFallback />
  <Avatar color="primary" name="P" showFallback />
  <Avatar color="secondary" name="S" showFallback />
  <Avatar color="success" name="S" showFallback />
  <Avatar color="warning" name="W" showFallback />
  <Avatar color="danger" name="D" showFallback />
</div>
:::

### Radius

::: component-view
<div class="flex items-center gap-4">
  <Avatar radius="none" name="N" showFallback />
  <Avatar radius="sm" name="S" showFallback />
  <Avatar radius="md" name="M" showFallback />
  <Avatar radius="lg" name="L" showFallback />
  <Avatar radius="full" name="F" showFallback />
</div>
:::

### Bordered

::: component-view
<div class="flex items-center gap-4">
  <Avatar isBordered color="primary" name="HV" showFallback />
  <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=heroui-vue-avatar-bordered" />
</div>
:::

### Custom Fallback

::: component-view
<Avatar showFallback>
  <template #fallback>
    <span class="text-xs font-semibold">HV</span>
  </template>
</Avatar>
:::

## Style Slots
- **base**: The root container.
- **img**: The image element.
- **fallback**: The fallback wrapper.
- **name**: The initials content.
- **icon**: The icon fallback content.
