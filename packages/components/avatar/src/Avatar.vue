<script lang="ts" setup>
import { useAvatar, type AvatarProps } from "./use-avatar";

const props = withDefaults(defineProps<AvatarProps>(), {
  color: "default",
  radius: "full",
  size: "md",
  showFallback: false,
  isFocusable: false,
  isBordered: false,
  isDisabled: false,
  disableAnimation: false,
});

defineSlots<{
  fallback(): any;
  icon(): any;
}>();

const {
  tag,
  baseProps,
  imgProps,
  fallbackProps,
  nameProps,
  iconProps,
  showImage,
  showFallbackContent,
  initials,
  handleLoad,
  handleError,
} = useAvatar(props);

const defaultIconPath =
  "M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z M11.837 11.174a4.372 4.372 0 10-.031 0z";
</script>

<template>
  <component :is="tag" v-bind="baseProps">
    <img
      v-if="showImage"
      v-bind="imgProps"
      @load="handleLoad"
      @error="handleError"
    />

    <template v-if="showFallbackContent">
      <slot name="fallback">
        <span v-bind="fallbackProps">
          <template v-if="props.fallback">
            {{ props.fallback }}
          </template>
          <template v-else-if="initials">
            <span v-bind="nameProps">{{ initials }}</span>
          </template>
          <template v-else>
            <slot name="icon">
              <span v-bind="iconProps">
                <component :is="props.icon" v-if="props.icon" />
                <svg
                  v-else
                  fill="none"
                  height="80%"
                  viewBox="0 0 24 24"
                  width="80%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path :d="defaultIconPath" fill="currentColor" fill-rule="evenodd" />
                </svg>
              </span>
            </slot>
          </template>
        </span>
      </slot>
    </template>
  </component>
</template>
