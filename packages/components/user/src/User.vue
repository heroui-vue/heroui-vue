<script setup lang="ts">
import { ref } from "vue";
import { Avatar } from "@heroui-vue/avatar";
import { useUser, type UseUserProps, type UseUserSlot } from "./useUser";

defineOptions({ inheritAttrs: false });
defineSlots<Record<UseUserSlot, any>>();
const props = defineProps<UseUserProps>();
const userRef = ref<HTMLElement | null>(null);
const { as, avatarProps, userProps, wrapperProps, nameProps, descriptionProps } = useUser(
  props,
  userRef,
);
</script>

<template>
  <component :is="as" ref="userRef" v-bind="userProps">
    <Avatar v-bind="avatarProps" />
    <div v-bind="wrapperProps">
      <span v-bind="nameProps">
        <slot name="name" />
      </span>
      <span v-bind="descriptionProps">
        <slot name="description" />
      </span>
    </div>
  </component>
</template>
