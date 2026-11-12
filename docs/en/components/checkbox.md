<script setup>
import { ref } from 'vue'
import { Checkbox } from '@heroui-vue/core/raw'

const isSelected = ref(false)
const customSelected = ref(true)
</script>

# Checkbox

Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected.

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/checkbox
```

```sh [pnpm]
pnpm add @heroui-vue/checkbox
```

```sh [yarn]
yarn add @heroui-vue/checkbox
```

```sh [bun]
bun add @heroui-vue/checkbox
```
:::

> [!NOTE]
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import

::: code-group
```js [On-demand import]
import { Checkbox } from "@heroui-vue/checkbox";
```

```js [Global import]
import { Checkbox } from "heroui-vue";
```
:::

## Usage

::: sfc
<Checkbox :defaultSelected="true">Option</Checkbox>
:::

### Disabled

::: sfc
<div class="flex gap-4">
  <Checkbox isDisabled>Option</Checkbox>
  <Checkbox :defaultSelected="true" isDisabled>Option</Checkbox>
</div>
:::

### Sizes

::: sfc
<div class="flex gap-4">
  <Checkbox :defaultSelected="true" size="sm">Small</Checkbox>
  <Checkbox :defaultSelected="true" size="md">Medium</Checkbox>
  <Checkbox :defaultSelected="true" size="lg">Large</Checkbox>
</div>
:::

### Colors

::: sfc
<div class="flex gap-4 flex-wrap">
  <Checkbox :defaultSelected="true" color="default">Default</Checkbox>
  <Checkbox :defaultSelected="true" color="primary">Primary</Checkbox>
  <Checkbox :defaultSelected="true" color="secondary">Secondary</Checkbox>
  <Checkbox :defaultSelected="true" color="success">Success</Checkbox>
  <Checkbox :defaultSelected="true" color="warning">Warning</Checkbox>
  <Checkbox :defaultSelected="true" color="danger">Danger</Checkbox>
</div>
:::

### Radius

::: sfc
<div class="flex gap-4 flex-wrap">
  <Checkbox :defaultSelected="true" radius="full">Full</Checkbox>
  <Checkbox :defaultSelected="true" radius="lg">Large</Checkbox>
  <Checkbox :defaultSelected="true" radius="md">Medium</Checkbox>
  <Checkbox :defaultSelected="true" radius="sm">Small</Checkbox>
  <Checkbox :defaultSelected="true" radius="none">None</Checkbox>
</div>
:::

### Indeterminate

The `isIndeterminate` prop sets a `Checkbox` to an indeterminate state, overriding its appearance and maintaining it until set to `false`, regardless of user interaction.

::: sfc
<Checkbox isIndeterminate>Option</Checkbox>
:::

### Line Through

::: sfc
<Checkbox :defaultSelected="true" lineThrough>Option</Checkbox>
:::

### Custom Check Icon

> By default, HeroUI React passes `IconProps` to your icon component. In HeroUI Vue, use the `icon` slot for custom icons.

::: sfc
<div class="flex gap-4">
  <Checkbox :defaultSelected="true">
    <template #icon>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z" />
      </svg>
    </template>
    Option
  </Checkbox>
  <Checkbox :defaultSelected="true" color="warning">
    <template #icon>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <path d="M6 12H18" />
        <path d="M12 18V6" />
      </svg>
    </template>
    Option
  </Checkbox>
</div>
:::

### Controlled

::: sfc
<div class="flex flex-col gap-2">
  <Checkbox v-model="isSelected">Subscribe (controlled)</Checkbox>
  <p class="text-default-500">Selected: {{ isSelected ? 'true' : 'false' }}</p>
</div>
:::

> **Note**: HeroUI Vue `Checkbox` supports `@change` and `@valueChange` for form integration.

## Slots

- **base**: Checkbox wrapper, it handles alignment, placement, and general appearance.
- **wrapper**: An inner container that includes styles for relative positioning, flex properties, overflow handling and managing hover and selected states.
- **hiddenInput**: The hidden input element that is used to handle the checkbox state.
- **icon**: Icon within the checkbox, controlling size, visibility, and changes when checked.
- **label**: The text associated with the checkbox.

### Custom Styles

You can customize the `Checkbox` component by passing custom Tailwind CSS classes to the component slots.

::: sfc
<Checkbox
v-model="customSelected"
aria-label="custom checkbox"
:classNames="{
base: 'inline-flex w-full max-w-md bg-content1 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary',
label: 'w-full',
}"

>

  <div class="w-full flex justify-between gap-2">
    <div class="flex flex-col">
      <span class="font-medium">Junior Garcia</span>
      <span class="text-sm text-default-500">@jrgarciadev</span>
    </div>
    <div class="text-right">
      <div class="text-tiny text-default-500">Software Developer</div>
      <span class="text-success text-sm">Active</span>
    </div>
  </div>
</Checkbox>
:::

### Custom Implementation

In case you need to customize the checkbox even further, HeroUI React offers `useCheckbox`. HeroUI Vue does not expose this hook yet.

::: sfc
<label class="inline-flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer">
  <input type="checkbox" checked />
  <span>Enabled (native custom implementation)</span>
</label>
:::

> **Note**: We used [Tailwind Variants](https://www.tailwind-variants.org/) upstream. In Vue you can use any class utility approach.

## Data Attributes

`Checkbox` has the following attributes on the `base` element:

- **data-selected**: When the checkbox is checked. Based on `isSelected`/`modelValue`.
- **data-pressed**: When the checkbox is pressed.
- **data-invalid**: When the checkbox is invalid. Based on `isInvalid`.
- **data-readonly**: When the checkbox is readonly. Based on `isReadOnly`.
- **data-indeterminate**: When the checkbox is indeterminate. Based on `isIndeterminate`.
- **data-hover**: When the checkbox is being hovered.
- **data-disabled**: When the checkbox is disabled. Based on `isDisabled`.

## Accessibility

- Built with a native HTML `<input>` element.
- Full support for browser features like form autofill.
- Keyboard focus management and cross browser normalization.
- Keyboard event support for `Tab` and `Space` keys.
- Labeling support for assistive technology.
- Indeterminate state support.

## API

### Checkbox Props

| Attribute        | Type                                                                | Description                                                                 | Default   |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- |
| children         | `VNodeChild`                                                        | The label of the checkbox.                                                  | `-`       |
| icon             | `CheckboxIconProps`                                                 | Upstream React prop. In Vue, use `#icon` slot.                              | `-`       |
| value            | `string \| number`                                                  | The value of the checkbox element, used when submitting an HTML form.       | `-`       |
| name             | `string`                                                            | The name of the checkbox element, used when submitting an HTML form.        | `-`       |
| size             | `sm \| md \| lg`                                                    | The size of the checkbox.                                                   | `md`      |
| color            | `default \| primary \| secondary \| success \| warning \| danger`   | The color of the checkbox.                                                  | `primary` |
| radius           | `none \| sm \| md \| lg \| full`                                    | The radius of the checkbox.                                                 | `-`       |
| lineThrough      | `boolean`                                                           | Whether the label should be crossed out.                                    | `false`   |
| isSelected       | `boolean`                                                           | Whether the element should be selected (controlled).                        | `-`       |
| defaultSelected  | `boolean`                                                           | Whether the element should be selected (uncontrolled).                      | `-`       |
| isRequired       | `boolean`                                                           | Upstream React prop. Not yet implemented in Vue checkbox.                   | `false`   |
| isReadOnly       | `boolean`                                                           | Whether the checkbox can be selected but not changed by the user.           | `-`       |
| isDisabled       | `boolean`                                                           | Whether the checkbox is disabled.                                           | `false`   |
| isIndeterminate  | `boolean`                                                           | Indeterminate visual representation remains regardless of user interaction. | `-`       |
| isInvalid        | `boolean`                                                           | Whether the checkbox is invalid.                                            | `false`   |
| validationState  | `valid \| invalid`                                                  | Upstream deprecated prop. Use `isInvalid`.                                  | `-`       |
| disableAnimation | `boolean`                                                           | Whether the animation should be disabled.                                   | `false`   |
| classNames       | `Partial<Record<"base" \| "wrapper" \| "icon" \| "label", string>>` | Allows setting custom classes for checkbox slots.                           | `-`       |

### Checkbox Events

| Attribute     | Type                            | Description                                                | Default |
| ------------- | ------------------------------- | ---------------------------------------------------------- | ------- |
| onChange      | `(isSelected: boolean) => void` | Called when selection changes. In Vue, use `@change`.      | `-`     |
| onValueChange | `(isSelected: boolean) => void` | Called when selection changes. In Vue, use `@valueChange`. | `-`     |

### Types

#### Checkbox Icon Props

```ts
type IconProps = {
  "data-checked": string;
  isSelected: boolean;
  isIndeterminate: boolean;
  disableAnimation: boolean;
  className: string;
};

type CheckboxIconProps = ReactNode | ((props: IconProps) => ReactNode);
```

> In HeroUI Vue, custom icon is provided via `#icon` slot.

###
