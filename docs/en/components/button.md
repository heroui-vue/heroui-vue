<script setup>
import { Button } from '@heroui-vue/core/raw'
</script>

# Button

Allows users to perform actions and make choices with a single tap

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/button
```

```sh [pnpm]
pnpm add @heroui-vue/button
```

```sh [yarn]
yarn add @heroui-vue/button
```

```sh [bun]
bun add @heroui-vue/button
```
:::

> [!NOTE]
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import

::: code-group
```js [On-demand import]
import { Button } from "@heroui-vue/button";
```

```js [Global import]
import { Button } from "heroui-vue";
```
:::

## Usage

::: component-view
<Button color="primary">Button</Button>
:::

### Disabled

Button will be unclickable

::: component-view
<Button color="primary" isDisabled>Button</Button>
:::

### Sizes

Display buttons in different sizes

::: component-view
<div class="flex gap-4 items-center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
</div>
:::

### Radius

Display buttons with different border radius

::: component-view
<div className="flex gap-4 items-center">
  <Button radius="full">Full</Button>
  <Button radius="lg">Large</Button>
  <Button radius="md">Medium</Button>
  <Button radius="sm">Small</Button>
  <Button radius="none">None</Button>
</div>
:::

### Colors

Display buttons in different colors

::: component-view
<div class="flex flex-wrap gap-4 items-center">
  <Button color="default">Default</Button>
  <Button color="primary">Primary</Button>
  <Button color="secondary">Secondary</Button>
  <Button color="success">Success</Button>
  <Button color="warning">Warning</Button>
  <Button color="danger">Danger</Button>
</div>
:::

### Variants

Display different types of buttons

::: component-view
<div className="flex flex-wrap gap-4 items-center">
  <Button color="primary" variant="solid">
    Solid
  </Button>
  <Button color="primary" variant="faded">
    Faded
  </Button>
  <Button color="primary" variant="bordered">
    Bordered
  </Button>
  <Button color="primary" variant="light">
    Light
  </Button>
  <Button color="primary" variant="flat">
    Flat
  </Button>
  <Button color="primary" variant="ghost">
    Ghost
  </Button>
  <Button color="primary" variant="shadow">
    Shadow
  </Button>
</div>
:::

### Loading

Pass the `isLoading` prop to show a `Spinner` component inside the button.

:::warning
Work in progress
:::

You can also customize the loading spinner by passing a custom component to the `spinner` slot.

::: component-view
<Button color="secondary" isLoading>
  <template #spinner>
      <svg
          class="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
          />
          <path
              class="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
          />
      </svg>
  </template>
  Loading
</Button>
:::

The `spinner` slot is displayed at the start position of the button by default, you can also display custom components at the end position of the button by specifying `spinnerPlacement`.

::: component-view
<Button color="secondary" spinnerPlacement="end" isLoading>
  <template #spinner>
      <svg
          class="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
          />
          <path
              class="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
          />
      </svg>
  </template>
  Loading
</Button>
:::

### With Icons

You can add icons by passing the `startContent` or `endContent` slots.

::: component-view
<div className="flex gap-4 items-center">
  <Button color="success">
    <template #endContent>
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
    </template>
    Take a photo
  </Button>
  <Button color="danger" variant="bordered">
    <template #startContent>
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          >
            <path
              d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
            />
            <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" />
          </g>
        </svg>
    </template>
    Delete user
  </Button>
</div>
:::

### Icon Only

You can also display a button without text by passing the `isIconOnly` prop and the desired icon as the default child.

::: component-view
<div className="flex gap-4 items-center">
    <Button isIconOnly aria-label="Like" color="danger">
        <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
    </Button>
    <Button isIconOnly aria-label="Take a photo" color="warning" variant="faded">
        <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
    </Button>
</div>
:::

### Custom Styles

You can customize the Button component by passing custom Tailwind CSS classes to the component slots.

::: component-view
<Button
class="bg-gradient-to-tr from-pink-500 to-yellow-500 bg-sky-500 text-white shadow-lg"
radius="full"

>

Button
</Button>
:::

### Disable Ripple

Button will not show ripple effect when pressed

::: component-view
<Button disableRipple>
  Button
</Button>
:::

### Disable Animation

Button will not show animation effect when pressed

::: component-view
<Button disableAnimation>
  Button
</Button>
:::

## Data Attributes

`Button` has the following attributes on the `base` element:

- **data-hover**:
  When the button is being hovered. Based on [useElementHover](https://vueuse.org/core/useElementHover/#useelementhover)
- **data-focus**:
  When the button is being focused. Based on [useFocus](https://vueuse.org/core/useFocus/#usefocus).
- **data-focus-visible**: Not supported yet, default to `false`.
- **data-disabled**:
  When the button is disabled. Based on `isDisabled` prop.
- **data-pressed**:
  When the button is pressed. Based on [useMousePressed](https://vueuse.org/core/useMousePressed/#usemousepressed)
- **data-loading**:
  When the button is loading. Based on `isLoading` prop.

## Accessibility

:::info
Some features may not be perfect, if you find any problems, please submit an issue
:::

- Button has role of `button`(Not supported yet, plan to support).
- Keyboard event support for <Kbd>Space</Kbd> and <Kbd>Enter</Kbd> keys.
- Mouse and touch event handling, and press state management.
- Keyboard focus management and cross browser normalization.

:heart:From HeroUI: We recommend to read this [blog post](https://react-spectrum.adobe.com/blog/building-a-button-part-1.html) about the complexities of
building buttons that work well across devices and interaction methods.

## API

### Button Props

| Name             | Type                                                                           | Default     | Description                                                  |
| ---------------- | ------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------ |
| variant          | `"solid" \| "bordered" \| "light" \| "flat" \| "faded" \| "shadow" \| "ghost"` | `"solid"`   | The button appearance style.                                 |
| color            | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"`  | `"default"` | The button color theme.                                      |
| size             | `"sm" \| "md" \| "lg"`                                                         | `"md"`      | The Button size                                              |
| radius           | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                     | `"md"`      | The button border radius.                                    |
| spinnerPlacement | `"start" \| "end"`                                                             | `"start"`   | The spinner placement.                                       |
| fullWidth        | `boolean`                                                                      | `false`     | Whether the button should take the full width of its parent. |
| isIconOnly       | `boolean`                                                                      | `false`     | Whether the button should have the same width and height.    |
| isDisabled       | `boolean`                                                                      | `false`     | Whether the button is disabled.                              |
| isLoading        | `boolean`                                                                      | `false`     | Whether the button is loading.                               |
| disableRipple    | `boolean`                                                                      | `false`     | Whether the button should display a ripple effect on press.  |
| disableAnimation | `boolean`                                                                      | `false`     | Whether the button should display animations.                |

### Button Slots

| Name         | Scope | Description             |
| ------------ | ----- | ----------------------- |
| default      | -     | The default slot.       |
| startContent | -     | The start content slot. |
| endContent   | -     | The end content slot.   |
| spinner      | -     | The spinner slot.       |

### Button Events (WIP)

| Name        | Type                           | Default |
| ----------- | ------------------------------ | ------- |
| press       | `(e: PressEvent) => void`      | -       |
| pressStart  | `(e: PressEvent) => void`      | -       |
| pressEnd    | `(e: PressEvent) => void`      | -       |
| pressChange | `(isPressed: boolean) => void` | -       |
| pressUp     | `(e: PressEvent) => void`      | -       |
| keyDown     | `(e: KeyboardEvent) => void`   | -       |
| keyUp       | `(e: KeyboardEvent) => void`   | -       |
