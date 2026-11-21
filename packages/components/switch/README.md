# @heroui-vue/switch

Switch component for `heroui-vue`, using the HeroUI toggle theme and a native
checkbox input with the `switch` role.

```vue
<script setup>
import { ref } from "vue";
import { Switch } from "@heroui-vue/switch";
const selected = ref(false);
</script>

<template>
  <Switch v-model="selected" name="notifications" value="enabled">Notifications</Switch>
</template>
```

Supports `isSelected` / `v-model:isSelected`, `defaultSelected`, `isDisabled`,
`isReadOnly`, form submission and reset, `@change` (native event), and
`@valueChange` (boolean). Use `aria-label` for switches without a visible label.
The `thumbIcon`, `startContent`, and `endContent` slots receive `isSelected`;
their icon nodes inherit the corresponding theme classes.

Use `useSwitch` for custom markup, binding its `inputProps` to the native input
and passing the input ref to the composable.
