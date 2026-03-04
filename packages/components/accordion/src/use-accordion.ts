import type {
  AccordionGroupVariantProps as _AccordionGroupVariantProps,
  AccordionItemSlots as _AccordionItemSlots,
  AccordionItemVariantProps as _AccordionItemVariantProps,
  SlotsToClasses,
} from "@heroui/theme";
import type { InjectionKey, MaybeRef, Ref } from "vue";

import { accordion, accordionItem } from "@heroui/theme";
import { clsx, dataAttr, mapPropsVariants } from "@heroui-vue/shared";
import {
  computed,
  getCurrentInstance,
  inject,
  isRef,
  provide,
  ref,
  useAttrs,
  useSlots,
  watch,
} from "vue";

export type AccordionSelectionMode = "single" | "multiple";

export interface AccordionProps {
  selectedKeys?: string[] | string;
  defaultSelectedKeys?: string[] | string;
  modelValue?: string[] | string;
  defaultExpandedKeys?: string[] | string;
  disabledKeys?: string[];
  selectionMode?: AccordionSelectionMode | "none";
  keepContentMounted?: boolean;
  variant?: _AccordionGroupVariantProps["variant"];
  fullWidth?: boolean;
  isCompact?: _AccordionItemVariantProps["isCompact"];
  hideIndicator?: _AccordionItemVariantProps["hideIndicator"];
  disableAnimation?: _AccordionItemVariantProps["disableAnimation"];
  disableIndicatorAnimation?: _AccordionItemVariantProps["disableIndicatorAnimation"];
  itemClasses?: SlotsToClasses<_AccordionItemSlots>;
  className?: string;
}

export interface AccordionItemProps {
  itemKey?: string | number;
  title?: string;
  subtitle?: string;
  isDisabled?: boolean;
  isCompact?: _AccordionItemVariantProps["isCompact"];
  hideIndicator?: _AccordionItemVariantProps["hideIndicator"];
  disableAnimation?: _AccordionItemVariantProps["disableAnimation"];
  disableIndicatorAnimation?: _AccordionItemVariantProps["disableIndicatorAnimation"];
  classNames?: SlotsToClasses<_AccordionItemSlots>;
}

export type AccordionEmits =
  | "update:modelValue"
  | "update:selectedKeys"
  | "change";

type AccordionContext = {
  variant: Ref<AccordionProps["variant"]>;
  disabledKeys: Ref<string[]>;
  selectionMode: Ref<AccordionProps["selectionMode"]>;
  keepContentMounted: Ref<boolean>;
  isCompact: Ref<AccordionProps["isCompact"]>;
  hideIndicator: Ref<AccordionProps["hideIndicator"]>;
  disableAnimation: Ref<AccordionProps["disableAnimation"]>;
  disableIndicatorAnimation: Ref<AccordionProps["disableIndicatorAnimation"]>;
  itemClasses: Ref<AccordionProps["itemClasses"]>;
  selectedKeys: Ref<string[]>;
  toggle: (key: string) => void;
};

export const accordionContextKey: InjectionKey<AccordionContext> = Symbol(
  "accordion-context",
);

function normalizeKeys(value: AccordionProps["modelValue"] | AccordionProps["defaultExpandedKeys"]) {
  if (value === undefined || value === null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  return [String(value)];
}

export function useAccordion(
  props: AccordionProps,
  emit: (event: AccordionEmits, payload: string[] | string) => void,
) {
  const attrs = useAttrs();
  const instance = getCurrentInstance();
  const selectedKeys = ref<string[]>(
    normalizeKeys(
      props.defaultExpandedKeys ??
        props.defaultSelectedKeys ??
        props.modelValue ??
        props.selectedKeys,
    ),
  );

  function hasBoundProp(key: string) {
    if (!instance?.vnode.props) {
      return false;
    }

    const kebabKey = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

    return key in instance.vnode.props || kebabKey in instance.vnode.props;
  }

  const isModelValueControlled = computed(() => hasBoundProp("modelValue"));
  const isSelectedKeysControlled = computed(() => hasBoundProp("selectedKeys"));
  const isControlled = computed(
    () => isModelValueControlled.value || isSelectedKeysControlled.value,
  );

  watch(
    () => [props.modelValue, props.selectedKeys] as const,
    (value) => {
      if (isControlled.value) {
        selectedKeys.value = normalizeKeys(value[1] ?? value[0]);
      }
    },
    { immediate: true },
  );

  watch(
    () => [props.defaultExpandedKeys, props.defaultSelectedKeys] as const,
    (value) => {
      if (!isControlled.value) {
        selectedKeys.value = normalizeKeys(value[0] ?? value[1]);
      }
    },
  );

  function toggle(key: string) {
    const mode = props.selectionMode ?? "single";

    if (mode === "none") {
      return;
    }

    const nextSet = new Set(selectedKeys.value);
    const hasKey = nextSet.has(key);

    if (mode === "multiple") {
      if (hasKey) {
        nextSet.delete(key);
      } else {
        nextSet.add(key);
      }
    } else {
      if (hasKey) {
        nextSet.clear();
      } else {
        nextSet.clear();
        nextSet.add(key);
      }
    }

    const next = Array.from(nextSet);

    if (!isControlled.value) {
      selectedKeys.value = next;
    }

    const payload = mode === "single" ? (next[0] ?? "") : next;

    emit("update:modelValue", payload);
    emit("update:selectedKeys", payload);
    emit("change", payload);
  }

  const groupState = computed(() => {
    const [groupProps, variantProps] = mapPropsVariants(
      props as Record<string, any>,
      accordion.variantKeys as (keyof AccordionProps)[],
    );

    const styles = accordion({
      ...variantProps,
    });

    return {
      class: clsx(styles, attrs.class, groupProps.className),
      role: "group",
    };
  });

  provide(accordionContextKey, {
    variant: computed(() => props.variant),
    disabledKeys: computed(() => (props.disabledKeys ?? []).map(String)),
    selectionMode: computed(() => props.selectionMode ?? "single"),
    keepContentMounted: computed(() => !!props.keepContentMounted),
    isCompact: computed(() => props.isCompact),
    hideIndicator: computed(() => props.hideIndicator),
    disableAnimation: computed(() => props.disableAnimation),
    disableIndicatorAnimation: computed(() => props.disableIndicatorAnimation),
    itemClasses: computed(() => props.itemClasses),
    selectedKeys,
    toggle,
  });

  return {
    groupProps: computed(() => groupState.value),
  };
}

export function useAccordionItem(props: MaybeRef<AccordionItemProps>) {
  const attrs = useAttrs();
  const slots = useSlots();
  const context = inject(accordionContextKey, null);
  const instance = getCurrentInstance();
  const autoKey = `accordion-item-${instance?.uid ?? Math.random().toString(36).slice(2)}`;
  const isHovered = ref(false);
  const isFocused = ref(false);
  const isPressed = ref(false);

  const itemState = computed(() => {
    const resolved = isRef(props) ? props.value : props;
    const key = String(resolved.itemKey ?? autoKey);
    const selectedKeys = context?.selectedKeys.value ?? [];
    const disabledKeys = context?.disabledKeys.value ?? [];
    const isOpen = selectedKeys.includes(key);
    const isDisabled = !!resolved.isDisabled || disabledKeys.includes(key);

    const styles = accordionItem({
      variant: context?.variant.value as any,
      isCompact: resolved.isCompact ?? context?.isCompact.value,
      isDisabled,
      hideIndicator: resolved.hideIndicator ?? context?.hideIndicator.value,
      disableAnimation: resolved.disableAnimation ?? context?.disableAnimation.value,
      disableIndicatorAnimation:
        resolved.disableIndicatorAnimation ??
        context?.disableIndicatorAnimation.value,
    });

    const classNames = {
      ...(context?.itemClasses.value ?? {}),
      ...(resolved.classNames ?? {}),
    };

    return {
      key,
      isOpen,
      isDisabled,
      keepContentMounted: context?.keepContentMounted.value ?? false,
      hideIndicator:
        resolved.hideIndicator ?? context?.hideIndicator.value ?? false,
      hasSubtitle: !!resolved.subtitle || !!slots.subtitle,
      baseProps: {
        class: styles.base({ class: clsx(classNames.base, attrs.class) }),
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        "data-hover": dataAttr(isHovered.value),
        "data-focus": dataAttr(isFocused.value),
        "data-focus-visible": dataAttr(isFocused.value),
        "data-pressed": dataAttr(isPressed.value),
      },
      headingProps: {
        class: styles.heading({ class: classNames.heading }),
      },
      triggerProps: {
        type: "button",
        class: styles.trigger({ class: classNames.trigger }),
        disabled: isDisabled,
        "aria-expanded": isOpen,
        "aria-disabled": isDisabled,
        onMouseenter: () => {
          isHovered.value = true;
        },
        onMouseleave: () => {
          isHovered.value = false;
          isPressed.value = false;
        },
        onMousedown: () => {
          isPressed.value = true;
        },
        onMouseup: () => {
          isPressed.value = false;
        },
        onFocus: () => {
          isFocused.value = true;
        },
        onBlur: () => {
          isFocused.value = false;
          isPressed.value = false;
        },
      },
      startContentProps: {
        class: styles.startContent({ class: classNames.startContent }),
      },
      indicatorProps: {
        class: styles.indicator({ class: classNames.indicator }),
        "data-open": dataAttr(isOpen),
      },
      titleWrapperProps: {
        class: styles.titleWrapper({ class: classNames.titleWrapper }),
      },
      titleProps: {
        class: styles.title({ class: classNames.title }),
      },
      subtitleProps: {
        class: styles.subtitle({ class: classNames.subtitle }),
      },
      contentProps: {
        class: styles.content({ class: classNames.content }),
        "data-open": dataAttr(isOpen),
      },
    };
  });

  function toggle() {
    const state = itemState.value;

    if (state.isDisabled) {
      return;
    }

    context?.toggle(state.key);
  }

  return {
    itemKey: computed(() => itemState.value.key),
    isOpen: computed(() => itemState.value.isOpen),
    isDisabled: computed(() => itemState.value.isDisabled),
    keepContentMounted: computed(() => itemState.value.keepContentMounted),
    hideIndicator: computed(() => itemState.value.hideIndicator),
    hasSubtitle: computed(() => itemState.value.hasSubtitle),
    baseProps: computed(() => itemState.value.baseProps),
    headingProps: computed(() => itemState.value.headingProps),
    triggerProps: computed(() => itemState.value.triggerProps),
    startContentProps: computed(() => itemState.value.startContentProps),
    indicatorProps: computed(() => itemState.value.indicatorProps),
    titleWrapperProps: computed(() => itemState.value.titleWrapperProps),
    titleProps: computed(() => itemState.value.titleProps),
    subtitleProps: computed(() => itemState.value.subtitleProps),
    contentProps: computed(() => itemState.value.contentProps),
    toggle,
  };
}
