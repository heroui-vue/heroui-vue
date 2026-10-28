<script setup>
import { ref } from 'vue'
import { Badge, Avatar, Button } from '@heroui-vue/core/raw'

const isVisible = ref(true)
</script>

# Badge

Badges are used as a small numerical value or status descriptor for UI elements.

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/badge
```

```sh [pnpm]
pnpm add @heroui-vue/badge
```

```sh [yarn]
yarn add @heroui-vue/badge
```

```sh [bun]
bun add @heroui-vue/badge
```
:::

> [!NOTE]
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import

::: code-group
```js [On-demand import]
import { Badge } from "@heroui-vue/badge";
```

```js [Global import]
import { Badge } from "heroui-vue";
```
:::

## Usage

::: component-view
<Badge color="primary" content="5">
  <Avatar radius="md" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
</Badge>
:::

### Sizes

::: component-view
<div class="flex gap-3 items-center">
  <Badge color="primary" content="5" size="sm">
    <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  </Badge>
  <Badge color="primary" content="5" size="md">
    <Avatar radius="md" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
  </Badge>
  <Badge color="primary" content="5" size="lg">
    <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
  </Badge>
</div>
:::

### Colors

::: component-view
<div class="flex gap-3 items-center flex-wrap">
  <Badge color="default" content="5"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" /></Badge>
  <Badge color="primary" content="5"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" /></Badge>
  <Badge color="secondary" content="5"><Avatar radius="md" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" /></Badge>
  <Badge color="success" content="5"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" /></Badge>
  <Badge color="warning" content="5"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" /></Badge>
  <Badge color="danger" content="5"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /></Badge>
</div>
:::

### Variants

::: component-view
<div class="flex gap-3 items-center">
  <Badge color="warning" content="5" variant="solid"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" /></Badge>
  <Badge color="warning" content="5" variant="flat"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" /></Badge>
  <Badge color="warning" content="5" variant="faded"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" /></Badge>
  <Badge color="warning" content="5" variant="shadow"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" /></Badge>
</div>
:::

### Placements

::: component-view
<div class="flex gap-4 items-center">
  <Badge color="danger" content="5" placement="top-right"><Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" /></Badge>
  <Badge color="danger" content="5" placement="bottom-right"><Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" /></Badge>
  <Badge color="danger" content="5" placement="top-left"><Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" /></Badge>
  <Badge color="danger" content="5" placement="bottom-left"><Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026302d" /></Badge>
</div>
:::

### Shapes

For a better positioning, you can use the `shape` property to define the shape of the badge.

::: component-view
<div class="flex gap-4 items-center">
  <Badge color="danger" content="5" shape="rectangle">
    <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
  </Badge>
  <Badge color="danger" content="5" shape="circle">
    <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  </Badge>
</div>
:::

### Badge Visibility

You can control the visibility of the badge by using the `isInvisible` property.

::: component-view
<div class="flex items-center gap-4">
  <div class="flex items-center gap-3">
    <Badge color="danger" :content="5" :isInvisible="!isVisible" shape="circle">
      <svg fill="none" viewBox="0 0 24 24" width="30" height="30" class="fill-current">
        <path clip-rule="evenodd" fill-rule="evenodd" fill="currentColor" d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"/>
      </svg>
    </Badge>
    <Badge color="danger" :content="50" :isInvisible="!isVisible" shape="circle">
      <svg fill="none" viewBox="0 0 24 24" width="30" height="30" class="fill-current">
        <path fill="currentColor" d="M16.25 22.5C17.2165 22.5 18 21.7165 18 20.75C18 19.7835 17.2165 19 16.25 19C15.2835 19 14.5 19.7835 14.5 20.75C14.5 21.7165 15.2835 22.5 16.25 22.5Z"/>
        <path fill="currentColor" d="M8.25 22.5C9.2165 22.5 10 21.7165 10 20.75C10 19.7835 9.2165 19 8.25 19C7.2835 19 6.5 19.7835 6.5 20.75C6.5 21.7165 7.2835 22.5 8.25 22.5Z"/>
        <path fill="currentColor" d="M4.84 3.94L4.64 6.39C4.6 6.86 4.97 7.25 5.44 7.25H20.75C21.17 7.25 21.52 6.93 21.55 6.51C21.68 4.74 20.33 3.3 18.56 3.3H6.27C6.17 2.86 5.97 2.44 5.66 2.09C5.16 1.56 4.46 1.25 3.74 1.25H2C1.59 1.25 1.25 1.59 1.25 2C1.25 2.41 1.59 2.75 2 2.75H3.74C4.05 2.75 4.34 2.88 4.55 3.1C4.76 3.33 4.86 3.63 4.84 3.94Z"/>
        <path fill="currentColor" d="M20.5101 8.75H5.17005C4.75005 8.75 4.41005 9.07 4.37005 9.48L4.01005 13.83C3.87005 15.54 5.21005 17 6.92005 17H18.0401C19.5401 17 20.8601 15.77 20.9701 14.27L21.3001 9.6C21.3401 9.14 20.9801 8.75 20.5101 8.75Z"/>
      </svg>
    </Badge>
  </div>
  <label class="inline-flex items-center gap-2 text-sm">
    <input type="checkbox" :checked="isVisible" @change="isVisible = !isVisible" />
    Show badge
  </label>
</div>
:::

### Content Examples

::: component-view
<div class="flex gap-5 items-center flex-wrap">
  <Badge color="danger" content="5"><Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" /></Badge>
  <Badge color="success" content="" placement="bottom-right" shape="circle"><Avatar radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" /></Badge>
  <Badge color="danger" content="new" size="sm"><Avatar isBordered color="danger" radius="md" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" /></Badge>
  <Badge isOneChar color="success" placement="bottom-right">
    <template #content>
      <svg fill="none" viewBox="0 0 24 24" width="18" height="18">
        <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </template>
    <Avatar isBordered color="success" radius="md" src="https://i.pravatar.cc/300?u=a042581f4e290267072" />
  </Badge>
  <Badge isOneChar color="danger" placement="top-right" shape="circle">
    <template #content>
      <svg fill="none" viewBox="0 0 24 24" width="12" height="12">
        <path clip-rule="evenodd" fill-rule="evenodd" fill="currentColor" d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"/>
      </svg>
    </template>
    <Avatar radius="full" size="lg" src="https://i.pravatar.cc/300?u=a042581f4e29026704f" />
  </Badge>
</div>
:::

### Disable Outline

By default, the badge has an outline, you can disable it by using the `showOutline={false}` property.

::: component-view
<div class="flex gap-4 items-center">
  <Badge color="danger" content="5" shape="rectangle" :showOutline="false">
    <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042f81f4e29026024d" />
  </Badge>
  <Badge color="danger" content="5" shape="circle" :showOutline="false">
    <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  </Badge>
</div>
:::

### Accessibility

It's not advisable to depend on the badge's content for accurate announcement.
Instead, consider supplying a comprehensive description, such as using `aria-label`.

::: component-view
<Badge color="danger" content="99+" shape="circle">
  <Button isIconOnly aria-label="more than 99 notifications" radius="full" variant="light">
    <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
      <path clip-rule="evenodd" fill-rule="evenodd" fill="currentColor" d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"/>
    </svg>
  </Button>
</Badge>
:::

## Slots

The Badge component has two slots:

- **base**: The base slot for the badge, which is the container of the badge.
- **badge**: The main slot for the badge content, which is the content of the badge.

## API

### Badge Props

| Attribute        | Type                                                              | Description                                                                           | Default     |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- |
| children         | `VNodeChild`                                                      | The wrapped component.                                                                | `-`         |
| content          | `string \| number \| VNodeChild`                                  | The content of the badge. The badge will be rendered relative to its children.        | `-`         |
| variant          | `solid \| flat \| faded \| shadow`                                | The variant style of the badge.                                                       | `solid`     |
| color            | `default \| primary \| secondary \| success \| warning \| danger` | The color of the badge.                                                               | `default`   |
| size             | `sm \| md \| lg`                                                  | The size of the badge.                                                                | `md`        |
| shape            | `circle \| rectangle`                                             | The shape of the badge.                                                               | `rectangle` |
| placement        | `top-right \| top-left \| bottom-right \| bottom-left`            | The placement of the badge.                                                           | `top-right` |
| showOutline      | `boolean`                                                         | If `true`, the badge will have an outline.                                            | `true`      |
| disableOutline   | `boolean`                                                         | If `true`, the badge will not have an outline. Deprecated, use `showOutline` instead. | `false`     |
| disableAnimation | `boolean`                                                         | If `true`, the badge will not have an animation.                                      | `false`     |
| isInvisible      | `boolean`                                                         | If `true`, the badge will be invisible.                                               | `false`     |
| isOneChar        | `boolean`                                                         | If `true`, the badge will have the same width and height.                             | `false`     |
| isDot            | `boolean`                                                         | If `true`, the badge will have smaller dimensions.                                    | `false`     |
| classNames       | `Partial<Record<"base" \| "badge", string>>`                      | Allows to set custom class names for the badge slots.                                 | `-`         |

###
