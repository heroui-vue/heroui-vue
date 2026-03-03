import type {
  ChipVariantProps as _ChipVariantProps,
  ChipSlots as _ChipSlots,
  SlotsToClasses,
} from "@heroui/theme";
import type { ComputedRef, VNode } from "vue";

import {
  Comment,
  Text,
  computed,
  getCurrentInstance,
  useAttrs,
  useSlots,
} from "vue";
import { mapPropsVariants, clsx } from "@heroui-vue/shared";
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

export type UseChip = {
  slots: ReturnType<typeof chip>;
  classNames: ChipProps["classNames"];
  isDot: boolean;
  isCloseable: boolean;
  closeButtonProps: {
    role: string;
    tabIndex: number;
    class: string;
    "aria-label": string;
  };
  chipProps: ChipProps & {
    class: string;
    as: "div";
  };
  hasStartContent: boolean;
};

export type UseChipRefs = {
  [K in keyof UseChip]: ComputedRef<UseChip[K]>;
};

function extractTextContent(nodes: VNode[] | undefined) {
  if (!nodes?.length) {
    return "";
  }

  if (nodes.length === 1) {
    const vnode = nodes[0];

    if (vnode.type === Comment) {
      return "";
    }

    if (vnode.type === Text) {
      return String(vnode.children ?? "");
    }
  }

  if (nodes.every((node) => node.type === Text)) {
    return nodes.map((node) => String(node.children ?? "")).join("");
  }

  return "";
}

export function useChip(props: ChipProps): UseChipRefs {
  const attrs = useAttrs();
  const slots = useSlots();
  const instance = getCurrentInstance();

  const chipState = computed(() => {
    const [chipProps, variantProps] = mapPropsVariants(props, chip.variantKeys);
    const { classNames, ...otherProps } = chipProps;
    const className = attrs.class;
    const onClose = instance?.vnode.props?.onClose;

    const defaultSlot = slots.default?.();
    const children = extractTextContent(defaultSlot);
    const isCloseable = typeof onClose === "function";
    const isDot = props.variant === "dot";
    const hasStartContent = !!slots.avatar || !!slots.startContent;
    const hasEndContent = !!slots.endContent || isCloseable;
    const isOneChar = children.length === 1;

    const slotStyles = chip({
      ...variantProps,
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable,
    });

    return {
      slots: slotStyles,
      classNames,
      isDot,
      isCloseable,
      closeButtonProps: {
        role: "button",
        tabIndex: 0,
        class: slotStyles.closeButton({ class: classNames?.closeButton }),
        "aria-label": "close chip",
      },
      chipProps: {
        class: slotStyles.base({ class: clsx(classNames?.base, className) }),
        as: "div" as const,
        ...otherProps,
      },
      hasStartContent,
    };
  });

  return {
    slots: computed(() => chipState.value.slots),
    classNames: computed(() => chipState.value.classNames),
    isDot: computed(() => chipState.value.isDot),
    isCloseable: computed(() => chipState.value.isCloseable),
    closeButtonProps: computed(() => chipState.value.closeButtonProps),
    chipProps: computed(() => chipState.value.chipProps),
    hasStartContent: computed(() => chipState.value.hasStartContent),
  };
}
