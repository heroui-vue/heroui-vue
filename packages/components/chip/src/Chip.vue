<script lang="ts" setup>
import { useChip, type UseChipProps, type UseChipSlot } from "./useChip";

const props = defineProps<UseChipProps>();
const emit = defineEmits(["close"]);
defineSlots<Record<UseChipSlot, any>>();

const { as, chipProps, defaultProps, startContent, endContent } = useChip(props);

function handleClose() {
  emit("close");
}

function onCloseKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleClose();
  }
}
</script>

<template>
  <component :is="as" v-bind="chipProps">
    <component :is="startContent" />

    <span v-bind="defaultProps">
      <slot />
    </span>

    <component :is="endContent" @click="handleClose" @keydown="onCloseKeydown" />
  </component>
</template>

<style scoped></style>
