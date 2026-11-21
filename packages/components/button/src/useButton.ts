import { ref, watchEffect } from "vue";
import { button } from "@heroui/theme";
import { useFocus, useMousePressed, useElementHover, toReactive } from "@vueuse/core";
import { toRefsWithDefault, useRipple, tryUseAttrs, mergeClassProps } from "@heroui-vue/shared";
import type { ButtonVariantProps } from "@heroui/theme";
import type { HeroUIVueBaseProps, BaseProps } from "@heroui-vue/shared";
import type { Ref, Reactive, ToRefs } from "vue";

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    disableRipple?: boolean;
    spinnerPlacement?: "start" | "end";
    isLoading?: boolean;
  }
  export interface Variant {
    variant?: ButtonVariantProps["variant"];
    size?: ButtonVariantProps["size"];
    color?: ButtonVariantProps["color"];
    radius?: ButtonVariantProps["radius"];
    fullWidth?: boolean;
    isDisabled?: boolean;
    isIconOnly?: boolean;
    disableAnimation?: boolean;
  }
}
namespace Return {
  export interface Slot {
    buttonProps: BaseProps & {
      "data-disabled": boolean;
      "data-focus": boolean;
      "data-pressed": boolean;
      "data-focus-visible": boolean;
      "data-hover": boolean;
      "data-loading": boolean;
    };
  }
  export interface Option {
    as: HeroUIVueBaseProps["as"];
    styles: string;
    isLoading: Props.Option["isLoading"];
    spinnerPlacement: Props.Option["spinnerPlacement"];
    spinnerSize: "md" | "sm" | "lg" | undefined;
    disableRipple: boolean;
    isIconOnly: boolean;
  }
}

export type UseButtonProps = Props.Option & Props.Variant;
export type UseButtonReturn = Return.Option & Return.Slot;

export function useButton(
  originalProps: Reactive<UseButtonProps>,
  buttonRef?: Ref<HTMLButtonElement | undefined | null>,
): ToRefs<UseButtonReturn> {
  const props = toRefsWithDefault(toReactive(originalProps) as UseButtonProps, {
    as: "button",
    size: "md",
    color: "default",
    variant: "solid",
    spinnerPlacement: "start",
    isLoading: false,
    isIconOnly: false,
    isDisabled: false,
    fullWidth: false,
  });
  const { focused: isFocused } = useFocus(buttonRef);
  const { pressed: isPressed } = useMousePressed({ target: buttonRef });
  const isHovered = useElementHover(buttonRef);
  const attrs = tryUseAttrs();
  const { class: className } = attrs;

  const disableRipple = ref() as Ref<Return.Option["disableRipple"]>;
  const styles = ref() as Ref<Return.Option["styles"]>;
  const spinnerSize = ref() as Ref<Return.Option["spinnerSize"]>;
  const buttonProps = ref() as Ref<Return.Slot["buttonProps"]>;

  // disableRipple
  watchEffect(() => {
    const { disableRipple: disableRippleProp, disableAnimation } = toReactive(props);
    disableRipple.value = Boolean(disableRippleProp) || Boolean(disableAnimation);
  });
  // styles
  watchEffect(() => {
    const {
      isDisabled: isDisabledProp,
      isLoading,
      size,
      color,
      variant,
      radius,
      fullWidth,
      disableAnimation,
      isIconOnly,
    } = toReactive(props);
    const isDisabled = isDisabledProp || isLoading;
    styles.value = button({
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      // TODO
      isInGroup: false,
      disableAnimation,
      isIconOnly,
      className,
    });
  });
  // spinnerSize
  watchEffect(() => {
    const { size } = toReactive(props);
    const sizeMap: Record<string, Props.Variant["size"]> = {
      sm: "sm",
      md: "sm",
      lg: "md",
    };
    spinnerSize.value = sizeMap[size];
  });
  // buttonProps
  watchEffect(() => {
    const { isDisabled: isDisabledProp, isLoading } = toReactive(props);
    const isDisabled = isDisabledProp || isLoading;
    const ps: UseButtonReturn["buttonProps"] = {
      "data-disabled": !!isDisabled,
      "data-focus": isFocused.value,
      "data-pressed": isPressed.value,
      // TODO
      "data-focus-visible": false,
      "data-hover": isHovered.value,
      "data-loading": !!isLoading,
      class: styles.value,
    };
    buttonProps.value = mergeClassProps(ps, attrs) as any;
  });

  useRipple(buttonRef, { disabled: disableRipple });

  return {
    ...props,
    disableRipple,
    styles,
    spinnerSize,
    buttonProps,
  };
}
