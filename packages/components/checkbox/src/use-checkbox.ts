import type {
  CheckboxSlots as _CheckboxSlots,
  CheckboxVariantProps as _CheckboxVariantProps,
  SlotsToClasses,
} from "@heroui/theme";
import type { ComputedRef } from "vue";

import { checkbox } from "@heroui/theme";
import { clsx, dataAttr, mapPropsVariants } from "@heroui-vue/shared";
import { computed, getCurrentInstance, ref, useAttrs, useSlots, watch } from "vue";

export interface CheckboxDefineProps {
  icon?: any;
  modelValue?: boolean;
  isSelected?: boolean;
  defaultSelected?: boolean;
  isReadOnly?: boolean;
  isIndeterminate?: boolean;
  name?: string;
  value?: string | number;
  id?: string;
  classNames?: SlotsToClasses<_CheckboxSlots>;
}

export interface CheckboxVariantProps {
  color?: _CheckboxVariantProps["color"];
  size?: _CheckboxVariantProps["size"];
  radius?: _CheckboxVariantProps["radius"];
  lineThrough?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  disableAnimation?: boolean;
}

export type CheckboxProps = CheckboxDefineProps & CheckboxVariantProps;

export type CheckboxEmits = "update:modelValue" | "change" | "valueChange";

export type UseCheckbox = {
  isSelected: boolean;
  baseProps: Record<string, unknown>;
  inputProps: Record<string, unknown>;
  wrapperProps: Record<string, unknown>;
  iconProps: Record<string, unknown>;
  iconSlotProps: Record<string, unknown>;
  labelProps: Record<string, unknown>;
  isIndeterminate: boolean;
  hasLabel: boolean;
  onInputChange: (event: Event) => void;
  onPressStart: () => void;
  onPressEnd: () => void;
};

export type UseCheckboxRefs = {
  [K in keyof Omit<UseCheckbox, "onInputChange" | "onPressStart" | "onPressEnd">]: ComputedRef<
    UseCheckbox[K]
  >;
} & Pick<UseCheckbox, "onInputChange" | "onPressStart" | "onPressEnd">;

export function useCheckbox(
  props: CheckboxProps,
  emit: (
    event: CheckboxEmits,
    payload: boolean,
  ) => void,
): UseCheckboxRefs {
  const attrs = useAttrs();
  const slots = useSlots();
  const instance = getCurrentInstance();
  const isHovered = ref(false);
  const isPressed = ref(false);
  const innerSelected = ref(!!props.defaultSelected);

  function hasBoundProp(key: string) {
    if (!instance?.vnode.props) {
      return false;
    }

    const kebabKey = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

    return key in instance.vnode.props || kebabKey in instance.vnode.props;
  }

  const hasModelValue = computed(() => hasBoundProp("modelValue"));
  const hasIsSelected = computed(() => hasBoundProp("isSelected"));

  const controlledSelected = computed(() => {
    if (hasModelValue.value) {
      return !!props.modelValue;
    }

    if (hasIsSelected.value) {
      return !!props.isSelected;
    }

    return undefined;
  });

  watch(
    () => props.defaultSelected,
    (value) => {
      if (controlledSelected.value === undefined) {
        innerSelected.value = !!value;
      }
    },
  );

  watch(
    controlledSelected,
    (value) => {
      if (value !== undefined) {
        innerSelected.value = value;
      }
    },
    { immediate: true },
  );

  const checkboxState = computed(() => {
    const [componentProps, variantProps] = mapPropsVariants(
      props,
      checkbox.variantKeys as (keyof CheckboxProps)[],
    );
    const {
      class: className,
      classNames,
      modelValue,
      isSelected,
      defaultSelected,
      isReadOnly,
      isIndeterminate,
      id,
      name,
      value,
      ...otherProps
    } = { ...componentProps, ...attrs };

    const selected = controlledSelected.value ?? innerSelected.value;
    const hasLabel = !!slots.default;
    const styles = checkbox({
      ...variantProps,
      isDisabled: !!props.isDisabled,
      isInvalid: !!props.isInvalid,
    });

    return {
      isSelected: selected,
      isIndeterminate: !!isIndeterminate,
      hasLabel,
      baseProps: {
        class: styles.base({ class: clsx(classNames?.base, className) }),
        "data-selected": dataAttr(selected),
        "data-pressed": dataAttr(isPressed.value),
        "data-hover": dataAttr(isHovered.value),
        "data-invalid": dataAttr(!!props.isInvalid),
        "data-disabled": dataAttr(!!props.isDisabled),
        "data-readonly": dataAttr(!!isReadOnly),
        "data-indeterminate": dataAttr(!!isIndeterminate),
        onMouseenter: () => {
          isHovered.value = true;
        },
        onMouseleave: () => {
          isHovered.value = false;
          isPressed.value = false;
        },
      },
      inputProps: {
        id,
        name,
        value,
        type: "checkbox",
        role: "checkbox",
        checked: selected,
        class: styles.hiddenInput({ class: classNames?.hiddenInput }),
        disabled: !!props.isDisabled,
        readonly: !!isReadOnly,
        "aria-invalid": !!props.isInvalid,
        "aria-checked": selected,
        "aria-readonly": !!isReadOnly,
        ...otherProps,
      },
      wrapperProps: {
        class: styles.wrapper({ class: classNames?.wrapper }),
        "aria-hidden": true,
      },
      iconProps: {
        class: clsx(
          styles.icon({ class: classNames?.icon }),
          "inline-flex items-center justify-center",
        ),
      },
      iconSlotProps: {
        class: clsx(
          styles.icon({ class: classNames?.icon }),
          "inline-flex items-center justify-center",
        ),
        className: clsx(
          styles.icon({ class: classNames?.icon }),
          "inline-flex items-center justify-center",
        ),
        "data-checked": dataAttr(selected),
        isSelected: selected,
        isIndeterminate: !!isIndeterminate,
        disableAnimation: !!props.disableAnimation,
      },
      labelProps: {
        class: styles.label({ class: classNames?.label }),
      },
    };
  });

  function onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const next = !!target.checked;

    if (props.isReadOnly || props.isDisabled) {
      target.checked = checkboxState.value.isSelected;
      return;
    }

    if (controlledSelected.value === undefined) {
      innerSelected.value = next;
    }

    emit("update:modelValue", next);
    emit("change", next);
    emit("valueChange", next);
  }

  function onPressStart() {
    isPressed.value = true;
  }

  function onPressEnd() {
    isPressed.value = false;
  }

  return {
    isSelected: computed(() => checkboxState.value.isSelected),
    isIndeterminate: computed(() => checkboxState.value.isIndeterminate),
    hasLabel: computed(() => checkboxState.value.hasLabel),
    baseProps: computed(() => checkboxState.value.baseProps),
    inputProps: computed(() => checkboxState.value.inputProps),
    wrapperProps: computed(() => checkboxState.value.wrapperProps),
    iconProps: computed(() => checkboxState.value.iconProps),
    iconSlotProps: computed(() => checkboxState.value.iconSlotProps),
    labelProps: computed(() => checkboxState.value.labelProps),
    onInputChange,
    onPressStart,
    onPressEnd,
  };
}
