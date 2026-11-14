<script lang="ts" setup>
import { useBadge, type UseBadgeProps, type UseBadgeSlot } from "./useBadge";

const props = withDefaults(defineProps<UseBadgeProps>(), {
  showOutline: true,
});
defineSlots<Record<UseBadgeSlot, any>>();

const { as, baseProps, badgeProps, contentSlot } = useBadge(props);
</script>

<template>
  <div v-bind="baseProps">
    <slot />
    <component :is="as" v-bind="badgeProps">
      <component :is="contentSlot"></component>
    </component>
  </div>
</template>
