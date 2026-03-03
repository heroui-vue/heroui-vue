import type {
  AlertSlots,
  AlertVariantProps as _AlertVariantProps,
  SlotsToClasses,
} from "@heroui/theme";
import type { HTMLHeroVueUIProps } from "@heroui-vue/shared";
import type { MaybeRef } from "vue";

import {
  getCurrentInstance,
  ref,
  computed,
  watch,
  toValue,
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
  const instance = getCurrentInstance();
  const children = { ...useSlots() };
  const defineProps = ref<AlertDefineProps>();
  const variantProps = ref<AlertVariantProps>();
  const innerVisible = ref(true);
  const hasInitialVisibility = ref(false);
  const hasBoundProp = (key: string) => {
    if (!instance?.vnode.props) {
      return false;
    }

    const kebabKey = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

    return key in instance.vnode.props || kebabKey in instance.vnode.props;
  };
  const hasControlledVisibility = computed(() => hasBoundProp("isVisible"));
  const hasDefaultVisibility = computed(() => hasBoundProp("isDefaultVisible"));

  const isVisible = computed(() => {
    return hasControlledVisibility.value
      ? (defineProps.value?.isVisible ?? false)
      : innerVisible.value;
  });

  function close() {
    if (!hasControlledVisibility.value) {
      innerVisible.value = false;
    }

    return false;
  }

  const slotsProps = computed(() => {
    const {
      title,
      description,
      isClosable,
      class: className,
      classNames,
    } = defineProps.value ?? {};

    const slots = alert({
      hasContent: !isEmpty(description) || !isEmpty(children),
      ...pureObject(variantProps.value ?? {}),
    });

    const baseProps = {
      "data-visible": dataAttr(isVisible.value),
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
    const closeButtonProps = {
      type: "button",
      class: slots.closeButton({ class: classNames?.closeButton }),
    };
    const closeIconProps = {
      class: slots.closeIcon({ class: classNames?.closeIcon }),
    };
    return {
      baseProps,
      mainWrapperProps,
      descriptionProps,
      titleProps,
      alertIconProps,
      iconWrapperProps,
      closeButtonProps,
      closeIconProps,
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

      if (hasControlledVisibility.value) {
        innerVisible.value = props.isVisible ?? false;
      } else if (!hasInitialVisibility.value) {
        innerVisible.value = hasDefaultVisibility.value
          ? (props.isDefaultVisible ?? false)
          : true;
        hasInitialVisibility.value = true;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    isVisible,
    close,
    baseProps: computed(() => slotsProps.value.baseProps),
    mainWrapperProps: computed(() => slotsProps.value.mainWrapperProps),
    descriptionProps: computed(() => slotsProps.value.descriptionProps),
    titleProps: computed(() => slotsProps.value.titleProps),
    alertIconProps: computed(() => slotsProps.value.alertIconProps),
    iconWrapperProps: computed(() => slotsProps.value.iconWrapperProps),
    closeButtonProps: computed(() => slotsProps.value.closeButtonProps),
    closeIconProps: computed(() => slotsProps.value.closeIconProps),
  };
}
