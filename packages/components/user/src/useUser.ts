import { computed, ref, toValue } from "vue";
import { user } from "@heroui/theme";
import type { HTMLAttributes, MaybeRef } from "vue";
import type { SlotsToClasses, UserSlots } from "@heroui/theme";
import type { UseAvatarProps } from "@heroui-vue/avatar";
import type { HeroUIVueBaseProps, ToComputedRefs } from "@heroui-vue/shared";

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    /** Plain text name. Use the name slot for custom content. */
    name?: string;
    /** Plain text description. Use the description slot for custom content. */
    description?: string;
    isFocusable?: boolean;
    tabIndex?: number;
    avatarProps?: UseAvatarProps;
    classNames?: SlotsToClasses<UserSlots>;
  }
  export interface Variant {}
}

namespace Return {
  export interface Option {
    as: NonNullable<HeroUIVueBaseProps["as"]>;
    name: string | undefined;
    description: string | undefined;
    avatarProps: UseAvatarProps;
    slots: ReturnType<typeof user>;
    isFocused: boolean;
    isFocusVisible: boolean;
  }
  export interface Slot {
    userProps: HTMLAttributes & {
      "data-focus": true | undefined;
      "data-focus-visible": true | undefined;
    };
    wrapperProps: HTMLAttributes;
    nameProps: HTMLAttributes;
    descriptionProps: HTMLAttributes;
  }
}

export type UseUserProps = Props.Option & Props.Variant;
export type UserProps = UseUserProps;
export type UseUserReturn = Return.Option & Return.Slot;
export type UseUserSlot = "avatar" | "name" | "description";

export function useUser(originalProps: MaybeRef<UseUserProps> = {}): ToComputedRefs<UseUserReturn> {
  const props = computed(() => toValue(originalProps));
  const as = computed(() => props.value.as ?? "div");
  const canBeFocused = computed(() => !!props.value.isFocusable || as.value === "button");
  const isFocused = ref(false);
  const isFocusVisible = ref(false);
  const slots = computed(() => user());

  const userProps = computed<Return.Slot["userProps"]>(() => ({
    tabindex: props.value.tabIndex ?? (canBeFocused.value ? 0 : -1),
    class: slots.value.base({ class: [props.value.classNames?.base, props.value.class] }),
    "data-focus": (canBeFocused.value && isFocused.value) || undefined,
    "data-focus-visible":
      (canBeFocused.value && isFocused.value && isFocusVisible.value) || undefined,
    onFocus: (event: FocusEvent) => {
      if (!canBeFocused.value || event.target !== event.currentTarget) return;
      isFocused.value = true;
      isFocusVisible.value = (event.target as HTMLElement).matches(":focus-visible");
    },
    onBlur: () => {
      isFocused.value = false;
      isFocusVisible.value = false;
    },
    onKeydown: () => {
      if (canBeFocused.value && isFocused.value) isFocusVisible.value = true;
    },
    onPointerdown: () => {
      isFocusVisible.value = false;
    },
  }));

  return {
    as,
    slots,
    name: computed(() => props.value.name),
    description: computed(() => props.value.description),
    avatarProps: computed(() => ({
      name: props.value.name,
      isFocusable: false,
      ...props.value.avatarProps,
    })),
    isFocused: computed(() => canBeFocused.value && isFocused.value),
    isFocusVisible: computed(() => canBeFocused.value && isFocused.value && isFocusVisible.value),
    userProps,
    wrapperProps: computed(() => ({
      class: slots.value.wrapper({ class: props.value.classNames?.wrapper }),
    })),
    nameProps: computed(() => ({
      class: slots.value.name({ class: props.value.classNames?.name }),
    })),
    descriptionProps: computed(() => ({
      class: slots.value.description({ class: props.value.classNames?.description }),
    })),
  };
}
