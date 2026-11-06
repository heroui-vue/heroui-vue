<script lang="ts" setup>
import { ref } from "vue";
import { useButton, type UseButtonProps } from "./useButton";

const props = withDefaults(defineProps<UseButtonProps>(), {
  size: "md",
  color: "default",
  variant: "solid",
  spinnerPlacement: "start",
});

const buttonRef = ref<HTMLButtonElement | null>();
const { buttonProps, isLoading, spinnerPlacement } = useButton(props, buttonRef);
</script>

<template>
  <button ref="buttonRef" v-bind="buttonProps">
    <slot name="startContent" />
    <slot name="spinner" v-if="isLoading && spinnerPlacement === 'start'" />
    <slot />
    <slot name="spinner" v-if="isLoading && spinnerPlacement === 'end'" />
    <slot name="endContent" />
  </button>
</template>
