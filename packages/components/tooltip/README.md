# @heroui-vue/tooltip

Tooltip component for `heroui-vue`, reusing HeroUI's popover theme.

```vue
<script setup>
import { Tooltip } from "@heroui-vue/tooltip";
</script>

<template>
  <Tooltip content="Helpful information" showArrow placement="top">
    <button type="button">Hover or focus</button>
  </Tooltip>
</template>
```

The default slot must contain one trigger node. Its existing attributes,
listeners, and ref are retained. Use the `content` slot for custom markup.
Tooltips open on pointer hover or keyboard focus; `trigger="focus"` restricts
opening to keyboard focus. Touch hover is ignored.

Supports `isOpen` / `v-model:isOpen`, `defaultOpen`, `@openChange`, `@close`,
`delay`, `closeDelay`, disabled state, Escape dismissal, optional outside-click
dismissal, all twelve placements, RTL alignment, viewport flipping and clamping,
offsets, and `portalContainer`. Position updates on scrolling, resizing, trigger
or tooltip size changes, and changes to `updatePositionDeps`. Nearby tooltips
share hover warmup to avoid repeatedly waiting for the opening delay.

`motionProps` accepts Vue `Transition` classes and hooks in place of React
Framer Motion props. Set `disableAnimation` to skip CSS transitions.

Use `useTooltip` for custom markup. It exposes trigger and overlay refs,
attribute bindings, positioning styles, and `open`, `close`, and `updatePosition`.
When configuring individual theme scanning, include the popover theme styles.
