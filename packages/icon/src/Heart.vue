<script setup lang="ts">
import Iconify, { type IconifyProps } from "./Iconify.vue";
const props = defineProps<IconifyProps>();
</script>

<template>
  <Iconify v-bind="props" role="presentation" aria-hidden="true">
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    ></path>
  </Iconify>
</template>
