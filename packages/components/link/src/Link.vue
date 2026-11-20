<script setup lang="ts">
import { ref } from "vue";
import { LinkIcon } from "@heroui-vue/icon";
import { linkAnchorClasses } from "@heroui/theme";
import { useLink, type UseLinkProps, type UseLinkSlot } from "./useLink";

const props = defineProps<UseLinkProps>();
defineSlots<Record<UseLinkSlot, any>>();

const linkRef = ref<HTMLElement | null>(null);
const { as, linkProps, showAnchorIcon } = useLink(props, linkRef);
</script>

<template>
  <component :is="as" ref="linkRef" v-bind="linkProps">
    <slot />
    <slot v-if="showAnchorIcon" name="anchorIcon">
      <LinkIcon :class="linkAnchorClasses" />
    </slot>
  </component>
</template>
