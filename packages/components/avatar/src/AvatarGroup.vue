<script lang="ts" setup>
import { provide } from "vue";
import { useAvatarGroup, avatarGroupContextKey } from "./useAvatarGroup";
import type { UseAvatarGroupProps, UseAvatarGroupSlot } from "./useAvatarGroup";

const props = defineProps<UseAvatarGroupProps>();
defineSlots<Record<UseAvatarGroupSlot, any>>();

const { as, context, clones, renderCount, avatarGroupProps } = useAvatarGroup(props);

// use `tryProvide` in future
provide(avatarGroupContextKey, context);
</script>

<template>
  <component :is="as" v-bind="avatarGroupProps">
    <component :is="clones" />
    <component :is="renderCount" />
  </component>
</template>
