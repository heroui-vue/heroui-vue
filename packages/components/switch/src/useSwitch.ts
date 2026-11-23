import { ref, watchEffect, useId, h } from "vue";
import { toReactive, useToggle, useElementHover, useMousePressed, useFocus } from "@vueuse/core";
import { toggle } from "@heroui/theme";
import {
  toRefsWithDefault,
  mergeClassProps,
  tryUseAttrs,
  tryUseSlots,
  mapPropsVariants,
} from "@heroui-vue/shared";
import { cn } from "@heroui/theme";
import type { MaybeRef, Ref, ToRefs, VNode, EmitsToProps } from "vue";
import type { SlotsToClasses, ToggleSlots, ToggleVariantProps } from "@heroui/theme";
import type { HeroUIVueBaseProps, BaseProps } from "@heroui-vue/shared";

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
    value?: string;
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
      "data-disabled": boolean;
      "data-selected": boolean;
      "data-readonly": boolean;
      "data-focus": boolean;
      "data-focus-visible": boolean;
      "data-hover": boolean;
      "data-pressed": boolean;
    };
    wrapperProps: BaseProps & {
      "aria-hidden": true;
    };
    inputProps: BaseProps & {
      id: string;
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

export type On = {
  [K in keyof UseSwitchEmit as `on${Capitalize<K>}`]?: (...args: UseSwitchEmit[K]) => any;
};

export type UseSwitchProps = Props.Option & Props.Variant;
export type UseSwitchReturn = Return.Option & Return.Slot;
export type UseSwitchSlot = "default" | "label" | "thumbIcon" | "startContent" | "endContent";
export type UseSwitchEmit = {
  change: [Event];
  valueChange: [boolean];
};
export type UseSwitchOption = On;

export function useSwitch(
  originalProps: MaybeRef<UseSwitchProps>,
  inputRef?: Ref<HTMLInputElement | null | undefined>,
  options?: UseSwitchOption,
): ToRefs<UseSwitchReturn> {
  type WithDedault =
    | "as"
    | "value"
    | "isReadOnly"
    | "autoFocus"
    | "disableAnimation"
    | "defaultSelected";
  const { onChange = () => {}, onValueChange = () => {} } = options || {};
  const props = toRefsWithDefault<UseSwitchProps, WithDedault>(
    toReactive(originalProps) as UseSwitchProps,
    {
      as: "label",
      value: "",
      isReadOnly: false,
      autoFocus: false,
      disableAnimation: false,
      defaultSelected: false,
    },
  );
  const labelId = useId();
  const [isSelected, toggleState] = useToggle(props.defaultSelected.value);
  const isHovered = useElementHover(inputRef);
  const { focused: isFocused } = useFocus(inputRef);
  const { pressed: isPressed } = useMousePressed({ target: inputRef });
  const { startContent, endContent, thumbIcon, label } = tryUseSlots<UseSwitchSlot[]>(
    "startContent",
    "endContent",
    "thumbIcon",
    "label",
  );
  const attrs = tryUseAttrs();
  const { class: className, id } = attrs;

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
      const isInputRefChecked = (inputRef.value as HTMLInputElement).checked;
      isSelected.value = isInputRefChecked;
      inputRef?.value.addEventListener("change", (e) => {
        onChange?.(e);
        // This will sync to change the `isSelected` value
        toggleState();
        onValueChange?.(isSelected.value);
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
      "data-disabled": isDisabled.value,
      "data-selected": isSelected.value,
      "data-readonly": isReadOnly,
      "data-focus": isFocused.value,
      // TODO
      "data-focus-visible": false,
      "data-hover": isHovered.value,
      "data-pressed": pressed,
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
    const { classNames } = toReactive(props);
    inputProps.value = {
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
      ...props,
      class: switchSlots.value.startContent({ class: cn(classNames?.startContent) }),
    };
  });
  // endContentProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    endContentProps.value = {
      width: "1em",
      height: "1em",
      ...props,
      class: switchSlots.value.endContent({ class: cn(classNames?.endContent) }),
    };
  });
  // startContentSlot;
  watchEffect(() => {
    startContentSlot.value = () => {
      return startContent?.(startContentProps.value);
    };
  });
  // endContentSlot
  watchEffect(() => {
    endContentSlot.value = () => {
      return endContent?.(endContentProps.value);
    };
  });
  // thumbIconSlot
  watchEffect(() => {
    thumbIconSlot.value = () => {
      return thumbIcon?.(thumbIconProps.value);
    };
  });
  // labelSlot
  watchEffect(() => {
    labelSlot.value = () => {
      return label ? h("span", labelProps.value, label()) : null;
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
