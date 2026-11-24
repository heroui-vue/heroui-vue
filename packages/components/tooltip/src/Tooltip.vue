<script setup lang="ts">
import {
  cloneVNode,
  Comment,
  h,
  mergeProps,
  Text,
  Transition,
  Teleport,
  useAttrs,
  useSlots,
  type ComponentPublicInstance,
} from "vue";
import { flattenVNodes } from "@heroui-vue/shared";
import { useTooltip, type UseTooltipProps, type UseTooltipSlot } from "./useTooltip";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<UseTooltipProps>(), {
  isOpen: undefined,
  shouldFlip: true,
  shouldCloseOnBlur: true,
  triggerScaleOnOpen: undefined,
});
defineSlots<Record<UseTooltipSlot, any>>();
const attrs = useAttrs();
const contentSlots = useSlots();
const {
  as,
  content,
  isOpen,
  isMounted,
  portalContainer,
  disableAnimation,
  motionProps,
  triggerRef,
  overlayRef,
  triggerProps,
  tooltipProps,
  tooltipContentProps,
  positionStyle,
  open,
  close,
  updatePosition,
} = useTooltip(props);

function setTriggerRef(node: Element | ComponentPublicInstance | null) {
  const el = node && "$el" in node ? node.$el : node;
  triggerRef.value = el?.nodeType === 1 ? (el as HTMLElement) : null;
}

const Trigger = () => {
  const children = flattenVNodes(
    contentSlots.default?.({ isOpen: isOpen.value, triggerProps: triggerProps.value }),
  ).filter((node) => node.type !== Comment);
  if (children.length !== 1) return h("span");
  const child = children[0]!;
  const description =
    [child.props?.["aria-describedby"], triggerProps.value["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined;
  const bindings = { ...triggerProps.value, "aria-describedby": description, ref: setTriggerRef };
  if (child.type === Text) return h("p", bindings, child.children as string);
  // Merge the child's original ref and listeners instead of replacing them.
  return cloneVNode(child, bindings, true);
};

defineExpose({ el: overlayRef, trigger: triggerRef, open, close, updatePosition });
</script>

<template>
  <Trigger />
  <Teleport v-if="isMounted" :to="portalContainer">
    <Transition v-bind="motionProps" :css="!disableAnimation">
      <div v-if="isOpen" ref="overlayRef" :style="positionStyle">
        <div v-bind="mergeProps(attrs, { ...tooltipProps })">
          <component :is="as" v-bind="tooltipContentProps">
            <slot name="content">{{ content }}</slot>
          </component>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
