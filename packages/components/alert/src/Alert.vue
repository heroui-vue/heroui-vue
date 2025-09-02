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
  baseProps,
  mainWrapperProps,
  titleProps,
  descriptionProps,
  alertIconProps,
  iconWrapperProps,
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
  emits("close");
}
</script>

<template>
  <div v-bind="baseProps">
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

    <!-- <Button v-if="props.isClosable" @click="onClose">close</Button> -->
  </div>
</template>

<style scoped></style>
