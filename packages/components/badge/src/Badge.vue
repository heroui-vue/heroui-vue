<script lang="ts" setup>
import { useBadge, type BadgeProps } from "./use-badge";

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: "solid",
  color: "default",
  size: "md",
  placement: "top-right",
  shape: "rectangle",
  isInvisible: false,
  isOneChar: undefined,
  isDot: false,
  disableOutline: false,
  disableAnimation: false,
  showOutline: true,
});

defineSlots<{
  default(): any;
  content(): any;
}>();

const { tag, baseProps, badgeProps, shouldRenderBadgeContent, content } = useBadge(props);
</script>

<template>
  <component :is="tag" v-bind="baseProps">
    <slot />
    <span v-bind="badgeProps">
      <template v-if="shouldRenderBadgeContent">
        <slot name="content">
          {{ content }}
        </slot>
      </template>
    </span>
  </component>
</template>
