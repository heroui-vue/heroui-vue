<script lang="ts" setup>
import {
  useChip,
  type ChipProps,
  type ChipSlots,
  type ChipEmits,
} from "./use-chip";
import { CloseFilledIcon } from "@heroui-vue/icon";

const props = defineProps<ChipProps>();
const emit = defineEmits(["close"] as ChipEmits[]);
defineSlots<Record<ChipSlots, any>>();

const {
  getChipProps,
  getCloseButtonProps,
  classNames,
  isDot,
  isCloseable,
  slots,
  hasStartContent,
} = useChip(props as ChipProps);

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
  <component v-bind="getChipProps()">
    <template v-if="isDot && !hasStartContent">
      <span :class="slots.dot({ class: classNames?.dot })"> </span>
    </template>
    <template v-else>
      <slot name="avatar">
        <slot name="startContent"></slot>
      </slot>
    </template>

    <span :class="slots.content({ class: classNames?.content })">
      <slot></slot>
    </span>

    <template v-if="isCloseable">
      <span
        v-bind="getCloseButtonProps()"
        @click="handleClose"
        @keydown="onCloseKeydown"
      >
        <slot name="endContent">
          <CloseFilledIcon :size="18" />
        </slot>
      </span>
    </template>
    <template v-else>
      <slot name="endContent"></slot>
    </template>
  </component>
</template>

<style scoped></style>
