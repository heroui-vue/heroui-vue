import { ref, watchEffect, h, Text } from "vue";
import { toReactive } from "@vueuse/core";
import {
  mapPropsVariants,
  isEmpty,
  hasEmitListeners,
  cloneSlot,
  tryUseSlots,
  tryUseAttrs,
  toRefsWithDefault,
} from "@heroui-vue/shared";
import { CloseFilledIcon } from "@heroui-vue/icon";
import { chip, cn } from "@heroui/theme";
import type { ChipVariantProps, ChipSlots, SlotsToClasses } from "@heroui/theme";
import type { MaybeRef, Ref, ToRefs, VNode } from "vue";
import type { HeroUIVueBaseProps, BaseProps } from "@heroui-vue/shared";

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
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
      "aria-label": "close chip";
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
  originalProps: MaybeRef<UseChipProps>,
): ToRefs<Omit<UseChipReturn, "isCloseable">> & { isCloseable: UseChipReturn["isCloseable"] } {
  const props = toRefsWithDefault(toReactive(originalProps) as UseChipProps, {
    as: "div",
  });
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

  const slots = ref() as Ref<Return.Option["slots"]>;
  const isDot = ref() as Ref<Return.Option["isDot"]>;
  const chipProps = ref() as Ref<Return.Slot["chipProps"]>;
  const defaultProps = ref() as Ref<Return.Slot["defaultProps"]>;
  const closeButtonProps = ref() as Ref<Return.Slot["closeButtonProps"]>;
  const avatarProps = ref() as Ref<Return.Slot["avatarProps"]>;
  const contentProps = ref() as Ref<Return.Slot["contentProps"]>;
  const dotProps = ref() as Ref<Return.Slot["dotProps"]>;
  const startContentSlot = ref() as Ref<Return.Slot["startContent"]>;
  const endContentSlot = ref() as Ref<Return.Slot["endContent"]>;

  // slots
  watchEffect(() => {
    const [, variantProps] = mapPropsVariants(toReactive(props), chip.variantKeys);
    slots.value = chip({
      ...variantProps,
      hasStartContent,
      hasEndContent,
      isOneChar,
      isCloseable,
    });
  });
  // isDot
  watchEffect(() => {
    isDot.value = toReactive(props).variant === "dot";
  });
  // chipProps
  watchEffect(() => {
    const { classNames, class: propsClass } = toReactive(props);
    chipProps.value = {
      class: slots.value.base({ class: cn(classNames?.base, className, propsClass) }),
    };
  });
  // defaultProps
  watchEffect(() => {
    defaultProps.value = {
      class: slots.value.content({ class: toReactive(props).classNames?.content }),
    };
  });
  // closeButtonProps
  watchEffect(() => {
    closeButtonProps.value = {
      role: "button" as const,
      tabIndex: 0 as const,
      class: slots.value.closeButton({ class: toReactive(props).classNames?.closeButton }),
      "aria-label": "close chip",
    };
  });
  // avatarProps
  watchEffect(() => {
    avatarProps.value = {
      class: slots.value.avatar({ class: toReactive(props).classNames?.avatar }),
    };
  });
  // contentProps
  watchEffect(() => {
    contentProps.value = {
      class: cn("max-h-[80%]"),
    };
  });
  // dotProps
  watchEffect(() => {
    dotProps.value = {
      class: slots.value.dot({ class: toReactive(props).classNames?.dot }),
    };
  });
  // startContentSlot
  watchEffect(() => {
    startContentSlot.value = () => {
      const startNodes = cloneSlot(startContent, contentProps.value)();
      const avatarVnodes = cloneSlot(avatar, avatarProps.value)();
      const content = avatarVnodes || startNodes;
      if (isDot.value && !content) {
        return h("span", dotProps.value);
      } else {
        return content;
      }
    };
  });
  // endContentSlot
  watchEffect(() => {
    endContentSlot.value = () => {
      const endContentVnodes = cloneSlot(endContent, contentProps.value)();
      if (isCloseable) {
        return h("span", closeButtonProps.value, [
          endContentVnodes || h(CloseFilledIcon, { size: 18 }),
        ]);
      } else {
        return endContentVnodes;
      }
    };
  });

  return {
    ...props,
    slots,
    isDot,
    isCloseable: !!isCloseable,
    chipProps,
    defaultProps,
    closeButtonProps,
    avatarProps,
    contentProps,
    dotProps,
    startContent: startContentSlot,
    endContent: endContentSlot,
  };
}
