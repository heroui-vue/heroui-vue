import { ref, computed, watch, mergeProps, toRef, toValue } from "vue";
import { pureObject, mapPropsVariants, isEmpty, useChildren } from "@heroui-vue/shared";
import { alert as getAlertSlots } from "@heroui/theme";
import type { AlertSlots, AlertVariantProps, SlotsToClasses } from "@heroui/theme";
import type { HTMLHeroVueUIProps, BaseProps, ToComputedRefs } from "@heroui-vue/shared";
import type { Ref, MaybeRef } from "vue";

namespace Props {
  export interface Option extends HTMLHeroVueUIProps {
    title?: string;
    description?: string;
    isVisible?: boolean;
    isDefaultVisible?: boolean;
    isClosable?: boolean;
    classNames?: SlotsToClasses<AlertSlots>;
  }
  export interface Variant {
    variant?: AlertVariantProps["variant"];
    color?: AlertVariantProps["color"];
    radius?: AlertVariantProps["radius"];
    hideIcon?: boolean;
    hideIconWrapper?: boolean;
    hasContent?: boolean;
  }
}
namespace Return {
  export interface Slot {
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
  export interface Option {
    isVisible: boolean;
    isClosable: boolean;
    color: Props.Variant["color"];
    hasContent: boolean;
    close: () => undefined;
  }
}

export type UseAlertReturn = ToComputedRefs<Return.Slot & Return.Option, "close">;
export type UseAlertProps = Props.Option & Props.Variant;

export function useAlert(originalProps: MaybeRef<UseAlertProps>): UseAlertReturn {
  const defineProps = ref<Props.Option>();
  const variantProps = ref<Props.Variant>();
  const innerVisible = ref(true);
  const children = useChildren();

  const hasContent = computed(() => {
    const { description } = defineProps.value ?? {};
    return !isEmpty(description) || !isEmpty(children.value);
  });
  const baseDataProps = computed(() => {
    const { title, description, isClosable } = toValue(originalProps);
    return {
      "data-visible": innerVisible.value,
      "data-closeable": !!isClosable,
      "data-has-title": !isEmpty(title),
      "data-has-description": !isEmpty(description),
    };
  });

  const slotsProps = computed(() => {
    const { classNames } = defineProps.value ?? {};
    const slots = getAlertSlots({
      hasContent: hasContent.value,
      ...pureObject(variantProps.value ?? {}),
    });

    const baseProps = {
      ...baseDataProps.value,
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
      const props = originalProps ?? {};
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
