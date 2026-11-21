<script lang="ts" setup>
import { ref } from "vue";
import { useButton, type UseButtonProps } from "./useButton";

const props = defineProps<UseButtonProps>();
defineOptions({ inheritAttrs: false });

const buttonRef = ref<HTMLButtonElement | null>();
const { as, buttonProps, isLoading, spinnerPlacement } = useButton(props, buttonRef);
</script>

<template>
  <component :is="as" ref="buttonRef" v-bind="buttonProps">
    <slot name="startContent" />
    <slot name="spinner" v-if="isLoading && spinnerPlacement === 'start'" />
    <slot />
    <slot name="spinner" v-if="isLoading && spinnerPlacement === 'end'" />
    <slot name="endContent" />
  </component>
</template>
