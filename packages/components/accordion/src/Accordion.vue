<script lang="ts" setup>
import {
  useAccordion,
  type AccordionEmits,
  type AccordionProps,
} from "./use-accordion";

const props = withDefaults(defineProps<AccordionProps>(), {
  selectionMode: "single",
  keepContentMounted: false,
  variant: "light",
  fullWidth: true,
  isCompact: false,
  hideIndicator: false,
  disableAnimation: false,
  disableIndicatorAnimation: false,
});

const emit = defineEmits([
  "update:modelValue",
  "update:selectedKeys",
  "change",
] as AccordionEmits[]);

defineSlots<{
  default(): any;
}>();

const { groupProps } = useAccordion(props, emit);
</script>

<template>
  <div v-bind="groupProps">
    <slot />
  </div>
</template>
