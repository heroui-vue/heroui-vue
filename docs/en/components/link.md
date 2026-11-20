# Link

[HeroUI Link Docs](https://v2.heroui.com/docs/components/link)

Links allow users to click their way from page to page. This component is styled to resemble a hyperlink and semantically renders an `<a>`.

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/link
```

```sh [pnpm]
pnpm add @heroui-vue/link
```

```sh [yarn]
yarn add @heroui-vue/link
```

```sh [bun]
bun add @heroui-vue/link
```

:::

> [!NOTE]
> With [global installation](/en/guide/installation#global-installation), you can skip this step.

## Import

::: code-group
```js [Individual]
import { Link } from "@heroui-vue/link";
```

```js [Global]
import { Link } from "heroui-vue";
```
:::

## Usage

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Link href="#">Default Link</Link>
</template>
:::

### Disabled

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Link isDisabled href="#">
    Disabled Link
  </Link>
</template>
:::

### Sizes

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link href="#" size="sm">
      Small
    </Link>
    <Link href="#" size="md">
      Medium
    </Link>
    <Link href="#" size="lg">
      Large
    </Link>
  </div>
</template>
:::

### Colors

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link color="foreground" href="#">
      Foreground
    </Link>
    <Link color="primary" href="#">
      Primary
    </Link>
    <Link color="secondary" href="#">
      Secondary
    </Link>
    <Link color="success" href="#">
      Success
    </Link>
    <Link color="warning" href="#">
      Warning
    </Link>
    <Link color="danger" href="#">
      Danger
    </Link>
  </div>
</template>
:::

### Underline

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link href="#" underline="none">
      None
    </Link>
    <Link href="#" underline="hover">
      Hover
    </Link>
    <Link href="#" underline="always">
      Always
    </Link>
    <Link href="#" underline="active">
      Active
    </Link>
    <Link href="#" underline="focus">
      Focus
    </Link>
  </div>
</template>
:::

### External

If you pass the `isExternal` prop, the link will have the `target="_blank"` and `rel="noopener noreferrer"` attributes.

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-4">
    <Link isExternal href="https://github.com/heroui-inc/heroui">
      External Link
    </Link>
    <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
      External Link Anchor
    </Link>
  </div>
</template>
:::

### Custom Anchor Icon

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
    Custom Icon
    <template #anchorIcon>
<svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"
        fill="currentColor"
      />
      <path
        d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"
        fill="currentColor"
      />
    </svg>
    </template>
  </Link>
</template>
:::

### Block Link

If you pass the `isBlock` prop, the link will be rendered as a block element with a hover effect.

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-2">
    <Link isBlock showAnchorIcon color="foreground" href="#">
      Foreground
    </Link>
    <Link isBlock showAnchorIcon color="primary" href="#">
      Primary
    </Link>
    <Link isBlock showAnchorIcon color="secondary" href="#">
      Secondary
    </Link>
    <Link isBlock showAnchorIcon color="success" href="#">
      Success
    </Link>
    <Link isBlock showAnchorIcon color="warning" href="#">
      Warning
    </Link>
    <Link isBlock showAnchorIcon color="danger" href="#">
      Danger
    </Link>
  </div>
</template>
:::

### Polymorphic Component

The `as` prop lets you customize the HTML element or Vue component used to render the link.

:::sfc
<script setup>
import { Button } from "@heroui-vue/button";
import { Link } from "@heroui-vue/link";
</script>

<template>
  <Button
    showAnchorIcon
    :as="Link"
    color="primary"
    href="https://github.com/heroui-inc/heroui"
    variant="solid"
  >
    Button Link
  </Button>
</template>

:::

### Routing

Use native `href` links, or pass a Vue router link component with `as` and its routing props (such as `to`). Router setup belongs to your application.

:::sfc
<script setup>
import { Link } from "@heroui-vue/link";
</script>

<template>
  <div class="flex gap-2">
    <Link href="/home">Home</Link>
    <Link href="/about">About</Link>
  </div>
</template>
:::

### Custom Implementation

Use the `useLink` composable to create your own implementation.

```vue
<script setup lang="ts">
import { mergeProps, ref, useAttrs } from "vue";
import { useLink, type UseLinkProps } from "@heroui-vue/link";
import { LinkIcon } from "@heroui-vue/icon";
import { linkAnchorClasses } from "@heroui/theme";

defineOptions({ inheritAttrs: false });
const props = defineProps<UseLinkProps>();
const attrs = useAttrs();
const el = ref<HTMLElement | null>(null);
const { as, linkProps, showAnchorIcon } = useLink(props, el);
</script>

<template>
  <component :is="as" ref="el" v-bind="mergeProps(attrs, { ...linkProps })">
    <slot />
    <slot v-if="showAnchorIcon" name="anchorIcon">
      <LinkIcon :class="linkAnchorClasses" />
    </slot>
  </component>
</template>
```

## Data Attributes

`Link` exposes these attributes on the base element:

- **data-focus**: When the link is focused.
- **data-focus-visible**: When the link has a visible keyboard focus ring.
- **data-disabled**: When `isDisabled` is true.

## Accessibility

- Supports mouse, touch, and keyboard interactions.
- Supports navigation with `<a>` elements or custom element types with ARIA.
- Supports disabled links.
- Keyboard users can activate links with **Enter**.

## API

### Link Props

`anchorIcon` is a Vue named slot. Event handlers receive native DOM events or a `LinkPressEvent` (`type`, `pointerType`, `target`, modifier keys, `x`, `y`), rather than React events.

| Prop               | Type                                                            | Default    | Description                                                            |
| ------------------ | --------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `size`             | `sm / md / lg`                                                  | `md`       | The size of the link.                                                  |
| `color`            | `foreground / primary / secondary / success / warning / danger` | `primary`  | The color of the link.                                                 |
| `underline`        | `none / hover / always / active / focus`                        | `none`     | The underline style.                                                   |
| `href`             | `string`                                                        | `—`        | The destination URL.                                                   |
| `target`           | `HTMLAttributeAnchorTarget`                                     | `—`        | The target browsing context.                                           |
| `rel`              | `string`                                                        | `—`        | The relationship to the linked resource.                               |
| `download`         | `boolean / string`                                              | `—`        | Download the resource, optionally with a file name.                    |
| `ping`             | `string`                                                        | `—`        | Space-separated URLs to ping when following the link.                  |
| `referrerPolicy`   | `HTMLAttributeReferrerPolicy`                                   | `—`        | The referrer policy when following the link.                           |
| `isExternal`       | `boolean`                                                       | `false`    | Open in a new tab by default. Explicit target and rel take precedence. |
| `showAnchorIcon`   | `boolean`                                                       | `false`    | Show the anchor icon.                                                  |
| `anchorIcon`       | `slot`                                                          | `LinkIcon` | The named slot for a custom anchor icon.                               |
| `isBlock`          | `boolean`                                                       | `false`    | Render with a block hover effect.                                      |
| `isDisabled`       | `boolean`                                                       | `false`    | Disable navigation and activation.                                     |
| `disableAnimation` | `boolean`                                                       | `false`    | Disable link and block animations.                                     |

### Link Events

| Event          | Type                              | Description                                                    |
| -------------- | --------------------------------- | -------------------------------------------------------------- |
| `@press`       | `(event: LinkPressEvent) => void` | A press is released over the target.                           |
| `@pressStart`  | `(event: LinkPressEvent) => void` | A press starts.                                                |
| `@pressEnd`    | `(event: LinkPressEvent) => void` | A press ends or leaves the target.                             |
| `@pressChange` | `(event: boolean) => void`        | The pressed state changes.                                     |
| `@pressUp`     | `(event: LinkPressEvent) => void` | A press is released over the target.                           |
| `@keydown`     | `(event: KeyboardEvent) => void`  | A key is pressed.                                              |
| `@keyup`       | `(event: KeyboardEvent) => void`  | A key is released.                                             |
| `@click`       | `(event: MouseEvent) => void`     | Native click; prefer @press for device-independent activation. |
