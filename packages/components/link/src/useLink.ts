import { computed, getCurrentScope, onMounted, onScopeDispose, ref, toValue } from "vue";
import { link } from "@heroui/theme";
import type { AnchorHTMLAttributes, ComponentPublicInstance, MaybeRef, Ref } from "vue";
import type { LinkVariantProps } from "@heroui/theme";
import type { HeroUIVueBaseProps, ToComputedRefs } from "@heroui-vue/shared";

/** The input and modifiers for a link press, independent of the input device. */
export interface LinkPressEvent {
  type: "press" | "pressstart" | "pressend" | "pressup";
  pointerType: "mouse" | "pen" | "touch" | "keyboard" | "virtual";
  target: HTMLElement;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  x: number;
  y: number;
}

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    href?: string;
    target?: AnchorHTMLAttributes["target"];
    rel?: string;
    download?: boolean | string;
    ping?: string;
    referrerPolicy?: AnchorHTMLAttributes["referrerpolicy"];
    isExternal?: boolean;
    showAnchorIcon?: boolean;
    autoFocus?: boolean;
    tabIndex?: number;
    onPress?: (event: LinkPressEvent) => void;
    onPressStart?: (event: LinkPressEvent) => void;
    onPressEnd?: (event: LinkPressEvent) => void;
    onPressChange?: (isPressed: boolean) => void;
    onPressUp?: (event: LinkPressEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onClick?: (event: MouseEvent) => void;
  }
  export interface Variant {
    size?: LinkVariantProps["size"];
    color?: LinkVariantProps["color"];
    underline?: LinkVariantProps["underline"];
    isBlock?: boolean;
    isDisabled?: boolean;
    disableAnimation?: boolean;
  }
}

namespace Return {
  export interface Slot {
    linkProps: AnchorHTMLAttributes & {
      "data-focus": true | undefined;
      "data-focus-visible": true | undefined;
      "data-disabled": true | undefined;
    };
  }
  export interface Option {
    as: NonNullable<HeroUIVueBaseProps["as"]>;
    showAnchorIcon: boolean;
    isPressed: boolean;
  }
}

export type UseLinkProps = Props.Option & Props.Variant;
export type LinkProps = UseLinkProps;
export type UseLinkReturn = Return.Option & Return.Slot;
export type UseLinkSlot = "default" | "anchorIcon";

export function useLink(
  originalProps: MaybeRef<UseLinkProps>,
  linkRef?: Ref<HTMLElement | ComponentPublicInstance | null | undefined>,
): ToComputedRefs<UseLinkReturn> {
  const props = computed(() => toValue(originalProps));
  const as = computed(() => props.value.as ?? "a");
  const isFocused = ref(false);
  const isFocusVisible = ref(false);
  const isPressed = ref(false);
  let pointerType: LinkPressEvent["pointerType"] = "virtual";
  let pointerId: number | undefined;
  let pressTarget: HTMLElement | undefined;
  let completedPress = false;
  let cancelledPress = false;
  let removePointerListeners = () => {};

  function pressEvent(
    type: LinkPressEvent["type"],
    event: MouseEvent | KeyboardEvent | FocusEvent,
  ): LinkPressEvent {
    const target = pressTarget ?? (event.currentTarget as HTMLElement);
    const rect = target.getBoundingClientRect();
    return {
      type,
      pointerType,
      target,
      shiftKey: "shiftKey" in event && event.shiftKey,
      ctrlKey: "ctrlKey" in event && event.ctrlKey,
      metaKey: "metaKey" in event && event.metaKey,
      altKey: "altKey" in event && event.altKey,
      x: "clientX" in event ? event.clientX - rect.left : rect.width / 2,
      y: "clientY" in event ? event.clientY - rect.top : rect.height / 2,
    };
  }

  function startPress(event: MouseEvent | KeyboardEvent) {
    if (props.value.isDisabled || isPressed.value) return;
    isPressed.value = true;
    props.value.onPressStart?.(pressEvent("pressstart", event));
    props.value.onPressChange?.(true);
  }

  function endPress(event: MouseEvent | KeyboardEvent | FocusEvent) {
    if (!isPressed.value) return;
    isPressed.value = false;
    props.value.onPressEnd?.(pressEvent("pressend", event));
    props.value.onPressChange?.(false);
  }

  function onPointerDown(event: PointerEvent) {
    if (props.value.isDisabled || event.button !== 0 || !event.isPrimary) return;
    removePointerListeners();
    pointerType =
      event.pointerType === "touch" || event.pointerType === "pen" ? event.pointerType : "mouse";
    pointerId = event.pointerId;
    pressTarget = event.currentTarget as HTMLElement;
    completedPress = false;
    cancelledPress = false;
    isFocusVisible.value = false;
    startPress(event);
    const doc = pressTarget.ownerDocument;
    const finish = (up: PointerEvent) => {
      if (up.pointerId !== pointerId) return;
      const overTarget =
        up.type === "pointerup" &&
        pressTarget?.contains(doc.elementFromPoint(up.clientX, up.clientY));
      endPress(up);
      completedPress = !!overTarget;
      cancelledPress = !overTarget;
      pointerId = undefined;
      removePointerListeners();
    };
    const cancelOnScroll = () => {
      if (pointerType !== "touch") return;
      endPress(event);
      cancelledPress = true;
      pointerId = undefined;
      removePointerListeners();
    };
    doc.addEventListener("pointerup", finish);
    doc.addEventListener("pointercancel", finish);
    doc.addEventListener("scroll", cancelOnScroll, true);
    removePointerListeners = () => {
      doc.removeEventListener("pointerup", finish);
      doc.removeEventListener("pointercancel", finish);
      doc.removeEventListener("scroll", cancelOnScroll, true);
    };
  }

  function onClick(event: MouseEvent) {
    if (props.value.isDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (event.button !== 0) return;
    if (cancelledPress && event.detail !== 0) {
      cancelledPress = false;
      event.preventDefault();
      return;
    }
    pressTarget = event.currentTarget as HTMLElement;
    if (!completedPress) {
      if (!isPressed.value) pointerType = event.detail === 0 ? "virtual" : "mouse";
      startPress(event);
      props.value.onPressUp?.(pressEvent("pressup", event));
      endPress(event);
    }
    props.value.onPress?.(pressEvent("press", event));
    props.value.onClick?.(event);
    completedPress = false;
    cancelledPress = false;
    pressTarget = undefined;
  }

  function onKeyDown(event: KeyboardEvent) {
    props.value.onKeyDown?.(event);
    if (event.defaultPrevented || props.value.isDisabled) return;
    isFocusVisible.value = isFocused.value;
    // A button rendered with role="link" must retain link keyboard semantics.
    if (event.key === " " && (event.currentTarget as HTMLElement).tagName === "BUTTON") {
      event.preventDefault();
    }
    if (event.key !== "Enter") return;
    if (event.repeat) {
      event.preventDefault();
      return;
    }
    pointerType = "keyboard";
    pressTarget = event.currentTarget as HTMLElement;
    completedPress = false;
    cancelledPress = false;
    startPress(event);
    const target = event.currentTarget as HTMLElement;
    if (!(target.tagName === "A" && target.hasAttribute("href")) && target.tagName !== "BUTTON") {
      event.preventDefault();
      target.click();
    }
  }

  function onKeyUp(event: KeyboardEvent) {
    props.value.onKeyUp?.(event);
    if (event.key === "Enter" && pointerType === "keyboard") endPress(event);
  }

  if (getCurrentScope()) {
    onScopeDispose(() => removePointerListeners());
  }
  if (linkRef) {
    onMounted(() => {
      const node = linkRef.value;
      const el = node && "$el" in node ? node.$el : node;
      if (props.value.autoFocus && !props.value.isDisabled) el?.focus();
    });
  }

  const linkProps = computed<Return.Slot["linkProps"]>(() => {
    const p = props.value;
    return {
      href: p.isDisabled ? undefined : p.href,
      target: p.target ?? (p.isExternal ? "_blank" : undefined),
      rel: p.rel ?? (p.isExternal ? "noopener noreferrer" : undefined),
      download: p.download,
      ping: p.ping,
      referrerpolicy: p.referrerPolicy,
      role: as.value !== "a" || !p.href || p.isDisabled ? "link" : undefined,
      tabindex: p.isDisabled ? -1 : (p.tabIndex ?? (as.value !== "a" || !p.href ? 0 : undefined)),
      "aria-disabled": p.isDisabled || undefined,
      "data-disabled": p.isDisabled || undefined,
      "data-focus": isFocused.value || undefined,
      "data-focus-visible": (isFocused.value && isFocusVisible.value) || undefined,
      class: link({
        size: p.size,
        color: p.color,
        underline: p.underline,
        isBlock: p.isBlock,
        isDisabled: p.isDisabled,
        disableAnimation: p.disableAnimation,
        class: p.class,
      }),
      onFocus: (event: FocusEvent) => {
        isFocused.value = true;
        isFocusVisible.value = (event.target as HTMLElement).matches(":focus-visible");
      },
      onBlur: (event: FocusEvent) => {
        isFocused.value = false;
        isFocusVisible.value = false;
        if (isPressed.value) endPress(event);
      },
      onClickCapture: (event: MouseEvent) => {
        if (p.isDisabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      onClick,
      onKeydown: onKeyDown,
      onKeyup: onKeyUp,
      onPointerdown: onPointerDown,
      onPointerup: (event: PointerEvent) => {
        if (p.isDisabled || cancelledPress || event.button !== 0 || !event.isPrimary) return;
        const target = event.currentTarget as HTMLElement;
        if (!target.contains(target.ownerDocument.elementFromPoint(event.clientX, event.clientY)))
          return;
        pressTarget = target;
        pointerType =
          event.pointerType === "touch" || event.pointerType === "pen"
            ? event.pointerType
            : "mouse";
        p.onPressUp?.(pressEvent("pressup", event));
      },
      onPointerleave: (event: PointerEvent) => {
        if (event.pointerId === pointerId) endPress(event);
      },
      onPointerenter: (event: PointerEvent) => {
        if (event.pointerId === pointerId) startPress(event);
      },
    };
  });

  return {
    as,
    linkProps,
    showAnchorIcon: computed(() => !!props.value.showAnchorIcon),
    isPressed: computed(() => isPressed.value),
  };
}
