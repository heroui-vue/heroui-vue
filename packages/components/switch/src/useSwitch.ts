import { ref, watchEffect, useId, h } from "vue";
import { toReactive, useToggle, useElementHover, useMousePressed, useFocus } from "@vueuse/core";
import { toggle } from "@heroui/theme";
import {
  toRefsWithDefault,
  mergeClassProps,
  tryUseAttrs,
  tryUseSlots,
  mapPropsVariants,
  toDataAttr,
  cloneValidVnode,
} from "@heroui-vue/shared";
import { cn } from "@heroui/theme";
import type { MaybeRef, Ref, ToRefs, VNode, EmitsToProps, InputHTMLAttributes } from "vue";
import type { SlotsToClasses, ToggleSlots, ToggleVariantProps } from "@heroui/theme";
import {
  type HeroUIVueBaseProps,
  type BaseProps,
  type Validation,
  type AriaLabelingProps,
  type AriaValidationProps,
} from "@heroui-vue/shared";

export interface SwitchThumbIconProps {
  width: string;
  height: string;
  class: string;
  "data-checked": boolean;
  isSelected: boolean;
}

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    isDisabled?: boolean;
    classNames?: SlotsToClasses<ToggleSlots>;
    isReadOnly?: boolean;
    autoFocus?: boolean;
    defaultSelected?: boolean;
    isSelected?: boolean;
    modelValue?: boolean;
    excludeFromTabOrder?: boolean;
    name?: string;
    form?: string;
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
    isHovered: boolean;
    isSelected: boolean;
    isPressed: boolean;
    isFocused: boolean;
    // TODO
    // isFocusVisible: boolean;
    isDisabled: boolean;
  }
  export interface Slot {
    baseProps: BaseProps & {
      "data-disabled"?: boolean;
      "data-selected"?: boolean;
      "data-readonly"?: boolean;
      "data-focus"?: boolean;
      "data-focus-visible"?: boolean;
      "data-hover"?: boolean;
      "data-pressed"?: boolean;
    };
    wrapperProps: BaseProps & {
      "aria-hidden": true;
    };
    inputProps: BaseProps & {
      id: string;
      checked: boolean;
      required: boolean;
      disabled: boolean;
      name?: string;
      form?: string;
      type: "checkbox";
      "aria-required"?: boolean;
      "aria-invalid"?: boolean;
      "aria-errormessage"?: string;
      "aria-controls"?: string;
      "aria-readonly"?: boolean;
      "aria-describedby"?: string;
      value: boolean;
      onChange: InputHTMLAttributes["onChange"];
    };
    labelProps: BaseProps & {
      id: string;
    };
    thumbProps: BaseProps;
    thumbIconProps: BaseProps & {
      width: string;
      height: string;
      isSelected: boolean;
    };
    startContentProps: BaseProps & { width: string; height: string };
    endContentProps: BaseProps & { width: string; height: string };
    startContent: () => VNode | VNode[] | null | undefined;
    endContent: () => VNode | VNode[] | null | undefined;
    thumbIcon: () => VNode | VNode[] | null | undefined;
    label: () => VNode | VNode[] | null | undefined;
  }
}

type Events = {
  change: [event: Event];
  valueChange: [isSelected: boolean];
  "update:modelValue": [isSelected: boolean];
};

export type UseSwitchProps = Props.Option &
  Props.Variant &
  Validation &
  AriaLabelingProps &
  AriaValidationProps & {
    "aria-controls"?: string;
  };
export type UseSwitchReturn = Return.Option & Return.Slot;
export type UseSwitchSlot = "default" | "thumbIcon" | "startContent" | "endContent";
// generate by EventsToEmits<Events>;
export type UseSwitchEmit = ((e: "change", event: Event) => void) &
  ((e: "valueChange", isSelected: boolean) => void) &
  ((e: "update:modelValue", isSelected: boolean) => void);
export type UseSwitchOptions = EmitsToProps<Events>;

export function useSwitch(
  originalProps: MaybeRef<UseSwitchProps>,
  inputRef?: Ref<HTMLInputElement | null | undefined>,
  options?: UseSwitchOptions,
): ToRefs<UseSwitchReturn> {
  const { onChange, onValueChange, "onUpdate:modelValue": onModelValue } = options || {};
  type Keys<T extends keyof UseSwitchProps> = T;
  type WithDefault = Keys<
    | "as"
    | "isReadOnly"
    | "autoFocus"
    | "disableAnimation"
    | "defaultSelected"
    | "isRequired"
    | "validationBehavior"
  >;
  const props = toRefsWithDefault<UseSwitchProps, WithDefault>(
    toReactive(originalProps) as UseSwitchProps,
    {
      as: "label",
      isReadOnly: false,
      autoFocus: false,
      disableAnimation: false,
      defaultSelected: false,
      isRequired: false,
      validationBehavior: "aria",
    },
  );
  const labelId = useId();
  const isHovered = useElementHover(inputRef);
  const { focused: isFocused } = useFocus(inputRef);
  const { pressed: isPressed } = useMousePressed({ target: inputRef });
  const {
    startContent,
    endContent,
    thumbIcon,
    default: defaultSlot,
  } = tryUseSlots<UseSwitchSlot[]>("startContent", "endContent", "thumbIcon", "default");
  const attrs = tryUseAttrs();
  const { class: className, id } = attrs;

  const [isSelected, toggleState] = useToggle(
    props.modelValue?.value || props.defaultSelected.value,
  );
  const isDisabled = ref() as Ref<Return.Option["isDisabled"]>;
  const switchSlots = ref() as Ref<Return.Option["slots"]>;
  const baseProps = ref() as Ref<Return.Slot["baseProps"]>;
  const wrapperProps = ref() as Ref<Return.Slot["wrapperProps"]>;
  const inputProps = ref() as Ref<Return.Slot["inputProps"]>;
  const labelProps = ref() as Ref<Return.Slot["labelProps"]>;
  const thumbProps = ref() as Ref<Return.Slot["thumbProps"]>;
  const thumbIconProps = ref() as Ref<Return.Slot["thumbIconProps"]>;
  const startContentProps = ref() as Ref<Return.Slot["startContentProps"]>;
  const endContentProps = ref() as Ref<Return.Slot["endContentProps"]>;
  const startContentSlot = ref() as Ref<Return.Slot["startContent"]>;
  const endContentSlot = ref() as Ref<Return.Slot["endContent"]>;
  const thumbIconSlot = ref() as Ref<Return.Slot["thumbIcon"]>;
  const labelSlot = ref() as Ref<Return.Slot["label"]>;

  watchEffect(() => {
    if (inputRef?.value) {
      const input = inputRef.value as HTMLInputElement;
      input.addEventListener("change", () => {
        // This will sync to change the `isSelected` value
        toggleState();
        input.focus();
      });
    }
  });
  // isDisabled
  watchEffect(() => {
    const { isDisabled: isDisabledProps, isReadOnly } = toReactive(props);
    isDisabled.value = isDisabledProps || isReadOnly;
  });
  // slots
  watchEffect(() => {
    const { disableAnimation } = toReactive(props);
    const [, variantProps] = mapPropsVariants(toReactive(originalProps), toggle.variantKeys);
    switchSlots.value = toggle({
      ...variantProps,
      disableAnimation,
    });
  });
  // baseProps
  watchEffect(() => {
    const { classNames, isReadOnly } = toReactive(props);
    const baseStyles = cn(classNames?.base, className);
    const pressed = isDisabled.value ? false : isPressed.value;
    const base: UseSwitchReturn["baseProps"] = {
      class: switchSlots.value.base({ class: cn(baseStyles, className) }),
      "data-disabled": toDataAttr(isDisabled.value),
      "data-selected": toDataAttr(isSelected.value),
      "data-readonly": toDataAttr(isReadOnly),
      "data-focus": toDataAttr(isFocused.value),
      // TODO
      "data-focus-visible": false,
      "data-hover": toDataAttr(isHovered.value),
      "data-pressed": toDataAttr(pressed),
    };
    baseProps.value = mergeClassProps(base, attrs) as any;
  });
  // wrapperProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    wrapperProps.value = {
      "aria-hidden": true,
      class: switchSlots.value.wrapper({ class: cn(classNames?.wrapper) }),
    };
  });
  // inputProps
  watchEffect(() => {
    const {
      classNames,
      name,
      modelValue,
      form,
      isReadOnly,
      isInvalid,
      isRequired,
      validationBehavior,
      "aria-describedby": ariaDescribedby,
      "aria-errormessage": ariaErrormessage,
      "aria-controls": ariaControls,
    } = toReactive(props);
    const onInputChange: UseSwitchReturn["inputProps"]["onChange"] = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const checked = target.checked;
      onChange?.(event);
      onValueChange?.(checked);
      onModelValue?.(checked);
    };
    const input: Omit<UseSwitchReturn["inputProps"], "id" | "class"> = {
      type: "checkbox",
      name,
      form,
      checked: isSelected.value,
      disabled: isDisabled.value,
      required: isRequired && validationBehavior === "native",
      "aria-required": (isRequired && validationBehavior === "aria") || undefined,
      "aria-invalid": isInvalid || undefined,
      "aria-errormessage": ariaErrormessage,
      "aria-controls": ariaControls,
      "aria-readonly": isReadOnly || undefined,
      "aria-describedby": ariaDescribedby || undefined,
      value: modelValue == null ? isSelected.value : modelValue,
      onChange: onInputChange,
    };
    inputProps.value = {
      ...input,
      id: id as string,
      class: switchSlots.value.hiddenInput({ class: classNames?.hiddenInput }),
    };
  });
  // labelProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    labelProps.value = {
      id: labelId,
      class: switchSlots.value.label({ class: cn(classNames?.label) }),
    };
  });
  // thumbProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    thumbProps.value = {
      class: switchSlots.value.thumb({ class: cn(classNames?.thumb) }),
    };
  });
  // thumbIconProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    thumbIconProps.value = {
      width: "1em",
      height: "1em",
      class: switchSlots.value.thumbIcon({ class: cn(classNames?.thumbIcon) }),
      isSelected: isSelected.value,
    };
  });
  // startContentProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    startContentProps.value = {
      width: "1em",
      height: "1em",
      class: switchSlots.value.startContent({ class: cn(classNames?.startContent) }),
    };
  });
  // endContentProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    endContentProps.value = {
      width: "1em",
      height: "1em",
      class: switchSlots.value.endContent({ class: cn(classNames?.endContent) }),
    };
  });
  // startContentSlot;
  watchEffect(() => {
    startContentSlot.value = () => {
      return cloneValidVnode(startContent?.(), startContentProps.value);
    };
  });
  // endContentSlot
  watchEffect(() => {
    endContentSlot.value = () => {
      return cloneValidVnode(endContent?.(), endContentProps.value);
    };
  });
  // thumbIconSlot
  watchEffect(() => {
    const { isSelected } = thumbIconProps.value;
    thumbIconSlot.value = () => {
      return cloneValidVnode(thumbIcon?.({ isSelected }), thumbIconProps.value);
    };
  });
  // labelSlot
  watchEffect(() => {
    labelSlot.value = () => {
      return defaultSlot ? h("span", labelProps.value, defaultSlot()) : null;
    };
  });

  return {
    ...props,
    isHovered,
    isSelected,
    isPressed,
    isFocused,
    isDisabled,
    slots: switchSlots,
    baseProps,
    inputProps,
    labelProps,
    wrapperProps,
    thumbProps,
    thumbIconProps,
    startContentProps,
    endContentProps,
    startContent: startContentSlot,
    endContent: endContentSlot,
    thumbIcon: thumbIconSlot,
    label: labelSlot,
  };
}
