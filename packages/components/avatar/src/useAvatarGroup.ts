import { ref, watchEffect, h } from "vue";
import { toReactive } from "@vueuse/core";
import {
  clsx,
  isValidVNode,
  tryUseAttrs,
  tryUseSlots,
  toRefsWithDefault,
  compact,
  cloneValidVnode,
} from "@heroui-vue/shared";
import Avatar from "./Avatar.vue";
import { avatarGroup, cn } from "@heroui/theme";
import type { AvatarGroupSlots, SlotsToClasses } from "@heroui/theme";
import type { InjectionKey, MaybeRef, Ref, ToRefs, VNode } from "vue";
import type { HeroUIVueBaseProps, BaseProps } from "@heroui-vue/shared";
import type { UseAvatarProps } from "./useAvatar";

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    isGrid?: boolean;
    max?: number;
    total?: number;
    classNames?: SlotsToClasses<AvatarGroupSlots>;
  }
  export interface Variant extends Context {}
}
namespace Return {
  export interface Slot {
    avatarGroupProps: BaseProps & {
      role: "group";
    };
    avatarGroupCountProps: BaseProps;
    clones: () => VNode[];
    renderCount: () => VNode | VNode[] | null | undefined;
  }
  export interface Option extends Props.Option {
    context: Context;
    // remainingCount: () => number;
  }
}

interface Context {
  size?: UseAvatarProps["size"];
  color?: UseAvatarProps["color"];
  radius?: UseAvatarProps["radius"];
  isGrid?: boolean;
  isBordered?: boolean;
  isDisabled?: boolean;
}

export type UseAvatarGroupProps = Props.Option & Props.Variant;
export type UseAvatarGroupReturn = Return.Option & Return.Slot & UseAvatarGroupProps;
export type UseAvatarGroupContext = Context;
export type UseAvatarGroupSlot = "renderCount" | "default";

export const avatarGroupContextKey: InjectionKey<Ref<UseAvatarGroupContext>> =
  Symbol("avatar-group-context");

export function useAvatarGroup(
  originalProps: MaybeRef<UseAvatarGroupProps>,
): ToRefs<UseAvatarGroupReturn> {
  const props = toRefsWithDefault(toReactive(originalProps) as UseAvatarGroupProps, {
    as: "div",
    max: 5,
  });
  const { class: className } = tryUseAttrs("class");
  const { default: defaultSlot, renderCount } = tryUseSlots<UseAvatarGroupSlot[]>(
    "default",
    "renderCount",
  );

  const slots = ref() as Ref<ReturnType<typeof avatarGroup>>;
  const context = ref() as Ref<Context>;
  // const remainingCount = ref() as Ref<Return.Option["remainingCount"]>;
  const clonesSlot = ref() as Ref<Return.Slot["clones"]>;
  const renderCountSlot = ref() as Ref<Return.Slot["renderCount"]>;
  const avatarGroupProps = ref() as Ref<Return.Slot["avatarGroupProps"]>;
  const avatarGroupCountProps = ref() as Ref<Return.Slot["avatarGroupCountProps"]>;

  // slots
  watchEffect(() => {
    const { isGrid } = toReactive(props);
    slots.value = avatarGroup({ isGrid });
  });
  // context
  watchEffect(() => {
    const { size, color, radius, isGrid, isBordered, isDisabled } = toReactive(props);
    context.value = { size, color, radius, isGrid, isBordered, isDisabled };
  });
  // clonesSlot
  watchEffect(() => {
    const { isGrid, max, total } = toReactive(props);
    clonesSlot.value = () => {
      const validChildren = defaultSlot?.()?.filter(isValidVNode) || [];
      const count = total ? total : max != null ? validChildren.length - max : -1;
      const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;
      return childrenWithinMax.flatMap((child, index) => {
        const isFirstAvatar = index === 0;
        const isLastAvatar = index === childrenWithinMax.length - 1;
        const childProps = {
          class: clsx(
            isFirstAvatar ? "ms-0" : !isGrid ? "-ms-2" : "",
            isLastAvatar && count < 1 ? "hover:-translate-x-0" : "",
          ),
        };
        return cloneValidVnode(child, compact(childProps))!;
      });
    };
  });
  // renderCountSlot
  watchEffect(() => {
    const { max, total } = toReactive(props);
    renderCountSlot.value = () => {
      const validChildren = defaultSlot?.()?.filter(isValidVNode) || [];
      const count = total ? total : max != null ? validChildren.length - max : -1;
      if (count > 0) {
        return renderCount
          ? renderCount({ count })
          : h(Avatar, {
              ...avatarGroupCountProps.value,
              name: `+${count}`,
            });
      }
    };
  });
  // avatarGroupProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    avatarGroupProps.value = {
      role: "group",
      class: slots.value.base({
        class: cn(classNames?.base, className),
      }),
    };
  });
  // avatarGroupCountProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    avatarGroupCountProps.value = {
      class: slots.value.count({ class: classNames?.count }),
    };
  });

  return {
    ...props,
    context,
    // remainingCount,
    renderCount: renderCountSlot,
    clones: clonesSlot,
    avatarGroupProps,
    avatarGroupCountProps,
  };
}
