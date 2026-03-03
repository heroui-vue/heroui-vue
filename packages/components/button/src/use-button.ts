import type { ButtonVariantProps as _ButtonVariantProps } from "@heroui/theme";
import type { HTMLHeroVueUIProps } from "@heroui-vue/shared";
import type { Ref, MaybeRef, WatchSource } from "vue";

import { ref, watch, useAttrs } from "vue";
import { useFocus, useMousePressed, useElementHover } from "@vueuse/core";
import { dataAttr } from "@heroui/shared-utils";
import { button } from "@heroui/theme";
import { useRipple } from "@heroui-vue/shared";

export interface ButtonDefineProps extends HTMLHeroVueUIProps<"button"> {
  isLoading?: boolean;
  disableRipple?: boolean;
  spinnerPlacement?: "start" | "end";
}

export interface ButtonVariantProps {
  variant?: _ButtonVariantProps["variant"];
  size?: _ButtonVariantProps["size"];
  color?: _ButtonVariantProps["color"];
  radius?: _ButtonVariantProps["radius"];
  fullWidth?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  disableAnimation?: boolean;
}

export interface ButtonAriaProps {}

export type ButtonProps = ButtonDefineProps &
  ButtonVariantProps &
  ButtonAriaProps;

export function useButton(
  originalProps: MaybeRef<ButtonProps>,
  buttonRef: Ref<HTMLButtonElement | undefined | null>,
) {
  const attrs = useAttrs();
  const bindedProps = ref<object>();
  const disableRipple = ref<boolean>(false);
  const { focused: isFocused } = useFocus(buttonRef);
  const { pressed: isPressed } = useMousePressed({ target: buttonRef });
  const isHovered = useElementHover(buttonRef);

  useRipple(buttonRef, { disabled: disableRipple });

  watch(
    [
      originalProps as WatchSource<ButtonProps>,
      isFocused,
      isPressed,
      isHovered,
    ],
    ([originalProps = {}, isFocused, isPressed, isHovered]) => {
      const {
        class: className,
        isLoading = false,
        disableRipple: disableRippleProp = false,
        fullWidth = false,
        radius,
        size = "md",
        color = "default",
        variant = "solid",
        disableAnimation = false,
        isDisabled: isDisabledProp = false,
        isIconOnly = false,
      } = { ...originalProps, ...attrs };

      disableRipple.value = disableRippleProp || disableAnimation;
      const isInGroup = false;
      const isDisabled = isDisabledProp || isLoading;

      const styles = button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        isInGroup,
        disableAnimation,
        isIconOnly,
        className,
      });
      bindedProps.value = {
        "data-disabled": dataAttr(!!isDisabled),
        "data-focus": dataAttr(!!isFocused),
        "data-pressed": dataAttr(!!isPressed),
        /* Not supported yet */
        "data-focus-visible": dataAttr(false),
        "data-hover": dataAttr(!!isHovered),
        "data-loading": dataAttr(!!isLoading),
        "aria-disabled": dataAttr(!!isDisabled),
        disabled: isDisabled,
        class: styles,
      };
    },
    {
      immediate: true,
    },
  );

  return bindedProps;
}
