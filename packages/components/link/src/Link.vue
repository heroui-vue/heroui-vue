<script setup lang="ts">
import { mergeProps, ref, useAttrs } from "vue";
import { LinkIcon } from "@heroui-vue/icon";
import { linkAnchorClasses } from "@heroui/theme";
import { useLink, type UseLinkProps, type UseLinkSlot } from "./useLink";

defineOptions({ inheritAttrs: false });
const props = defineProps<UseLinkProps>();
defineSlots<Record<UseLinkSlot, any>>();
const attrs = useAttrs();
const linkRef = ref<HTMLElement | null>(null);
const { as, linkProps, showAnchorIcon } = useLink(props, linkRef);
defineExpose({ el: linkRef });
</script>

<template>
  <component :is="as" ref="linkRef" v-bind="mergeProps(attrs, { ...linkProps })">
    <slot />
    <slot v-if="showAnchorIcon" name="anchorIcon">
      <LinkIcon :class="linkAnchorClasses" />
    </slot>
  </component>
</template>
