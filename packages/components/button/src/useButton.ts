import { computed } from "vue";
import { button } from "@heroui/theme";
import { useFocus, useMousePressed, useElementHover } from "@vueuse/core";
import { useRipple, tryUseAttrs } from "@heroui-vue/shared";
import type { ButtonVariantProps as _ButtonVariantProps } from "@heroui/theme";
import type { HTMLHeroVueUIProps, BaseProps, ToComputedRefs } from "@heroui-vue/shared";
import type { Ref, Reactive } from "vue";

namespace HeroUIButton {
  export type VariantProps = _ButtonVariantProps;
}
namespace Props {
  export interface Option extends HTMLHeroVueUIProps<"button"> {
    disableRipple?: boolean;
    spinnerPlacement?: "start" | "end";
    isLoading?: boolean;
  }
  export interface Variant {
    variant?: HeroUIButton.VariantProps["variant"];
    size?: HeroUIButton.VariantProps["size"];
    color?: HeroUIButton.VariantProps["color"];
    radius?: HeroUIButton.VariantProps["radius"];
    fullWidth?: boolean;
    isDisabled?: boolean;
    isIconOnly?: boolean;
    disableAnimation?: boolean;
  }
  export interface Aria {}
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
    styles: string;
    isLoading: Props.Option["isLoading"];
    spinnerPlacement: Props.Option["spinnerPlacement"];
    spinnerSize: "md" | "sm" | "lg" | undefined;
    disableRipple: boolean;
    isIconOnly: boolean;
  }
}

export type UseButtonProps = Props.Option & Props.Variant & Props.Aria;
export type UseButtonReturn = Return.Option & Return.Slot;

export function useButton(
  originalProps: Reactive<UseButtonProps>,
  buttonRef: Ref<HTMLButtonElement | undefined | null>,
): ToComputedRefs<UseButtonReturn> {
  const { focused } = useFocus(buttonRef);
  const { pressed } = useMousePressed({ target: buttonRef });
  const hovered = useElementHover(buttonRef);
  const { class: className } = tryUseAttrs("class");

  const disableRipple = computed(() => {
    const { disableRipple, disableAnimation } = originalProps;
    return disableRipple || disableAnimation;
  });
  const isDisabled = computed(() => {
    const { isDisabled, isLoading } = originalProps;
    return isDisabled || isLoading;
  });
  const hooksProps = computed(() => {
    return {
      "data-focus": focused.value,
      "data-pressed": pressed.value,
      "data-hover": hovered.value,
      /* Not supported yet */
      "data-focus-visible": false,
    };
  });
  const buttonSlots = computed<Return.Slot>(() => {
    const { isLoading, fullWidth, radius, size, color, variant, disableAnimation, isIconOnly } =
      originalProps;

    const isInGroup = false;
    const disabled = !!isDisabled.value;
    const styles = button({
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled: disabled,
      isInGroup,
      disableAnimation,
      isIconOnly,
      className,
    });

    const buttonProps: Return.Slot["buttonProps"] = {
      ...hooksProps.value,
      "data-disabled": disabled,
      "data-loading": !!isLoading,
      class: styles,
    };
    return { buttonProps };
  });

  useRipple(buttonRef, { disabled: disableRipple as Ref });

  return {
    buttonProps: computed(() => buttonSlots.value.buttonProps),
    styles: computed(() => buttonSlots.value.buttonProps.class),
    isLoading: computed(() => !!originalProps.isLoading),
    spinnerPlacement: computed(() => originalProps.spinnerPlacement),
    spinnerSize: computed(() => originalProps.size),
    disableRipple: computed(() => !!disableRipple.value),
    isIconOnly: computed(() => !!originalProps.isIconOnly),
  };
}
