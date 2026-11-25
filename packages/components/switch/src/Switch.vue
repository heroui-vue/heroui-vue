<script setup lang="ts">
import { ref } from "vue";
import { useSwitch } from "./useSwitch";
import type { UseSwitchProps, UseSwitchSlot, UseSwitchEmit } from "./useSwitch";

defineSlots<Record<UseSwitchSlot, any>>();
defineOptions({ inheritAttrs: false });
const emits = defineEmits<UseSwitchEmit>();
const props = defineProps<UseSwitchProps>();

const baseRef = ref<HTMLInputElement | undefined>();

const {
  as,
  baseProps,
  inputProps,
  wrapperProps,
  thumbProps,
  thumbIcon,
  startContent,
  endContent,
  label,
} = useSwitch(props, baseRef, {
  onChange: (...args) => {
    emits("change", ...args);
  },
  onValueChange: (...args) => {
    emits("valueChange", ...args);
  },
  "onUpdate:modelValue": (...args) => {
    emits("update:modelValue", ...args);
  },
});
</script>

<template>
  <component :is="as" ref="baseRef" v-bind="baseProps">
    <input v-bind="inputProps" />
    <span v-bind="wrapperProps">
      <component :is="startContent"></component>
      <span v-bind="thumbProps">
        <component :is="thumbIcon"></component>
      </span>
      <component :is="endContent"></component>
    </span>
    <component :is="label"></component>
  </component>
</template>
