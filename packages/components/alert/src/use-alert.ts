import type {
  AlertSlots,
  AlertVariantProps as _AlertVariantProps,
  SlotsToClasses,
} from "@heroui/theme";
import type { HTMLHeroVueUIProps } from "@heroui-vue/shared";
import type { MaybeRef, Reactive } from "vue";

import {
  ref,
  computed,
  watch,
  toValue,
  toRefs,
  mergeProps,
  useSlots,
} from "vue";
import { pureObject } from "@heroui-vue/shared";
import { alert } from "@heroui/theme";
import { mapPropsVariants } from "@heroui-vue/shared";
import { dataAttr, isEmpty } from "@heroui/shared-utils";

export interface AlertDefineProps extends /* @vue-ignore */ HTMLHeroVueUIProps {
  title?: string;
  description?: string;
  isVisible?: boolean;
  isDefaultVisible?: boolean;
  isClosable?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Alert :classNames="{
   *    base:"base-classes",
   *    mainWrapper: "mainWrapper-classes"
   *    description: "description-classes"
   *    title: "title-classes"
   *    closeButton: "closeButton-classes"
   *    closeIcon: "closeIcon-classes"
   * }" />
   * ```
   */
  classNames?: SlotsToClasses<AlertSlots>;
}

/**
 * Alert variants
 */
export interface AlertVariantProps {
  variant?: _AlertVariantProps["variant"];
  color?: _AlertVariantProps["color"];
  radius?: _AlertVariantProps["radius"];
  hideIcon?: boolean;
  hideIconWrapper?: boolean;
  hasContent?: boolean;
}

export type AlertProps = AlertDefineProps & AlertVariantProps;

export function useAlert(originalProps: MaybeRef<AlertProps>) {
  const children = { ...useSlots() };
  const defineProps = ref<AlertDefineProps>();
  const variantProps = ref<AlertVariantProps>();

  const slotsProps = computed(() => {
    const {
      title,
      description,
      isClosable,
      isVisible: isVisibleProp,
      isDefaultVisible,
      class: className,
      classNames,
    } = defineProps.value ?? {};

    const isVisible = isVisibleProp ?? isDefaultVisible ?? true;

    const slots = alert({
      hasContent: !isEmpty(description) || !isEmpty(children),
      ...pureObject(variantProps.value ?? {}),
    });

    const baseProps = {
      "data-visible": dataAttr(isVisible),
      "data-closeable": dataAttr(isClosable),
      "data-has-title": dataAttr(!isEmpty(title)),
      "data-has-description": dataAttr(!isEmpty(description)),
      class: slots.base(
        mergeProps({ class: classNames?.base }, { class: className }),
      ),
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
    return {
      baseProps,
      mainWrapperProps,
      descriptionProps,
      titleProps,
      alertIconProps,
      iconWrapperProps,
    };
  });

  watch(
    originalProps,
    (originalProps) => {
      const [props, _variantProps] = mapPropsVariants(
        toValue(originalProps),
        alert.variantKeys,
      );

      defineProps.value = props;
      variantProps.value = _variantProps;
    },
    {
      immediate: true,
    },
  );

  return { ...toRefs(toValue(slotsProps)) };
}
