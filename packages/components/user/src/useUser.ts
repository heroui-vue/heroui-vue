import { ref, computed, watchEffect } from "vue";
import { toReactive, useFocus } from "@vueuse/core";
import { user } from "@heroui/theme";
import { toRefsWithDefault, toDataAttr, mergeClassProps, tryUseAttrs } from "@heroui-vue/shared";
import type { ToRefs, MaybeRef, Ref } from "vue";
import type { MaybeElement } from "@vueuse/core";
import type { UserSlots } from "@heroui/theme";
import type { UseAvatarProps } from "@heroui-vue/avatar";
import type { HeroUIVueBaseProps, BaseProps } from "@heroui-vue/shared";

export namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    isFocusable?: boolean;
    avatarProps?: Partial<UseAvatarProps>;
    // classNames?: SlotsToClasses<UserSlots>;
    classNames?: { [key in UserSlots]?: string | false | 0 | null | undefined };
  }
}

export namespace Return {
  export interface Slot {
    userProps: BaseProps & {
      tabIndex: 0 | -1;
      "data-focus-visible"?: boolean;
      "data-focus"?: boolean;
    };
    wrapperProps: BaseProps;
    nameProps: BaseProps;
    descriptionProps: BaseProps;
  }
}

export type UseUserProps = Props.Option;
export type UseUserReturn = Props.Option & Return.Slot;
export type UseUserSlot = "name" | "description";

export function useUser(
  originalProps?: MaybeRef<UseUserProps>,
  userRef?: MaybeRef<MaybeElement>,
): ToRefs<UseUserReturn> {
  const slots = user();
  const props = toRefsWithDefault(toReactive(originalProps || {}), {
    as: "div",
    isFocusable: false,
    avatarProps: {
      isFocusable: false,
    },
  });
  const { focused: isFocused } = useFocus(userRef);
  const attrs = tryUseAttrs();

  const canBeFocused = computed(() => {
    const { isFocusable, as } = toReactive(props);
    return isFocusable || as === "button";
  });
  const userProps = ref() as Ref<UseUserReturn["userProps"]>;
  const wrapperProps = ref() as Ref<UseUserReturn["wrapperProps"]>;
  const nameProps = ref() as Ref<UseUserReturn["nameProps"]>;
  const descriptionProps = ref() as Ref<UseUserReturn["descriptionProps"]>;

  // userProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    const user: UseUserReturn["userProps"] = {
      tabIndex: canBeFocused.value ? 0 : -1,
      // TODO
      "data-focus-visible": undefined,
      "data-focus": toDataAttr(isFocused.value),
      class: slots.base({
        class: classNames?.base,
      }),
    };
    userProps.value = mergeClassProps(user, attrs) as any;
  });
  // wrapperProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    wrapperProps.value = {
      class: slots.wrapper({ class: classNames?.wrapper }),
    };
  });
  // nameProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    nameProps.value = {
      class: slots.name({ class: classNames?.name }),
    };
  });
  // descriptionProps
  watchEffect(() => {
    const { classNames } = toReactive(props);
    descriptionProps.value = {
      class: slots.description({ class: classNames?.description }),
    };
  });

  return {
    ...props,
    userProps,
    wrapperProps,
    nameProps,
    descriptionProps,
  } as any;
}
