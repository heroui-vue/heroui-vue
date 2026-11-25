# User

[HeroUI User Docs](https://v2.heroui.com/docs/components/user)

The User component combines an avatar, name, and description to display user information.

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/user
```

```sh [pnpm]
pnpm add @heroui-vue/user
```

```sh [yarn]
yarn add @heroui-vue/user
```

```sh [bun]
bun add @heroui-vue/user
```
:::

> [!NOTE]
> With [global installation](/en/guide/installation#global-installation), you can skip this step.

## Import

::: code-group
```js [Individual]
import { User } from "@heroui-vue/user";
```

```js [Global]
import { User } from "heroui-vue";
```
:::

## Usage

Configure the avatar with `avatarProps` and provide the user's name and description through the `name` and `description` slots. See the [Avatar docs](/en/components/avatar) for more avatar props.

:::sfc
<script setup>
import { User } from "@heroui-vue/user";
</script>

<template>
  <User :avatarProps="{ src: 'https://i.pravatar.cc/150?u=a04258114e29026702d', name: 'Jane Doe' }">
    <template #name>Jane Doe</template>
    <template #description>Product Designer</template>
  </User>
</template>
:::

### Link Description

The description slot accepts custom content, including links. This example uses HeroUI Vue's `Link` to display a user's social profile.

:::sfc
<script setup>
import { User } from "@heroui-vue/user";
import { Link } from "@heroui-vue/link";
</script>

<template>
  <User :avatarProps="{ src: 'https://avatars.githubusercontent.com/u/30373425?v=4', name: 'Junior Garcia' }">
    <template #name>Junior Garcia</template>
    <template #description>
      <Link isExternal href="https://x.com/jrgarciadev" size="sm">@jrgarciadev</Link>
    </template>
  </User>
</template>
:::

## Style Slots

Use `classNames` to set Tailwind CSS classes for each part of the User:

- **base**: The root container.
- **wrapper**: The container for the name and description.
- **name**: The name text.
- **description**: The description content.

## Data Attributes

When User receives focus, the root element has `data-focus="true"`.

:::tip
The current implementation does not yet provide a keyboard `data-focus-visible` state.
:::

## Accessibility

- Provide the name and description through text slots so the user information is available to assistive technology.
- The root element defaults to a `div` and is not included in the Tab order. Set `isFocusable` when keyboard focus is needed.
- `isFocusable` does not add button semantics or interaction by itself. Set `as="button"` for a button element and add the relevant event handlers.
- Alternative text, initials, and image fallback behavior are handled by the internal `Avatar`. Configure it with `avatarProps`; see the [Avatar docs](/en/components/avatar).

## API

### User Props

| Prop          | Type                                                                                                         | Default                  | Description                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------- |
| `as`          | `string / Component`                                                                                         | `div`                    | The root element or Vue component.                                                                  |
| `isFocusable` | `boolean`                                                                                                    | `false`                  | Includes the root element in the Tab order. Focus is also enabled automatically when `as="button"`. |
| `avatarProps` | `Partial<UseAvatarProps>`                                                                                    | `{ isFocusable: false }` | Props forwarded to the internal `Avatar`, such as `src`, `name`, `size`, and `color`.               |
| `classNames`  | `Partial<Record<"base" \| "wrapper" \| "name" \| "description", string \| false \| 0 \| null \| undefined>>` | —                        | Custom class names for each style slot.                                                             |
| `class`       | `string`                                                                                                     | —                        | Additional classes for the root element.                                                            |

### User Slots

| Slot          | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| `name`        | The user's name.                                                        |
| `description` | The description content; can contain text, links, or other Vue content. |
