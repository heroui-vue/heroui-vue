import { h, Text, computed, toValue } from "vue";
import {
  mapPropsVariants,
  clsx,
  isEmpty,
  hasEmitListeners,
  cloneSlot,
  tryUseSlots,
  tryUseAttrs,
} from "@heroui-vue/shared";
import { CloseFilledIcon } from "@heroui-vue/icon";
import { chip } from "@heroui/theme";
import type { ChipVariantProps, ChipSlots, SlotsToClasses } from "@heroui/theme";
import type { MaybeRef, VNode } from "vue";
import type { HTMLHeroVueUIProps, BaseProps, ToComputedRefs } from "@heroui-vue/shared";

namespace Props {
  export interface Option extends HTMLHeroVueUIProps {
    isOneChar?: boolean;
    isCloseable?: boolean;
    hasStartContent?: boolean;
    hasEndContent?: boolean;
    isDisabled?: boolean;
    isCloseButtonFocusVisible?: boolean;
    classNames?: SlotsToClasses<ChipSlots>;
    onClose?: (e: any) => void;
  }
  export interface Variant {
    variant?: ChipVariantProps["variant"];
    size?: ChipVariantProps["size"];
    color?: ChipVariantProps["color"];
    radius?: ChipVariantProps["radius"];
  }
}
namespace Return {
  export interface Slot {
    chipProps: BaseProps;
    closeButtonProps: BaseProps & {
      role: "button";
      tabIndex: 0;
    };
    avatarProps: BaseProps;
    defaultProps: BaseProps;
    contentProps: BaseProps;
    dotProps: BaseProps;
    startContent: () => VNode | VNode[] | null;
    endContent: () => VNode | VNode[] | null;
  }
  export interface Option {
    as: Props.Option["as"];
    slots: ReturnType<typeof chip>;
    classNames?: Props.Option["classNames"];
    isDot: boolean;
    isCloseable: boolean;
  }
}

export type UseChipProps = Props.Option & Props.Variant;
export type UseChipReturn = Return.Option & Return.Slot;
export type UseChipEmit = "close";
export type UseChipSlot = "startContent" | "endContent" | "avatar" | "default";

function extractTextContent(nodes: VNode[] | undefined) {
  if (isEmpty(nodes)) {
    return "";
  } else {
    return nodes!
      .filter(({ type }) => type === Text)
      .map(({ children }) => String(children ?? ""))
      .join("");
  }
}

export function useChip(
  props: MaybeRef<UseChipProps>,
): ToComputedRefs<UseChipReturn, "isCloseable"> {
  const { class: className } = tryUseAttrs("class");
  const {
    startContent,
    endContent,
    avatar,
    default: defaultSlot,
  } = tryUseSlots<UseChipSlot[]>("startContent", "endContent", "avatar", "default");

  const { hasClose: isCloseable } = hasEmitListeners<UseChipEmit[]>("close");
  const isOneChar = extractTextContent(defaultSlot?.()).length === 1;
  const hasStartContent = !!avatar || !!startContent;
  const hasEndContent = !!endContent || isCloseable;

  const as = computed(() => toValue(props).as || "div");
  const classNames = computed(() => toValue(props).classNames);
  const isDot = computed(() => toValue(props).variant === "dot");
  const chipSlots = computed(() => {
    const [, variantProps] = mapPropsVariants(toValue(props), chip.variantKeys);
    return chip({
      ...variantProps,
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable,
    });
  });
  const chipProps = computed<Return.Slot["chipProps"]>(() => {
    const baseStyles = clsx(classNames.value?.base, className);
    return {
      class: chipSlots.value.base({ class: baseStyles }),
    };
  });
  const defaultProps = computed<Return.Slot["defaultProps"]>(() => {
    return {
      class: chipSlots.value.content({ class: classNames.value?.content }),
    };
  });
  const closeButtonProps = computed<Return.Slot["closeButtonProps"]>(() => {
    return {
      role: "button" as const,
      tabIndex: 0 as const,
      class: chipSlots.value.closeButton({ class: classNames.value?.closeButton }),
      "aria-label": "close chip",
    };
  });
  const avatarProps = computed<Return.Slot["avatarProps"]>(() => {
    return {
      class: chipSlots.value.avatar({ class: classNames.value?.avatar }),
    };
  });
  const contentProps = computed<Return.Slot["contentProps"]>(() => {
    return {
      class: clsx("max-h-[80%]"),
    };
  });
  const dotProps = computed<Return.Slot["avatarProps"]>(() => {
    return {
      class: chipSlots.value.dot({ class: classNames.value?.dot }),
    };
  });
  const startContentNode = computed<Return.Slot["startContent"]>(() => {
    return () => {
      const vnodes = cloneSlot(startContent, contentProps.value)();
      if (isDot.value && !vnodes) {
        return h("span", dotProps.value);
      } else {
        return vnodes;
      }
    };
  });
  const endContentNode = computed<Return.Slot["endContent"]>(() => {
    return () => {
      const avatarVnodes = cloneSlot(avatar, avatarProps.value)();
      const endContentVnodes = cloneSlot(endContent, contentProps.value)();
      const end = avatarVnodes || endContentVnodes;
      if (isCloseable) {
        return h("span", closeButtonProps.value, [end || h(CloseFilledIcon, { size: 18 })]);
      } else {
        return end;
      }
    };
  });

  return {
    as,
    slots: computed(() => chipSlots.value),
    classNames,
    isDot,
    isCloseable: !!isCloseable,
    chipProps,
    defaultProps,
    closeButtonProps,
    avatarProps,
    contentProps,
    dotProps,
    startContent: startContentNode,
    endContent: endContentNode,
  };
}
