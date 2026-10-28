import type {
  BadgeVariantProps as _BadgeVariantProps,
  BadgeSlots as _BadgeSlots,
  SlotsToClasses,
} from "@heroui/theme";
import type { Component, ComputedRef } from "vue";

import { computed, useAttrs, useSlots } from "vue";
import { badge } from "@heroui/theme";
import { clsx, dataAttr, mapPropsVariants } from "@heroui-vue/shared";

export interface BadgeDefineProps {
  as?: Component | keyof HTMLElementTagNameMap | (string & {});
  content?: unknown;
  disableOutline?: boolean;
  classNames?: SlotsToClasses<_BadgeSlots>;
}

export interface BadgeVariantProps {
  variant?: _BadgeVariantProps["variant"];
  color?: _BadgeVariantProps["color"];
  size?: _BadgeVariantProps["size"];
  placement?: _BadgeVariantProps["placement"];
  shape?: _BadgeVariantProps["shape"];
  isInvisible?: boolean;
  isOneChar?: boolean;
  isDot?: boolean;
  disableAnimation?: boolean;
  showOutline?: boolean;
}

export type BadgeProps = BadgeDefineProps & BadgeVariantProps;

export type UseBadge = {
  tag: string | object;
  baseProps: {
    class: string;
  } & Record<string, unknown>;
  badgeProps: {
    class: string;
    "data-invisible": string;
  };
  shouldRenderBadgeContent: boolean;
  isDot: boolean;
  content: BadgeProps["content"];
};

export type UseBadgeRefs = {
  [K in keyof UseBadge]: ComputedRef<UseBadge[K]>;
};

export function useBadge(props: BadgeProps): UseBadgeRefs {
  const attrs = useAttrs();
  const slots = useSlots();

  const badgeState = computed(() => {
    const [componentProps, variantProps] = mapPropsVariants(
      props,
      badge.variantKeys as (keyof BadgeProps)[],
    );

    const {
      as,
      class: className,
      classNames,
      content,
      disableOutline,
      isInvisible,
      isDot,
      ...otherProps
    } = { ...componentProps, ...attrs };

    const contentText =
      typeof content === "string" || typeof content === "number" ? String(content) : "";
    const hasContentSlot = !!slots.content;
    const autoIsOneChar = !isDot && contentText.length === 1 && !hasContentSlot;
    const isOneChar = variantProps.isOneChar ?? autoIsOneChar;
    const isReallyInvisible = !!isInvisible;
    const showOutline = disableOutline === true ? false : (variantProps.showOutline ?? true);

    const slotStyles = badge({
      ...variantProps,
      showOutline,
      isDot: !!isDot,
      isOneChar,
      isInvisible: isReallyInvisible,
    });

    return {
      tag: as ?? "div",
      baseProps: {
        ...otherProps,
        class: slotStyles.base({
          class: clsx(classNames?.base, className),
        }),
      },
      badgeProps: {
        class: slotStyles.badge({ class: classNames?.badge }),
        "data-invisible": dataAttr(isReallyInvisible),
      },
      shouldRenderBadgeContent: !isDot,
      isDot: !!isDot,
      content,
    };
  });

  return {
    tag: computed(() => badgeState.value.tag),
    baseProps: computed(() => badgeState.value.baseProps),
    badgeProps: computed(() => badgeState.value.badgeProps),
    shouldRenderBadgeContent: computed(() => badgeState.value.shouldRenderBadgeContent),
    isDot: computed(() => badgeState.value.isDot),
    content: computed(() => badgeState.value.content),
  };
}
