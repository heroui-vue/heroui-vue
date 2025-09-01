<script setup lang="ts">
export type IconifyProps = {
  size?: number;
  height?: number;
  width?: number;
};

const props = withDefaults(defineProps<IconifyProps>(), {
  size: 24,
  height: 24,
  width: 24,
});
</script>

<template>
  <svg
    fill="none"
    :height="props.size || props.height"
    viewBox="0 0 24 24"
    :width="props.size || props.width"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>
