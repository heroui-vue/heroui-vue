# Switch

[HeroUI Switch Docs](https://v2.heroui.com/docs/components/switch)

Switch represents on and off states, typically for toggling a setting.

::: warning Implementation status
The Vue version currently provides switch styling and content slots, but its interaction logic is incomplete. The examples below demonstrate appearance, not functional form controls.

The hidden input does not yet have `type="checkbox"` or `role="switch"`, checked-state bindings, or change handlers. `isSelected`, `defaultSelected`, form attributes, and keyboard toggling are not fully wired up. Do not assume the React version's controlled usage or accessibility guarantees apply to this implementation.
:::

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/switch
```

```sh [pnpm]
pnpm add @heroui-vue/switch
```

```sh [yarn]
yarn add @heroui-vue/switch
```

```sh [bun]
bun add @heroui-vue/switch
```
:::

## Import

```js
import { Switch } from "@heroui-vue/switch";
```

## Usage

Use the `label` named slot for the label. The current implementation does not render default-slot content.

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch>
    <template #label>Enable notifications</template>
  </Switch>
</template>
:::

### Disabled

`isDisabled` applies disabled styling and suppresses the pressed state. It does not currently set the native `disabled` attribute on the input.

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch isDisabled>
    <template #label>Disabled switch</template>
  </Switch>
</template>
:::

### Sizes

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Switch size="sm"><template #label>Small</template></Switch>
    <Switch size="md"><template #label>Medium</template></Switch>
    <Switch size="lg"><template #label>Large</template></Switch>
  </div>
</template>
:::

### Colors

`color` sets the selected-state theme color. Since selection is not wired up yet, the current preview only shows the unselected appearance.

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Switch color="default"><template #label>Default</template></Switch>
    <Switch color="primary"><template #label>Primary</template></Switch>
    <Switch color="secondary"><template #label>Secondary</template></Switch>
    <Switch color="success"><template #label>Success</template></Switch>
    <Switch color="warning"><template #label>Warning</template></Switch>
    <Switch color="danger"><template #label>Danger</template></Switch>
  </div>
</template>
:::

### With Thumb Icon

Customize the icon inside the thumb with the `thumbIcon` scoped slot. Bind its slot props to the icon to preserve theme sizing and styling.

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch size="lg">
    <template #thumbIcon="iconProps">
      <svg v-bind="iconProps" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
      </svg>
    </template>
    <template #label>Appearance settings</template>
  </Switch>
</template>
:::

### With Icons

Use the `startContent` and `endContent` named slots for icons at either end of the switch, rather than React node props.

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch size="lg">
    <template #startContent="iconProps">
      <svg v-bind="iconProps" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" />
      </svg>
    </template>
    <template #endContent="iconProps">
      <svg v-bind="iconProps" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z" />
      </svg>
    </template>
    <template #label>Theme</template>
  </Switch>
</template>
:::

## Style Slots

Use `classNames` to assign Tailwind CSS classes to each part. These style slots are separate from Vue content slots.

- **base**: The outer container, rendered as a `label` by default.
- **wrapper**: The track containing the start icon, end icon, and thumb.
- **hiddenInput**: The internal hidden input.
- **thumb**: The circular thumb.
- **label**: The label text container.
- **startContent**: The icon at the start of the switch.
- **endContent**: The icon at the end of the switch.
- **thumbIcon**: The icon inside the thumb.

### Custom Styles

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
</script>

<template>
  <Switch
    :classNames="{
      base: 'inline-flex max-w-md w-full flex-row-reverse justify-between gap-4 rounded-lg bg-content1 p-4 shadow-sm',
      wrapper: 'mr-0',
      label: 'text-small',
      thumb: 'shadow-md',
    }"
  >
    <template #label>
      <div class="flex flex-col gap-1">
        <span>Marketing emails</span>
        <span class="text-tiny text-default-400">Receive product updates and promotions.</span>
      </div>
    </template>
  </Switch>
</template>
:::

### Custom Implementation

The package also exports `useSwitch` and `UseSwitchProps` for building your own component. The composable provides `baseProps`, `inputProps`, `wrapperProps`, `thumbProps`, `labelProps`, and icon props and render functions.

`useSwitch` shares the same incomplete interaction logic as `Switch`. It does not add state synchronization, form integration, or keyboard support.

## Data Attributes

The following attributes are set on the `base` element with boolean values. Use value selectors such as `[data-selected=true]` in custom styles, rather than testing only for attribute presence.

| Attribute            | Current behavior                                                                |
| -------------------- | ------------------------------------------------------------------------------- |
| `data-selected`      | Internal selected state; not fully synchronized with the input or `isSelected`. |
| `data-pressed`       | Mouse-pressed state of the container; `false` when disabled or read-only.       |
| `data-readonly`      | Reflects `isReadOnly`.                                                          |
| `data-hover`         | Hover state of the container.                                                   |
| `data-focus`         | Focus state of the container; does not yet track focus on the inner input.      |
| `data-focus-visible` | Currently always `false`.                                                       |
| `data-disabled`      | Enabled when either `isDisabled` or `isReadOnly` is true.                       |

## Accessibility

Switch semantics, input labeling, keyboard toggling, and focus visibility are not yet complete. The `label` slot renders visible text, but does not imply complete assistive-technology support. Do not use this component in production scenarios that require accessible or functional form interactions until these capabilities are implemented.

## API

### Switch Props

| Prop               | Type                                                         | Default   | Description                                                                   |
| ------------------ | ------------------------------------------------------------ | --------- | ----------------------------------------------------------------------------- |
| `as`               | `string / Component`                                         | `label`   | The outer element or Vue component.                                           |
| `size`             | `sm / md / lg`                                               | `md`      | The switch size.                                                              |
| `color`            | `default / primary / secondary / success / warning / danger` | `primary` | The selected-state theme color.                                               |
| `isDisabled`       | `boolean`                                                    | `—`       | Applies disabled styling; does not yet set the native input's disabled state. |
| `isReadOnly`       | `boolean`                                                    | `false`   | Sets the read-only marker and disabled styling; not yet bound to the input.   |
| `disableAnimation` | `boolean`                                                    | `false`   | Disables theme animations.                                                    |
| `class`            | `string`                                                     | `—`       | Custom classes for the outer container.                                       |
| `classNames`       | `Partial<Record<ToggleSlots, string>>`                       | `—`       | Custom classes for each style slot.                                           |

The following props are declared in `UseSwitchProps`, but are not yet connected to input behavior:

| Prop                  | Type      | Default | Current limitation                                                                                 |
| --------------------- | --------- | ------- | -------------------------------------------------------------------------------------------------- |
| `isSelected`          | `boolean` | `—`     | Controlled selection is not supported yet.                                                         |
| `defaultSelected`     | `boolean` | `false` | Only initializes internal state; may be overwritten by the input's `checked` value after mounting. |
| `value`               | `string`  | `''`    | Not yet bound to the input.                                                                        |
| `name`                | `string`  | `—`     | Not yet bound to the input.                                                                        |
| `form`                | `string`  | `—`     | Not yet bound to the input.                                                                        |
| `autoFocus`           | `boolean` | `false` | Autofocus is not implemented yet.                                                                  |
| `excludeFromTabOrder` | `boolean` | `—`     | Tab-order control is not implemented yet.                                                          |

### Switch Content Slots

| Slot           | Scoped props                       | Description                          |
| -------------- | ---------------------------------- | ------------------------------------ |
| `label`        | None                               | The visible label content.           |
| `thumbIcon`    | `width, height, class, isSelected` | The icon inside the thumb.           |
| `startContent` | `width, height, class`             | The icon at the start of the switch. |
| `endContent`   | `width, height, class`             | The icon at the end of the switch.   |

Icon slots receive `width` and `height` values of `1em`. The `thumbIcon` slot does not currently receive `data-checked`; do not rely on that field in the type declaration. Although declared in the slot types, the `default` slot is not currently rendered; use `#label` instead.

### Switch Events and Controlled State

The component does not currently declare `update:isSelected` or `valueChange` events and does not support `v-model:isSelected`. A fallthrough `@change` listener is attached to the outer container, not a complete selection-change API. Since the input does not yet implement switch toggling either, no controlled example is provided here.
