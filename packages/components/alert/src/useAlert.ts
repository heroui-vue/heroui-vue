import { ref, computed, watch, toValue, mergeProps, useSlots, toRef } from "vue";
import { pureObject } from "@heroui-vue/shared";
import { alert as getAlertSlots } from "@heroui/theme";
import { mapPropsVariants } from "@heroui-vue/shared";
import { isEmpty } from "@heroui/shared-utils";

import type {
  AlertSlots as _AlertSlots,
  AlertVariantProps as _AlertVariantProps,
  SlotsToClasses,
} from "@heroui/theme";
import type { HTMLHeroVueUIProps, BaseProps, ToComputedRefs } from "@heroui-vue/shared";
import type { MaybeRef, Ref } from "vue";

namespace HeroUIAlert {
  export type Slots = _AlertSlots;
  export type VariantProps = _AlertVariantProps;
}

export interface AlertDefineProps extends /* @vue-ignore */ HTMLHeroVueUIProps {
  title?: string;
  description?: string;
  isVisible?: boolean;
  isDefaultVisible?: boolean;
  isClosable?: boolean;
  classNames?: SlotsToClasses<HeroUIAlert.Slots>;
  runtime?: "vitest" | "browser";
}

export interface AlertVariantProps {
  variant?: HeroUIAlert.VariantProps["variant"];
  color?: HeroUIAlert.VariantProps["color"];
  radius?: HeroUIAlert.VariantProps["radius"];
  hideIcon?: boolean;
  hideIconWrapper?: boolean;
  hasContent?: boolean;
}

export interface AlertSlotsProps {
  baseProps: BaseProps & {
    "data-visible": boolean;
    "data-closeable": boolean;
    "data-has-title": boolean;
    "data-has-description": boolean;
  };
  mainWrapperProps: BaseProps;
  descriptionProps: BaseProps;
  titleProps: BaseProps;
  alertIconProps: BaseProps;
  iconWrapperProps: BaseProps;
  closeButtonProps: BaseProps;
}

export type UseAlertReturn = ToComputedRefs<
  AlertSlotsProps & {
    isVisible: boolean;
    isClosable?: boolean;
    color: AlertVariantProps["color"];
    hasContent?: boolean;
  }
> & {
  close: () => undefined;
};

export type UseAlertProps = AlertDefineProps & AlertVariantProps;

export function useAlert(originalProps: MaybeRef<UseAlertProps>): UseAlertReturn {
  const defineProps = ref<AlertDefineProps>();
  const variantProps = ref<AlertVariantProps>();
  const innerVisible = ref(true);
  const children = toValue(originalProps)?.runtime !== "vitest" ? useSlots() : null;

  const hasContent = computed(() => {
    const { description } = defineProps.value ?? {};
    return !isEmpty(description) || !isEmpty(children);
  });

  const slotsProps = computed(() => {
    const { title, description, isClosable, classNames } = defineProps.value ?? {};
    const slots = getAlertSlots({
      hasContent: hasContent.value,
      ...pureObject(variantProps.value ?? {}),
    });

    const baseProps = {
      "data-visible": innerVisible.value,
      "data-closeable": !!isClosable,
      "data-has-title": !isEmpty(title),
      "data-has-description": !isEmpty(description),
      class: slots.base(mergeProps({ class: classNames?.base }, { class: classNames })),
    };
    const mainWrapperProps = {
      class: slots.mainWrapper({ class: classNames?.mainWrapper }),
    };
    const descriptionProps = {
      class: slots.description({ class: classNames?.description }),
    };
    const titleProps = {
      class: slots.title({ class: classNames?.title }),
    };
    const alertIconProps = {
      class: slots.alertIcon({ class: classNames?.alertIcon }),
    };
    const iconWrapperProps = {
      class: slots.iconWrapper({ class: classNames?.iconWrapper }),
    };
    const closeButtonProps = {
      class: slots.closeButton({ class: classNames?.closeButton }),
    };
    return {
      baseProps,
      mainWrapperProps,
      descriptionProps,
      titleProps,
      alertIconProps,
      iconWrapperProps,
      closeButtonProps,
    };
  });

  const watchedProps = toRef(originalProps) as Ref<UseAlertProps>;

  watch(
    watchedProps,
    (originalProps) => {
      const props = toValue(originalProps) ?? {};
      const [define, variant] = mapPropsVariants(props, getAlertSlots.variantKeys);
      defineProps.value = define;
      variantProps.value = variant;
      innerVisible.value = !!define.isVisible || !!define.isDefaultVisible;
    },
    {
      immediate: true,
    },
  );

  return {
    isVisible: computed(() => innerVisible.value),
    isClosable: computed(() => !!defineProps.value?.isClosable),
    color: computed(() => variantProps.value?.color),
    hasContent: computed(() => hasContent.value),
    close: () => {
      innerVisible.value = false;
    },
    baseProps: computed(() => slotsProps.value.baseProps),
    mainWrapperProps: computed(() => slotsProps.value.mainWrapperProps),
    descriptionProps: computed(() => slotsProps.value.descriptionProps),
    titleProps: computed(() => slotsProps.value.titleProps),
    alertIconProps: computed(() => slotsProps.value.alertIconProps),
    iconWrapperProps: computed(() => slotsProps.value.iconWrapperProps),
    closeButtonProps: computed(() => slotsProps.value.closeButtonProps),
  };
}
