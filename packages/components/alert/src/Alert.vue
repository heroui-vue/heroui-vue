<script lang="ts" setup>
import { AlertProps } from "./use-alert";

import { computed } from "vue";
import { useAlert } from "./use-alert";
import { defaultIconPath, successIconPath, warningIconPath } from "./constant";
// import { Button } from "@heroui-vue/button";

const props = withDefaults(defineProps<AlertProps>(), {
  hideIcon: undefined,
  hideIconWrapper: undefined,
  hasContent: undefined,
});

const slots = defineSlots();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "visibleChange", isVisible: boolean): void;
}>();

const {
  isVisible,
  close,
  baseProps,
  mainWrapperProps,
  titleProps,
  descriptionProps,
  alertIconProps,
  iconWrapperProps,
  closeButtonProps,
} = useAlert(props);

const icon = computed(() => {
  const color = props.color;

  if (color === "default" || color === "secondary" || color === "primary") {
    return defaultIconPath;
  } else if (color === "success") {
    return successIconPath;
  } else if (color === "warning" || color === "danger") {
    return warningIconPath;
  } else {
    return defaultIconPath;
  }
});

function onClose() {
  close();
  emits("close");
  emits("visibleChange", false);
}
</script>

<template>
  <div v-if="isVisible" v-bind="baseProps">
    <slot name="startContent" />

    <div v-if="!props.hideIcon" v-bind="iconWrapperProps">
      <slot name="icon">
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          v-bind="alertIconProps"
        >
          <path :d="icon" />
        </svg>
      </slot>
    </div>

    <div v-bind="mainWrapperProps">
      <div v-bind="titleProps">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>

      <div v-bind="descriptionProps">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>
    </div>

    <slot name="endContent" />

    <button v-if="props.isClosable" v-bind="closeButtonProps" @click="onClose">
      <span>&times;</span>
    </button>
  </div>
</template>

<style scoped></style>
