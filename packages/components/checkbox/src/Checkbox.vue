<script lang="ts" setup>
import {
  useCheckbox,
  type CheckboxEmits,
  type CheckboxProps,
} from "./use-checkbox";

const props = withDefaults(defineProps<CheckboxProps>(), {
  color: "primary",
  size: "md",
  radius: "md",
  lineThrough: false,
  isDisabled: false,
  isInvalid: false,
  disableAnimation: false,
  isReadOnly: false,
  isIndeterminate: false,
});

const emit = defineEmits(["update:modelValue", "change", "valueChange"] as CheckboxEmits[]);

defineSlots<{
  default(): any;
  icon(): any;
}>();

const {
  isSelected,
  baseProps,
  inputProps,
  wrapperProps,
  iconProps,
  iconSlotProps,
  labelProps,
  isIndeterminate,
  hasLabel,
  onInputChange,
  onPressStart,
  onPressEnd,
} = useCheckbox(props, emit);
</script>

<template>
  <label v-bind="baseProps" @mousedown="onPressStart" @mouseup="onPressEnd">
    <input v-bind="inputProps" @change="onInputChange" />
    <span v-bind="wrapperProps">
      <span v-bind="iconProps">
        <slot name="icon" v-bind="iconSlotProps">
          <component
            :is="props.icon"
            v-if="props.icon"
            v-bind="iconSlotProps"
            class="w-full h-full"
          />
          <svg v-else viewBox="0 0 17 18" fill="none" class="w-full h-full">
            <path
              v-if="isIndeterminate"
              d="M1 9.5C1 9.22386 1.22386 9 1.5 9H15.5C15.7761 9 16 9.22386 16 9.5C16 9.77614 15.7761 10 15.5 10H1.5C1.22386 10 1 9.77614 1 9.5Z"
              fill="currentColor"
            />
            <path
              v-else-if="isSelected"
              d="M1 9L6 14L15 4"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </slot>
      </span>
    </span>
    <span v-if="hasLabel" v-bind="labelProps">
      <slot />
    </span>
  </label>
</template>
