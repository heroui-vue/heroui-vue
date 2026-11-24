# Switch

[HeroUI Switch Docs](https://v2.heroui.com/docs/components/switch)

Switch represents on and off states, typically for toggling a setting.

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
  <Switch defaultSelected>
    Enable notifications
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
  <Switch isDisabled defaultSelected>
    Disabled switch
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
    <Switch size="sm" defaultSelected>Small</Switch>
    <Switch size="md" defaultSelected>Medium</Switch>
    <Switch size="lg" defaultSelected>Large</Switch>
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
    <Switch color="default" defaultSelected>Default</Switch>
    <Switch color="primary" defaultSelected>Primary</Switch>
    <Switch color="secondary" defaultSelected>Secondary</Switch>
    <Switch color="success" defaultSelected>Success</Switch>
    <Switch color="warning" defaultSelected>Warning</Switch>
    <Switch color="danger" defaultSelected>Danger</Switch>
  </div>
</template>
:::

### With Thumb Icon

Customize the icon inside the thumb with the `thumbIcon` scoped slot. Bind its slot props to the icon to preserve theme sizing and styling.

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
import { SunIcon, MoonIcon } from "@heroui-vue/icon";
</script>

<template>
  <Switch defaultSelected color="secondary" size="lg">
    <template #thumbIcon="{ isSelected }">
      <component :is="isSelected ? SunIcon : MoonIcon" size="1em"></component>
    </template>
    Dark mode
  </Switch>
</template>

:::

### With Icons

Use the `startContent` and `endContent` named slots for icons at either end of the switch, rather than React node props.

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
import { SunIcon, MoonIcon } from "@heroui-vue/icon";
</script>

<template>
  <Switch defaultSelected color="success" size="lg">
    <template #startContent>
      <SunIcon size="1em" />
    </template>
    <template #endContent>
      <MoonIcon size="1em" />
    </template>
    Dark mode
  </Switch>
</template>
:::

### Controlled

:::sfc
<script setup>
import { ref } from "vue";
import { Switch } from "@heroui-vue/switch";

const isSelected = ref(true);
</script>

<template>
  <div class="flex flex-col gap-2">
    <Switch v-model="isSelected">
      Airplane mode
    </Switch>
    <p class="text-small text-default-500">Selected: {{ isSelected }}</p>
  </div>
</template>
:::

## Style Slots

Use `classNames` to assign Tailwind CSS classes to each part. These style slots are separate from Vue content slots.

- **base**: The outer container, rendered as a `label` by default.
- **wrapper**: The track containing the start icon, end icon, and thumb.
- **hiddenInput**: The internal hidden input.
- **thumb**: The circular thumb.
- **default**: The label text container.
- **startContent**: The icon at the start of the switch.
- **endContent**: The icon at the end of the switch.
- **thumbIcon**: The icon inside the thumb.

### Custom Styles

:::sfc
<script setup>
import { Switch } from "@heroui-vue/switch";
import { cn } from "@heroui/theme";
</script>

<template>
  <Switch
    :classNames="{
      base: cn(
        'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
        'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
        'data-[selected=true]:border-primary',
      ),
      wrapper: 'p-0 h-4 overflow-visible',
      thumb: cn(
        'w-6 h-6 border-2 shadow-lg',
        'group-data-[hover=true]:border-primary',
        'group-data-[selected=true]:ms-6',
        'group-data-[pressed=true]:w-7',
        'group-data-pressed:group-data-selected:ms-4',
      ),
    }"
  >
    <div class="flex flex-col gap-1">
      <p class="text-medium">Enable early access</p>
      <p class="text-tiny text-default-400">Get access to new features before they are released.</p>
    </div>
  </Switch>
</template>
:::

### Custom Implementation

The package also exports `useSwitch` and `UseSwitchProps` for building your own component. The composable provides `baseProps`, `inputProps`, `wrapperProps`, `thumbProps`, `labelProps`, and icon props and render functions.

`useSwitch` shares the same interaction logic as `Switch` and provides state synchronization. Form integration and keyboard support are **not yet supported**.

## Data Attributes

The following attributes are set on the `base` element.

| Attribute            | Current behavior                                                                |
| -------------------- | ------------------------------------------------------------------------------- |
| `data-selected`      | Internal selected state; not fully synchronized with the input or `isSelected`. |
| `data-pressed`       | Mouse-pressed state of the container.                                           |
| `data-readonly`      | Reflects `isReadOnly`.                                                          |
| `data-hover`         | Hover state of the container.                                                   |
| `data-focus`         | Focus state of the container; does not yet track focus on the inner input.      |
| `data-focus-visible` | Absent by default.                                                              |
| `data-disabled`      | Enabled when either `isDisabled` or `isReadOnly` is `true`.                     |

## Accessibility

Not yet supported.

## API

Refer to the component types.
