<script setup lang="ts">
import { useAttrs, type SVGAttributes } from "vue";
export interface IconifyProps extends /* @vue-ignore */ SVGAttributes {
  size?: number | string;
  height?: number | string;
  width?: number | string;
}

const props = withDefaults(defineProps<IconifyProps>(), {
  size: 24,
  height: 24,
  width: 24,
});

const attrs = useAttrs();
</script>

<template>
  <svg
    fill="none"
    :height="props.size || props.height"
    viewBox="0 0 24 24"
    :width="props.size || props.width"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="attrs"
  >
    <slot />
  </svg>
</template>
