<script lang="ts" setup>
import {
  useAccordionItem,
  type AccordionItemProps,
} from "./use-accordion";

const props = withDefaults(defineProps<AccordionItemProps>(), {
  isDisabled: false,
  isCompact: false,
  hideIndicator: false,
  disableAnimation: false,
  disableIndicatorAnimation: false,
});

defineSlots<{
  default(): any;
  title(): any;
  subtitle(): any;
  startContent(): any;
  indicator(payload: { isOpen: boolean; isDisabled: boolean }): any;
}>();

const {
  isOpen,
  isDisabled,
  keepContentMounted,
  hideIndicator,
  hasSubtitle,
  baseProps,
  headingProps,
  triggerProps,
  startContentProps,
  indicatorProps,
  titleWrapperProps,
  titleProps,
  subtitleProps,
  contentProps,
  toggle,
} = useAccordionItem(props);
</script>

<template>
  <div v-bind="baseProps">
    <div v-bind="headingProps">
      <button v-bind="triggerProps" @click="toggle">
        <span v-if="$slots.startContent" v-bind="startContentProps">
          <slot name="startContent" />
        </span>

        <span v-bind="titleWrapperProps">
          <span v-bind="titleProps">
            <slot name="title">{{ props.title }}</slot>
          </span>
          <span v-if="hasSubtitle" v-bind="subtitleProps">
            <slot name="subtitle">{{ props.subtitle }}</slot>
          </span>
        </span>

        <span v-if="!hideIndicator" v-bind="indicatorProps">
          <slot name="indicator" :isOpen="isOpen" :isDisabled="isDisabled">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
        </span>
      </button>
    </div>

    <div v-if="keepContentMounted || isOpen" v-show="isOpen" v-bind="contentProps">
      <slot />
    </div>
  </div>
</template>
