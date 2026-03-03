import type {
  ChipVariantProps as _ChipVariantProps,
  ChipSlots as _ChipSlots,
  SlotsToClasses,
} from "@heroui/theme";
import type { HTMLHeroVueUIProps, ReactMockProps } from "@heroui-vue/shared";
import type { ComputedRef } from "vue";

import { computed } from "vue";
import { useMockReact, mapPropsVariants, clsx } from "@heroui-vue/shared";
import { chip } from "@heroui/theme";

export interface ChipDefineProps {
  classNames?: SlotsToClasses<_ChipSlots>;
}

export interface ChipVariantProps {
  variant?: _ChipVariantProps["variant"];
  size?: _ChipVariantProps["size"];
  color?: _ChipVariantProps["color"];
  radius?: _ChipVariantProps["radius"];
  isOneChar?: boolean;
  isCloseable?: boolean;
  hasStartContent?: boolean;
  hasEndContent?: boolean;
  isDisabled?: boolean;
  isCloseButtonFocusVisible?: boolean;
}

export type ChipProps = ChipDefineProps & ChipVariantProps;

export type ChipSlots = "avatar" | "startContent" | "endContent";

export type ChipEmits = "close";

function _chip(originalProps: ReactMockProps<ChipProps, ChipSlots, ChipEmits>) {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    chip.variantKeys,
  );

  const {
    children,
    avatar,
    startContent,
    endContent,
    onClose,
    classNames,
    className,
    ...otherProps
  } = props;

  const baseStyles = clsx(classNames?.base, className);

  const isCloseable = !!onClose;
  const isDotVariant = originalProps.variant === "dot";

  const isOneChar = typeof children === "string" && children?.length === 1;

  const hasStartContent = !!avatar || !!startContent;
  const hasEndContent = !!endContent || isCloseable;

  const slots = chip({
    ...variantProps,
    hasStartContent,
    hasEndContent,
    isOneChar,
    isCloseable,
  });

  const getChipProps = ():
    | ChipProps
    | {
        class: string;
      } => {
    return {
      class: slots.base({ class: baseStyles }),
      as: "div",
      ...otherProps,
    };
  };

  const getCloseButtonProps = (): {
    role: string;
    tabIndex: number;
    class: string;
    "aria-label": string;
  } => {
    return {
      role: "button",
      tabIndex: 0,
      class: slots.closeButton({ class: classNames?.closeButton }),
      "aria-label": "close chip",
    };
  };

  return {
    slots,
    classNames,
    isDot: isDotVariant,
    isCloseable,
    getCloseButtonProps,
    getChipProps,
    hasStartContent,
  };
}

export type UseChip = {
  slots: ReturnType<typeof chip>;
  classNames: ChipProps["classNames"];
  isDot: boolean;
  isCloseable: boolean;
  getCloseButtonProps: () => {
    role: string;
    tabIndex: number;
    class: string;
    "aria-label": string;
  };
  getChipProps: () => ChipProps & {
    class: string;
  };
  hasStartContent: boolean;
};

export type UseChipRefs = {
  [K in keyof UseChip]: ComputedRef<UseChip[K]>;
};

export function useChip(props: ChipProps): UseChipRefs {
  const mockProps = useMockReact<ChipProps, ChipSlots, ChipEmits>(props);
  const chipReturn = computed(() => _chip(mockProps.value));

  return {
    slots: computed(() => chipReturn.value.slots),
    classNames: computed(() => chipReturn.value.classNames),
    isDot: computed(() => chipReturn.value.isDot),
    isCloseable: computed(() => chipReturn.value.isCloseable),
    getCloseButtonProps: computed(() => chipReturn.value.getCloseButtonProps),
    getChipProps: computed(() => chipReturn.value.getChipProps),
    hasStartContent: computed(() => chipReturn.value.hasStartContent),
  };
}
