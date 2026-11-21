import {
  computed,
  getCurrentInstance,
  onMounted,
  onScopeDispose,
  ref,
  toValue,
  useId,
  watch,
} from "vue";
import { toggle } from "@heroui/theme";
import type { HTMLAttributes, InputHTMLAttributes, MaybeRef, Ref } from "vue";
import type { SlotsToClasses, ToggleSlots, ToggleVariantProps } from "@heroui/theme";
import type { HeroUIVueBaseProps, ToComputedRefs } from "@heroui-vue/shared";

export interface SwitchThumbIconProps {
  width: string;
  height: string;
  class: string;
  "data-checked": boolean;
  isSelected: boolean;
}

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    id?: string;
    name?: string;
    value?: string;
    form?: string;
    /** Controlled selection, compatible with HeroUI. */
    isSelected?: boolean;
    /** Vue's default v-model binding. */
    modelValue?: boolean;
    defaultSelected?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    autoFocus?: boolean;
    tabIndex?: number;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    classNames?: SlotsToClasses<ToggleSlots>;
    onChange?: (event: Event) => void;
    onValueChange?: (isSelected: boolean) => void;
    "onUpdate:isSelected"?: (isSelected: boolean) => void;
    "onUpdate:modelValue"?: (isSelected: boolean) => void;
  }
  export interface Variant {
    size?: ToggleVariantProps["size"];
    color?: ToggleVariantProps["color"];
    isDisabled?: boolean;
    disableAnimation?: boolean;
  }
}

namespace Return {
  export interface Option {
    as: NonNullable<HeroUIVueBaseProps["as"]>;
    slots: ReturnType<typeof toggle>;
    isSelected: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    isHovered: boolean;
    isPressed: boolean;
    isFocused: boolean;
    isFocusVisible: boolean;
  }
  export interface Slot {
    baseProps: HTMLAttributes & Record<`data-${string}`, boolean | undefined>;
    inputProps: InputHTMLAttributes;
    wrapperProps: HTMLAttributes;
    thumbProps: HTMLAttributes;
    labelProps: HTMLAttributes;
    thumbIconProps: Omit<SwitchThumbIconProps, "isSelected">;
    startContentProps: HTMLAttributes & { width: string; height: string };
    endContentProps: HTMLAttributes & { width: string; height: string };
  }
}

export type UseSwitchProps = Props.Option & Props.Variant;
export type SwitchProps = UseSwitchProps;
export type UseSwitchReturn = Return.Option & Return.Slot;
export type UseSwitchSlot = "default" | "thumbIcon" | "startContent" | "endContent";

export function useSwitch(
  originalProps: MaybeRef<UseSwitchProps> = {},
  inputRef?: Ref<HTMLInputElement | null | undefined>,
): ToComputedRefs<UseSwitchReturn> {
  const props = computed(() => toValue(originalProps));
  const id = useId();
  const labelId = `${id}-label`;
  const internalSelected = ref(!!props.value.defaultSelected);
  const isSelected = computed(
    () => props.value.isSelected ?? props.value.modelValue ?? internalSelected.value,
  );
  const isDisabled = computed(() => !!props.value.isDisabled);
  const isReadOnly = computed(() => !!props.value.isReadOnly);
  const interactionDisabled = computed(() => isDisabled.value || isReadOnly.value);
  const isHovered = ref(false);
  const isPressed = ref(false);
  const isFocused = ref(false);
  const isFocusVisible = ref(false);
  const componentSlots = getCurrentInstance()?.slots;
  let removePressListeners = () => {};
  let removeFormListener = () => {};
  let activePointer: number | undefined;

  function setSelected(selected: boolean) {
    if (interactionDisabled.value || selected === isSelected.value) return;
    if (props.value.isSelected === undefined && props.value.modelValue === undefined) {
      internalSelected.value = selected;
    }
    props.value["onUpdate:isSelected"]?.(selected);
    props.value["onUpdate:modelValue"]?.(selected);
    props.value.onValueChange?.(selected);
  }

  function onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (interactionDisabled.value) {
      input.checked = isSelected.value;
      return;
    }
    props.value.onChange?.(event);
    setSelected(input.checked);
    // Restore controlled state if the parent chooses not to accept the change.
    input.checked = isSelected.value;
  }

  function endPress() {
    isPressed.value = false;
    activePointer = undefined;
    removePressListeners();
  }

  function onPointerDown(event: PointerEvent) {
    if (interactionDisabled.value || event.button !== 0 || !event.isPrimary) return;
    endPress();
    activePointer = event.pointerId;
    isPressed.value = true;
    isFocusVisible.value = false;
    const doc = (event.currentTarget as HTMLElement).ownerDocument;
    const finish = (up: PointerEvent) => {
      if (up.pointerId === event.pointerId) endPress();
    };
    doc.addEventListener("pointerup", finish);
    doc.addEventListener("pointercancel", finish);
    removePressListeners = () => {
      doc.removeEventListener("pointerup", finish);
      doc.removeEventListener("pointercancel", finish);
    };
  }

  watch(interactionDisabled, (disabled) => {
    if (disabled) {
      endPress();
      isHovered.value = false;
    }
  });

  if (getCurrentInstance()) {
    onMounted(() => {
      const input = inputRef?.value;
      if (!input) return;
      const reset = (event: Event) => {
        queueMicrotask(() => {
          if (event.defaultPrevented) return;
          if (props.value.isSelected === undefined && props.value.modelValue === undefined) {
            internalSelected.value = !!props.value.defaultSelected;
          }
          input.checked = isSelected.value;
        });
      };
      const form = input.form;
      form?.addEventListener("reset", reset);
      removeFormListener = () => form?.removeEventListener("reset", reset);
      if (props.value.autoFocus && !isDisabled.value) input.focus();
    });
    onScopeDispose(() => {
      endPress();
      removeFormListener();
    });
  }

  const slots = computed(() =>
    toggle({
      size: props.value.size,
      color: props.value.color,
      isDisabled: isDisabled.value,
      disableAnimation: props.value.disableAnimation ?? false,
    }),
  );

  const baseProps = computed<Return.Slot["baseProps"]>(() => ({
    class: slots.value.base({ class: [props.value.classNames?.base, props.value.class] }),
    "data-disabled": isDisabled.value || undefined,
    "data-selected": isSelected.value || undefined,
    "data-readonly": isReadOnly.value || undefined,
    "data-focus": isFocused.value || undefined,
    "data-focus-visible": (isFocused.value && isFocusVisible.value) || undefined,
    "data-hover": (!isDisabled.value && isHovered.value) || undefined,
    "data-pressed": (!interactionDisabled.value && isPressed.value) || undefined,
    onPointerenter: (event: PointerEvent) => {
      if (event.pointerType !== "touch" && !isDisabled.value) isHovered.value = true;
      if (event.pointerId === activePointer && !interactionDisabled.value) isPressed.value = true;
    },
    onPointerleave: () => {
      isHovered.value = false;
      isPressed.value = false;
    },
    onPointerdown: onPointerDown,
    onClick: (event: MouseEvent) => {
      if (interactionDisabled.value) {
        event.preventDefault();
        return;
      }
      const target = event.target as HTMLElement;
      if ((props.value.as ?? "label") === "label" || target === inputRef?.value) return;
      if (target.closest("a,button,input,select,textarea,[contenteditable=true]")) return;
      inputRef?.value?.click();
      inputRef?.value?.focus();
    },
  }));

  const inputProps = computed<InputHTMLAttributes>(() => ({
    id: props.value.id ?? id,
    type: "checkbox",
    role: "switch",
    checked: isSelected.value,
    disabled: isDisabled.value,
    readonly: isReadOnly.value,
    required: props.value.isRequired,
    name: props.value.name,
    value: props.value.value ?? "",
    form: props.value.form,
    tabindex: props.value.tabIndex,
    "aria-checked": isSelected.value,
    "aria-readonly": isReadOnly.value || undefined,
    "aria-label": props.value["aria-label"],
    "aria-labelledby":
      props.value["aria-labelledby"] ??
      (!props.value["aria-label"] && componentSlots?.default ? labelId : undefined),
    "aria-describedby": props.value["aria-describedby"],
    class: slots.value.hiddenInput({ class: props.value.classNames?.hiddenInput }),
    onChange,
    onClick: (event: MouseEvent) => {
      if (interactionDisabled.value) event.preventDefault();
    },
    onFocus: (event: FocusEvent) => {
      isFocused.value = true;
      isFocusVisible.value = (event.target as HTMLElement).matches(":focus-visible");
    },
    onBlur: () => {
      isFocused.value = false;
      isFocusVisible.value = false;
      endPress();
    },
    onKeydown: (event: KeyboardEvent) => {
      isFocusVisible.value = true;
      if (event.key !== " ") return;
      if (interactionDisabled.value) event.preventDefault();
      else isPressed.value = true;
    },
    onKeyup: (event: KeyboardEvent) => {
      if (event.key === " ") endPress();
    },
  }));

  return {
    as: computed(() => props.value.as ?? "label"),
    slots,
    isSelected,
    isDisabled,
    isReadOnly,
    isHovered: computed(() => !isDisabled.value && isHovered.value),
    isPressed: computed(() => !interactionDisabled.value && isPressed.value),
    isFocused: computed(() => isFocused.value),
    isFocusVisible: computed(() => isFocused.value && isFocusVisible.value),
    baseProps,
    inputProps,
    wrapperProps: computed(() => ({
      "aria-hidden": true,
      class: slots.value.wrapper({ class: props.value.classNames?.wrapper }),
    })),
    thumbProps: computed(() => ({
      class: slots.value.thumb({ class: props.value.classNames?.thumb }),
    })),
    labelProps: computed(() => ({
      id: labelId,
      class: slots.value.label({ class: props.value.classNames?.label }),
    })),
    thumbIconProps: computed(() => ({
      width: "1em",
      height: "1em",
      "data-checked": isSelected.value,
      class: slots.value.thumbIcon({ class: props.value.classNames?.thumbIcon }),
    })),
    startContentProps: computed(() => ({
      width: "1em",
      height: "1em",
      class: slots.value.startContent({ class: props.value.classNames?.startContent }),
    })),
    endContentProps: computed(() => ({
      width: "1em",
      height: "1em",
      class: slots.value.endContent({ class: props.value.classNames?.endContent }),
    })),
  };
}
