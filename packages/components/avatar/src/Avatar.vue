<script lang="ts" setup>
import { useAvatar, type UseAvatarProps, type UseAvatarEmit } from "./useAvatar";
import { ref } from "vue";

const props = withDefaults(defineProps<UseAvatarProps>(), {
  color: "default",
  radius: "full",
  size: "md",
});
defineSlots<Record<UseAvatarEmit, any>>();

const avatarRef = ref<HTMLElement | undefined>();
const { as, imgAs, src, alt, avatarProps, imageProps, fallback } = useAvatar(props, avatarRef);
</script>

<template>
  <component ref="avatarRef" :is="as" v-bind="avatarProps">
    <component v-if="src" :is="imgAs" v-bind="imageProps" :alt="alt"></component>
    <component :is="fallback"></component>
  </component>
</template>
