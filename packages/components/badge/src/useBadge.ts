import { ref, watchEffect } from "vue";
import { toReactive } from "@vueuse/core";
import { tryUseAttrs, toRefsWithDefault, mapPropsVariants, tryUseSlots } from "@heroui-vue/shared";
import { badge, cn } from "@heroui/theme";
import type { HeroUIVueBaseProps, BaseProps } from "@heroui-vue/shared";
import type { BadgeSlots, BadgeVariantProps, SlotsToClasses } from "@heroui/theme";
import type { Ref, MaybeRef, ToRefs, VNode } from "vue";

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    content?: string | number;
    disableOutline?: boolean;
    classNames?: SlotsToClasses<BadgeSlots>;
  }

  export interface Variant {
    variant?: BadgeVariantProps["variant"];
    color?: BadgeVariantProps["color"];
    size?: BadgeVariantProps["size"];
    placement?: BadgeVariantProps["placement"];
    shape?: BadgeVariantProps["shape"];
    isInvisible?: boolean;
    isOneChar?: boolean;
    isDot?: boolean;
    disableAnimation?: boolean;
    showOutline?: boolean;
  }
}

namespace Return {
  export interface Slot {
    baseProps: BaseProps;
    badgeProps: BaseProps & {
      "data-invisible": boolean;
    };
    contentSlot: () => VNode[] | VNode | null;
  }
  export interface Option extends UseBadgeProps {
    slots: ReturnType<typeof badge>;
  }
}

export type UseBadgeProps = Props.Option & Props.Variant;
export type UseBadgeReturn = Return.Option & Return.Slot;
export type UseBadgeSlot = "content" | "default";

export function useBadge(originalProps: MaybeRef<UseBadgeProps>): ToRefs<UseBadgeReturn> {
  const props = toRefsWithDefault(toReactive(originalProps) as UseBadgeProps, {
    as: "span",
    disableAnimation: false,
    disableOutline: false,
    showOutline: true,
    classNames: {},
  });
  const { class: className } = tryUseAttrs("class");
  const { content } = tryUseSlots<UseBadgeSlot[]>("content");

  const slots = ref() as Ref<Return.Option["slots"]>;
  const baseProps = ref() as Ref<Return.Slot["baseProps"]>;
  const badgeProps = ref() as Ref<Return.Slot["badgeProps"]>;
  const contentSlot = ref() as Ref<Return.Slot["contentSlot"]>;

  // slots
  watchEffect(() => {
    const { content, disableOutline, showOutline, isOneChar: isOneCharProp } = toReactive(props);
    const isOneChar = String(content)?.length === 1 || isOneCharProp;
    const isDot = String(content)?.length === 0;
    const [, variantProps] = mapPropsVariants(
      toReactive(props) as UseBadgeProps,
      badge.variantKeys,
    );
    slots.value = badge({
      ...variantProps,
      showOutline: disableOutline ? !disableOutline : showOutline,
      isOneChar,
      isDot,
    });
  });
  // baseProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    baseProps.value = {
      class: slots.value.base({ class: classNames?.base }),
    };
  });
  // badgeProps
  watchEffect(() => {
    const { classNames, isInvisible } = toReactive(props);
    const baseStyles = cn(classNames?.badge, className);
    badgeProps.value = {
      class: slots.value.badge({ class: baseStyles }),
      "data-invisible": !!isInvisible,
    };
  });
  // contentSlot
  watchEffect(() => {
    const { content: contentProp } = toReactive(props);
    contentSlot.value = () => {
      return content?.() || (String(contentProp) as any as VNode);
    };
  });

  return {
    ...props,
    slots,
    baseProps,
    badgeProps,
    contentSlot,
  };
}
