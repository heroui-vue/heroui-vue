<script setup>
import { ref } from 'vue'
import { Accordion, AccordionItem, Avatar } from '@heroui-vue/core/raw'

const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const selectedKey = ref('1')
</script>

# Accordion

Accordion display a list of high-level options that can expand/collapse to reveal more information.

## Installation

::: code-group
```sh [npm]
npm add @heroui-vue/accordion
```

```sh [pnpm]
pnpm add @heroui-vue/accordion
```

```sh [yarn]
yarn add @heroui-vue/accordion
```

```sh [bun]
bun add @heroui-vue/accordion
```
:::

> [!NOTE]
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import

HeroUI exports 2 accordion-related components:

- **Accordion**: The main component to display a list of accordion items.
- **AccordionItem**: The item component to display a single accordion item.

::: code-group
```js [On-demand import]
import { Accordion, AccordionItem } from "@heroui-vue/accordion";
```

```js [Global import]
import { Accordion, AccordionItem } from "heroui-vue";
```
:::

## Usage

::: component-view
<Accordion>
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### With Subtitle

::: component-view
<Accordion>
  <AccordionItem itemKey="1" title="Accordion 1" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <template #subtitle>
      <span>Press to expand <strong>key 2</strong></span>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### Expand multiple items

If you set `selectionMode` to `multiple`, then the `Accordion` will allow multiple items to be expanded at the same time.

::: component-view
<Accordion selectionMode="multiple">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### Compact

If you set `isCompact` to `true`, the `Accordion` will be displayed in a compact style.

::: component-view
<Accordion isCompact>
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### Variants

Accordion has 4 variants: `light`, `shadow`, `bordered` and `splitted`.

#### Light variant

::: component-view
<Accordion variant="light">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

#### Shadow variant

::: component-view
<Accordion variant="shadow">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

#### Bordered variant

::: component-view
<Accordion variant="bordered">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

#### Splitted variant

::: component-view
<Accordion variant="splitted">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### Default expanded keys

If you want to expand some items by default, you can set the `defaultExpandedKeys` property to an array of keys.

::: component-view
<Accordion :defaultExpandedKeys="['2']">
  <AccordionItem itemKey="1" title="Accordion 1" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2" subtitle="Press to expand"><span>Press to expand <strong>key 2</strong></span>{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### Disabled keys

If you want to disable some items, you can set the `disabledKeys` property to an array of keys.

::: component-view
<Accordion :disabledKeys="['2']">
  <AccordionItem itemKey="1" title="Accordion 1" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3" subtitle="Press to expand">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### Start content

If you want to display some content before the accordion items, you can set the `startContent` property.

::: component-view
<Accordion selectionMode="multiple">
  <AccordionItem itemKey="1" title="Chung Miller" subtitle="4 unread messages">
    <template #startContent>
      <Avatar isBordered color="primary" radius="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="2" title="Janelle Lenard" subtitle="3 incompleted steps">
    <template #startContent>
      <Avatar isBordered color="success" radius="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="3" title="Zoey Lang">
    <template #startContent>
      <Avatar isBordered color="warning" radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
    </template>
    <template #subtitle>
      <p class="flex">2 issues to <span class="text-primary ml-1">fix now</span></p>
    </template>
    {{ defaultContent }}
  </AccordionItem>
</Accordion>
:::

### Custom Indicator

Accordion items have a property called `indicator`. You can use it to customize the open/close indicator.

::: component-view
<Accordion>
  <AccordionItem itemKey="anchor" title="Anchor">
    <template #indicator>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8.4 11.3a3 3 0 0 1 4.2 0l.7.7 1.4-1.4-.7-.7a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 0 7.1 5 5 0 0 0 7.1 0l.7-.7-1.4-1.4-.7.7a3 3 0 1 1-4.2-4.2l2.1-2.2Z"/><path d="M12 4.9 11.3 5.6l1.4 1.4.7-.7a3 3 0 1 1 4.2 4.2l-2.1 2.1a3 3 0 0 1-4.2 0l-.7-.7-1.4 1.4.7.7a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0 0-7.1 5 5 0 0 0-7.1 0Z"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="moon" title="Moon">
    <template #indicator>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="sun" title="Sun">
    <template #indicator>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
</Accordion>
:::

The indicator can be also a `function`, which receives the `isOpen`, `isDisabled` and the default `indicator` as parameters.

::: component-view
<Accordion :defaultExpandedKeys="['theme']">
  <AccordionItem itemKey="theme" title="Theme">
    <template #indicator="{ isOpen }">
      <svg v-if="isOpen" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
    </template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="anchor" title="Anchor">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="sun" title="Sun">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

### Custom Motion

Accordion offers a `motionProps` property to customize the `enter` / `exit` animation.

::: component-view
<Accordion>
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

> Learn more about Framer motion variants [here](https://www.framer.com/motion/animation/#variants).
>
> **Vue note**: `motionProps` is not implemented yet in HeroUI Vue.

### Controlled

Accordion is a controlled component, which means you need to control the `selectedKeys` property by yourself.

::: component-view
<Accordion v-model="selectedKey">
  <AccordionItem itemKey="1" title="Accordion 1">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">{{ defaultContent }}</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">{{ defaultContent }}</AccordionItem>
</Accordion>
:::

## Accordion Item Slots

- **base**: The accordion item wrapper.
- **heading**: The accordion item heading. It contains the `indicator` and the `title`.
- **trigger**: The button that open/close the accordion item.
- **titleWrapper**: The wrapper of the `title` and `subtitle`.
- **title**: The accordion item title.
- **subtitle**: The accordion item subtitle.
- **startContent**: The content before the accordion item.
- **indicator**: The element that indicates the open/close state of the accordion item.
- **content**: The accordion item content.

### Custom Accordion Styles

You can customize the accordion and accordion items styles by using any of the following properties:

- `className`: The class name of the accordion. Modify the accordion wrapper styles.(Accordion)
- `itemClasses`: The class names of the accordion items. Modify all accordion items styles at once. (Accordion)
- `classNames`: The class names of the accordion items. Modify each accordion item styles separately. (AccordionItem)

Here's an example of how to customize the accordion styles:

::: component-view
<Accordion
className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
:itemClasses="{
base: 'py-0 w-full',
title: 'font-normal text-medium',
trigger: 'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
indicator: 'text-medium',
content: 'text-small px-2',
}"
variant="shadow"

>

  <AccordionItem itemKey="1" title="Connected devices">
    <template #startContent><span class="text-primary">◉</span></template>
    <template #subtitle><p class="flex">2 issues to <span class="text-primary ml-1">fix now</span></p></template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="2" title="Apps Permissions" subtitle="3 apps have read permissions">
    <template #startContent><span>▣</span></template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="3" title="Pending tasks" subtitle="Complete your profile" :classNames="{ subtitle: 'text-warning' }">
    <template #startContent><span class="text-warning">●</span></template>
    {{ defaultContent }}
  </AccordionItem>
  <AccordionItem itemKey="4" :classNames="{ subtitle: 'text-danger' }">
    <template #title><p class="flex gap-1 items-center">Card expired <span class="text-default-400 text-small">*4812</span></p></template>
    <template #subtitle>Please, update now</template>
    <template #startContent><span class="text-danger">◆</span></template>
    {{ defaultContent }}
  </AccordionItem>
</Accordion>
:::

## Data Attributes

`AccordionItem` has the following attributes on the `base` element:

- **data-open**: Whether the accordion item is open.
- **data-disabled**: When the accordion item is disabled.
- **data-hover**: When the accordion item is being hovered.
- **data-focus**: When the accordion item is being focused.
- **data-focus-visible**: When the accordion item is being focused with the keyboard.
- **data-disabled**: When the accordion item is disabled. Based on `isDisabled` prop.
- **data-pressed**: When the accordion item is pressed.

## Accessibility

- Keyboard event support for `Space`, `Enter`, `Arrow Up`, `Arrow Down` and `Home` / `End` keys.
- Keyboard focus management and cross browser normalization.
- `aria-expanded` attribute for the accordion item.
- `aria-disabled` attribute for the accordion item.
- `aria-controls` attribute for the accordion item.

## API

### Accordion Props

| Attribute                 | Type                                      | Description                                                                                             | Default  |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| children                  | `VNodeChild \| VNodeChild[]`              | The contents of the collection. Usually the array of AccordionItem                                      | `-`      |
| variant                   | `light \| shadow \| bordered \| splitted` | The accordion appearance style.                                                                         | `light`  |
| selectionMode             | `none \| single \| multiple`              | The type of selection that is allowed in the collection.                                                | `single` |
| selectionBehavior         | `toggle \| replace`                       | The accordion selection behavior.                                                                       | `toggle` |
| isCompact                 | `boolean`                                 | Whether all Accordion items should be smaller.                                                          | `false`  |
| isDisabled                | `boolean`                                 | Whether the Accordion items are disabled.                                                               | `false`  |
| showDivider               | `boolean`                                 | Whether to display a divider at the bottom of the each accordion item.                                  | `true`   |
| dividerProps              | `DividerProps`                            | The divider component props.                                                                            | `-`      |
| hideIndicator             | `boolean`                                 | Whether the Accordion items indicator is hidden.                                                        | `false`  |
| disableAnimation          | `boolean`                                 | Whether the Accordion items open/close animation is disabled.                                           | `false`  |
| disableIndicatorAnimation | `boolean`                                 | Whether the Accordion items indicator animation is disabled.                                            | `false`  |
| disallowEmptySelection    | `boolean`                                 | Whether the collection allows empty selection.                                                          | `false`  |
| keepContentMounted        | `boolean`                                 | Whether the Accordion items content should be always mounted.                                           | `false`  |
| fullWidth                 | `boolean`                                 | Whether the accordion should take up the full width of its parent container.                            | `true`   |
| motionProps               | `MotionProps`                             | The motion properties of the Accordion.                                                                 | `-`      |
| disabledKeys              | `string[]`                                | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. | `-`      |
| itemClasses               | `AccordionItemClassnames`                 | The accordion items classNames.                                                                         | `-`      |
| selectedKeys              | `string[] \| string`                      | The currently selected keys in the collection (controlled).                                             | `-`      |
| defaultSelectedKeys       | `string[] \| string`                      | The initial selected keys in the collection (uncontrolled).                                             | `-`      |

### Accordion Events

| Attribute         | Type                                | Description                                                                            | Default |
| ----------------- | ----------------------------------- | -------------------------------------------------------------------------------------- | ------- |
| onSelectionChange | `(keys: string[] \| string) => any` | Handler that is called when the selection changes. In Vue, use `@change` or `v-model`. | `-`     |

### Accordion Item Props

| Attribute                 | Type                      | Description                                                                                         | Default |
| ------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- | ------- |
| children                  | `VNodeChild`              | The content of the component.                                                                       | `-`     |
| title                     | `VNodeChild`              | The accordion item title.                                                                           | `-`     |
| subtitle                  | `VNodeChild`              | The accordion item subtitle.                                                                        | `-`     |
| indicator                 | `IndicatorProps`          | The accordion item expanded indicator, usually an arrow icon.                                       | `-`     |
| startContent              | `VNodeChild`              | The accordion item start content, usually an icon or avatar.                                        | `-`     |
| motionProps               | `MotionProps`             | The props to modify the framer motion animation. Use the variants API to create your own animation. | `-`     |
| isCompact                 | `boolean`                 | Whether the AccordionItem is compact.                                                               | `false` |
| isDisabled                | `boolean`                 | The current disabled status.                                                                        | `false` |
| keepContentMounted        | `boolean`                 | Whether the AccordionItem content is kept mounted when closed.                                      | `false` |
| hideIndicator             | `boolean`                 | Whether the AccordionItem indicator is hidden.                                                      | `false` |
| disableAnimation          | `boolean`                 | Whether the AccordionItem animation is disabled.                                                    | `false` |
| disableIndicatorAnimation | `boolean`                 | Whether the AccordionItem indicator animation is disabled.                                          | `false` |
| HeadingComponent          | `string`                  | Customizable heading tag for Web accessibility.                                                     | `h2`    |
| classNames                | `AccordionItemClassnames` | Allows to set custom class names for the accordion item slots.                                      | `-`     |

### Accordion Item Events

| Attribute     | Type                           | Description                                                             | Default |
| ------------- | ------------------------------ | ----------------------------------------------------------------------- | ------- |
| onFocus       | `(e: FocusEvent) => void`      | Handler that is called when the element receives focus.                 | `-`     |
| onBlur        | `(e: FocusEvent) => void`      | Handler that is called when the element loses focus.                    | `-`     |
| onFocusChange | `(isFocused: boolean) => void` | Handler that is called when the element's focus status changes.         | `-`     |
| onKeyDown     | `(e: KeyboardEvent) => void`   | Handler that is called when a key is pressed.                           | `-`     |
| onKeyUp       | `(e: KeyboardEvent) => void`   | Handler that is called when a key is released.                          | `-`     |
| onPress       | `(e: PressEvent) => void`      | Handler called when the press is released over the target.              | `-`     |
| onPressStart  | `(e: PressEvent) => void`      | Handler called when a press interaction starts.                         | `-`     |
| onPressEnd    | `(e: PressEvent) => void`      | Handler called when a press interaction ends.                           | `-`     |
| onPressChange | `(isPressed: boolean) => void` | Handler called when the press state changes.                            | `-`     |
| onPressUp     | `(e: PressEvent) => void`      | Handler called when a press is released over the target.                | `-`     |
| onClick       | `MouseEventHandler`            | The native button click event handler (Deprecated) use onPress instead. | `-`     |

### Types

#### Accordion Item Indicator Props

```ts
type AccordionItemIndicatorProps = {
  indicator?: any;
  isOpen?: boolean;
  isDisabled?: boolean;
}

type indicator?: any | ((props: AccordionItemIndicatorProps) => any) | null
```

### Accordion Item classNames

```ts
export type AccordionItemClassnames = {
  base?: string;
  heading?: string;
  trigger?: string;
  titleWrapper?: string;
  title?: string;
  subtitle?: string;
  startContent?: string;
  indicator?: string;
  content?: string;
};
```

#### Motion Props

```ts
export type MotionProps = {
  animateOpacity?: boolean;
  startingHeight?: number;
  endingHeight?: number | string;
  startingY?: number;
  endingY?: number;
} & Record<string, any>;
```
