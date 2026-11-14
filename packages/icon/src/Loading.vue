<script setup lang="ts">
import Iconify, { type IconifyProps } from "./Iconify.vue";
const props = defineProps<IconifyProps>();
</script>

<template>
  <Iconify
    v-bind="props"
    class="animate-spin h-5 w-5 text-current"
    role="presentation"
    aria-hidden="true"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      class="opacity-75"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      fill="currentColor"
    />
  </Iconify>
</template>
