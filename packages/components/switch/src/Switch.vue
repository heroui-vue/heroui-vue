<script setup lang="ts">
import { cloneVNode, mergeProps, ref, useAttrs, useSlots, type HTMLAttributes } from "vue";
import { flattenVNodes, isValidVNode } from "@heroui-vue/shared";
import { useSwitch, type UseSwitchProps, type UseSwitchSlot } from "./useSwitch";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<UseSwitchProps>(), {
  isSelected: undefined,
  modelValue: undefined,
});
defineSlots<Record<UseSwitchSlot, any>>();
const attrs = useAttrs();
const content = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);
const baseRef = ref<HTMLElement | null>(null);
const {
  as,
  isSelected,
  baseProps,
  inputProps,
  wrapperProps,
  thumbProps,
  labelProps,
  thumbIconProps,
  startContentProps,
  endContentProps,
} = useSwitch(props, inputRef);

function renderIcon(
  name: UseSwitchSlot,
  iconProps: HTMLAttributes & { width: string; height: string; "data-checked"?: boolean },
) {
  return flattenVNodes(content[name]?.({ ...iconProps, isSelected: isSelected.value })).map(
    (vnode) => (isValidVNode(vnode) ? cloneVNode(vnode, { ...iconProps }) : vnode),
  );
}
const ThumbIcon = () => renderIcon("thumbIcon", thumbIconProps.value);
const StartContent = () => renderIcon("startContent", startContentProps.value);
const EndContent = () => renderIcon("endContent", endContentProps.value);
defineExpose({ el: baseRef, input: inputRef });
</script>

<template>
  <component :is="as" ref="baseRef" v-bind="mergeProps(attrs, { ...baseProps })">
    <input ref="inputRef" v-bind="inputProps" />
    <span v-bind="wrapperProps">
      <StartContent v-if="$slots.startContent" />
      <span v-bind="thumbProps"><ThumbIcon v-if="$slots.thumbIcon" /></span>
      <EndContent v-if="$slots.endContent" />
    </span>
    <span v-if="$slots.default" v-bind="labelProps"><slot :isSelected="isSelected" /></span>
  </component>
</template>
