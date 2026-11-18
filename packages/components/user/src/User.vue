<script setup lang="ts">
import { mergeProps, ref, useAttrs } from "vue";
import { Avatar } from "@heroui-vue/avatar";
import { useUser, type UseUserProps, type UseUserSlot } from "./useUser";

defineOptions({ inheritAttrs: false });
const props = defineProps<UseUserProps>();
defineSlots<Record<UseUserSlot, any>>();
const attrs = useAttrs();
const userRef = ref<HTMLElement | null>(null);
const { as, name, description, avatarProps, userProps, wrapperProps, nameProps, descriptionProps } =
  useUser(props);
defineExpose({ el: userRef });
</script>

<template>
  <component :is="as" ref="userRef" v-bind="mergeProps(attrs, { ...userProps })">
    <slot name="avatar" :avatarProps="avatarProps">
      <Avatar v-bind="avatarProps" />
    </slot>
    <div v-bind="wrapperProps">
      <span v-bind="nameProps"
        ><slot name="name">{{ name }}</slot></span
      >
      <span v-bind="descriptionProps"
        ><slot name="description">{{ description }}</slot></span
      >
    </div>
  </component>
</template>
