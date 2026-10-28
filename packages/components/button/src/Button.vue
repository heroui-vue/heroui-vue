<script lang="ts" setup>
import { useButton, type ButtonProps } from "./use-button";

import { computed, ref, type Component } from "vue";

const props = withDefaults(defineProps<ButtonProps>(), {
  spinnerPlacement: "start",
  isLoading: false,
});

defineSlots<{
  default(): Component;
  startContent(): Component;
  endContent(): Component;
  spinner(): Component;
}>();

const buttonRef = ref<HTMLButtonElement | null>();
const bind = useButton(props, buttonRef);
</script>

<template>
  <button ref="buttonRef" v-bind="bind">
    <slot name="startContent" />
    <slot v-if="isLoading && props.spinnerPlacement === 'start'" name="spinner" />
    <slot />
    <slot v-if="isLoading && props.spinnerPlacement === 'end'" name="spinner" />
    <slot name="endContent" />
  </button>
</template>
