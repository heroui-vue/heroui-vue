import {
  computed,
  getCurrentInstance,
  onMounted,
  onScopeDispose,
  ref,
  toValue,
  useId,
  watch,
} from "vue";
import { popover } from "@heroui/theme";
import { getTooltipPosition } from "./position";
import type { CSSProperties, HTMLAttributes, MaybeRef, Ref, TransitionProps } from "vue";
import type { PopoverVariantProps, SlotsToClasses } from "@heroui/theme";
import type { HeroUIVueBaseProps, ToComputedRefs } from "@heroui-vue/shared";
import type { TooltipPlacement } from "./position";

interface TooltipGroup {
  close?: () => void;
  warmUntil: number;
}
const groups = new WeakMap<Document, TooltipGroup>();

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    /** Use the content slot for markup. */
    content?: string;
    isOpen?: boolean;
    defaultOpen?: boolean;
    isDisabled?: boolean;
    delay?: number;
    closeDelay?: number;
    trigger?: "focus";
    placement?: TooltipPlacement;
    offset?: number;
    crossOffset?: number;
    containerPadding?: number;
    shouldFlip?: boolean;
    showArrow?: boolean;
    isDismissable?: boolean;
    shouldCloseOnBlur?: boolean;
    isKeyboardDismissDisabled?: boolean;
    shouldCloseOnInteractOutside?: (element: HTMLElement) => boolean;
    portalContainer?: Element | string;
    updatePositionDeps?: unknown[];
    /** Vue Transition classes and hooks, replacing React Framer Motion props. */
    motionProps?: TransitionProps;
    classNames?: SlotsToClasses<"base" | "arrow" | "content">;
    onOpenChange?: (isOpen: boolean) => void;
    "onUpdate:isOpen"?: (isOpen: boolean) => void;
    onClose?: () => void;
  }
  export interface Variant {
    size?: PopoverVariantProps["size"];
    color?: PopoverVariantProps["color"];
    radius?: PopoverVariantProps["radius"];
    shadow?: PopoverVariantProps["shadow"];
    triggerScaleOnOpen?: boolean;
    disableAnimation?: boolean;
  }
}

namespace Return {
  export interface Option {
    as: NonNullable<HeroUIVueBaseProps["as"]>;
    content: string | undefined;
    isOpen: boolean;
    isMounted: boolean;
    placement: TooltipPlacement;
    portalContainer: Element | string;
    disableAnimation: boolean;
    motionProps: TransitionProps;
    slots: ReturnType<typeof popover>;
  }
  export interface Slot {
    triggerProps: HTMLAttributes;
    tooltipProps: HTMLAttributes & Record<`data-${string}`, string | boolean | undefined>;
    tooltipContentProps: HTMLAttributes & Record<`data-${string}`, string | boolean | undefined>;
    positionStyle: CSSProperties;
  }
}

export type UseTooltipProps = Props.Option & Props.Variant;
export type TooltipProps = UseTooltipProps;
export type UseTooltipReturn = Return.Option &
  Return.Slot & {
    triggerRef: Ref<HTMLElement | null>;
    overlayRef: Ref<HTMLElement | null>;
    open: (immediate?: boolean) => void;
    close: (immediate?: boolean) => void;
    updatePosition: () => void;
  };
export type UseTooltipSlot = "default" | "content";
export type { TooltipPlacement } from "./position";

export function useTooltip(
  originalProps: MaybeRef<UseTooltipProps> = {},
): ToComputedRefs<
  UseTooltipReturn,
  "triggerRef" | "overlayRef" | "open" | "close" | "updatePosition"
> {
  const props = computed(() => toValue(originalProps));
  const id = useId();
  const triggerRef = ref<HTMLElement | null>(null);
  const overlayRef = ref<HTMLElement | null>(null);
  const isMounted = ref(false);
  const internalOpen = ref(!!props.value.defaultOpen);
  const isOpen = computed(
    () => !props.value.isDisabled && (props.value.isOpen ?? internalOpen.value),
  );
  const placement = ref<TooltipPlacement>(props.value.placement ?? "top");
  const arrowPlacement = ref<TooltipPlacement>(placement.value);
  const positionStyle = ref<CSSProperties>({
    position: "fixed",
    left: "0px",
    top: "0px",
    visibility: "hidden",
    zIndex: 100000,
  });
  let openTimer: ReturnType<typeof setTimeout> | undefined;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  let focused = false;
  let dismissed = false;
  let stopPositioning = () => {};

  function clearTimers() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    openTimer = closeTimer = undefined;
  }

  function group() {
    const doc = triggerRef.value?.ownerDocument;
    if (!doc) return;
    let state = groups.get(doc);
    if (!state) {
      state = { warmUntil: 0 };
      groups.set(doc, state);
    }
    return state;
  }

  function setOpen(value: boolean) {
    if (value && props.value.isDisabled) return;
    if (value === isOpen.value) return;
    if (props.value.isOpen === undefined) internalOpen.value = value;
    props.value["onUpdate:isOpen"]?.(value);
    props.value.onOpenChange?.(value);
    if (!value) props.value.onClose?.();
  }

  function open(immediate = false) {
    clearTimers();
    if (props.value.isDisabled || dismissed) return;
    const state = group();
    const delay =
      immediate || isOpen.value || (state && state.warmUntil > Date.now())
        ? 0
        : Math.max(0, props.value.delay ?? 0);
    if (!delay) setOpen(true);
    else
      openTimer = setTimeout(() => {
        openTimer = undefined;
        setOpen(true);
      }, delay);
  }

  function close(immediate = false) {
    clearTimers();
    const delay = immediate ? 0 : Math.max(0, props.value.closeDelay ?? 500);
    if (!delay) setOpen(false);
    else
      closeTimer = setTimeout(() => {
        closeTimer = undefined;
        setOpen(false);
      }, delay);
  }

  function dismiss() {
    dismissed = true;
    close(true);
  }

  function updatePosition() {
    const target = triggerRef.value;
    const overlay = overlayRef.value;
    if (!isOpen.value || !target || !overlay || !target.ownerDocument.defaultView) return;
    const padding = Math.max(0, props.value.containerPadding ?? 12);
    const win = target.ownerDocument.defaultView;
    // Constrain before measuring so text wraps inside the available viewport.
    const maxWidth = Math.max(0, (win.visualViewport?.width ?? win.innerWidth) - padding * 2);
    overlay.style.maxWidth = `${maxWidth}px`;
    const result = getTooltipPosition(target, overlay, {
      placement: props.value.placement ?? "top",
      offset: (props.value.offset ?? 7) + (props.value.showArrow ? 3 : 0),
      crossOffset: props.value.crossOffset ?? 0,
      containerPadding: padding,
      shouldFlip: props.value.shouldFlip ?? true,
    });
    placement.value = result.placement;
    arrowPlacement.value = result.arrowPlacement;
    positionStyle.value = {
      position: "fixed",
      left: `${result.x}px`,
      top: `${result.y}px`,
      visibility: "visible",
      zIndex: 100000,
      maxWidth: `${maxWidth}px`,
    };
  }

  function isInside(node: EventTarget | null) {
    if (!node || !(node as Node).nodeType) return false;
    return !!(triggerRef.value?.contains(node as Node) || overlayRef.value?.contains(node as Node));
  }

  const forceClose = () => close(true);
  watch(
    [isMounted, isOpen, triggerRef, overlayRef],
    ([mounted, opened, trigger, overlay]) => {
      stopPositioning();
      stopPositioning = () => {};
      if (!mounted || !opened || !trigger || !overlay) return;
      const doc = trigger.ownerDocument;
      const win = doc.defaultView;
      if (!win) return;
      const state = group();
      if (state?.close && state.close !== forceClose) state.close();
      if (state) {
        state.close = forceClose;
        state.warmUntil = Infinity;
      }
      updatePosition();
      const onKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && !props.value.isKeyboardDismissDisabled) {
          event.stopPropagation();
          dismiss();
        }
      };
      const onOutside = (event: PointerEvent) => {
        if (!props.value.isDismissable || isInside(event.target)) return;
        const element = event.target as HTMLElement;
        if (props.value.shouldCloseOnInteractOutside?.(element) !== false) dismiss();
      };
      const onFocusOutside = (event: FocusEvent) => {
        if (props.value.shouldCloseOnBlur !== false && !isInside(event.target)) {
          focused = false;
          close(true);
        }
      };
      doc.addEventListener("keydown", onKeydown, true);
      doc.addEventListener("pointerdown", onOutside, true);
      doc.addEventListener("focusin", onFocusOutside, true);
      doc.addEventListener("scroll", updatePosition, true);
      win.addEventListener("resize", updatePosition);
      win.visualViewport?.addEventListener("resize", updatePosition);
      win.visualViewport?.addEventListener("scroll", updatePosition);
      const observer =
        typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(updatePosition);
      observer?.observe(trigger);
      observer?.observe(overlay);
      stopPositioning = () => {
        observer?.disconnect();
        doc.removeEventListener("keydown", onKeydown, true);
        doc.removeEventListener("pointerdown", onOutside, true);
        doc.removeEventListener("focusin", onFocusOutside, true);
        doc.removeEventListener("scroll", updatePosition, true);
        win.removeEventListener("resize", updatePosition);
        win.visualViewport?.removeEventListener("resize", updatePosition);
        win.visualViewport?.removeEventListener("scroll", updatePosition);
        if (state?.close === forceClose) {
          state.close = undefined;
          state.warmUntil = Date.now() + 800;
        }
      };
    },
    { flush: "post" },
  );

  watch(
    () => [
      props.value.placement,
      props.value.offset,
      props.value.crossOffset,
      props.value.containerPadding,
      props.value.shouldFlip,
      props.value.showArrow,
      props.value.updatePositionDeps,
      props.value.content,
    ],
    updatePosition,
    { deep: true, flush: "post" },
  );
  watch(
    () => props.value.isDisabled,
    (disabled) => {
      if (!disabled) return;
      clearTimers();
      focused = false;
      if (props.value.isOpen === undefined && internalOpen.value) {
        internalOpen.value = false;
        props.value["onUpdate:isOpen"]?.(false);
        props.value.onOpenChange?.(false);
        props.value.onClose?.();
      }
    },
  );

  if (getCurrentInstance()) {
    onMounted(() => {
      isMounted.value = true;
    });
    onScopeDispose(() => {
      clearTimers();
      stopPositioning();
    });
  }

  const slots = computed(() =>
    popover({
      size: props.value.size ?? "md",
      color: props.value.color,
      radius: props.value.radius ?? "md",
      shadow: props.value.shadow ?? "sm",
      triggerScaleOnOpen: props.value.triggerScaleOnOpen,
      disableAnimation: props.value.disableAnimation ?? false,
    }),
  );
  const dataProps = computed(() => ({
    "data-open": isOpen.value || undefined,
    "data-arrow": props.value.showArrow || undefined,
    "data-disabled": props.value.isDisabled || undefined,
    "data-placement": arrowPlacement.value,
  }));

  return {
    as: computed(() => props.value.as ?? "div"),
    content: computed(() => props.value.content),
    isOpen,
    isMounted: computed(() => isMounted.value),
    placement: computed(() => placement.value),
    portalContainer: computed(() => props.value.portalContainer ?? "body"),
    disableAnimation: computed(() => !!props.value.disableAnimation),
    motionProps: computed(() => ({
      enterActiveClass: "transition-opacity duration-150 ease-out",
      enterFromClass: "opacity-0",
      enterToClass: "opacity-100",
      leaveActiveClass: "transition-opacity duration-100 ease-in",
      leaveFromClass: "opacity-100",
      leaveToClass: "opacity-0",
      ...props.value.motionProps,
    })),
    slots,
    triggerRef,
    overlayRef,
    open,
    close,
    updatePosition,
    positionStyle: computed(() => positionStyle.value),
    triggerProps: computed(() => ({
      "aria-describedby": isOpen.value ? id : undefined,
      onPointerenter: (event: PointerEvent) => {
        if (event.pointerType === "touch" || props.value.trigger === "focus") return;
        open();
      },
      onPointerleave: () => {
        dismissed = false;
        if (!focused) close();
      },
      onFocus: (event: FocusEvent) => {
        if (!(event.target as HTMLElement).matches(":focus-visible")) return;
        focused = true;
        dismissed = false;
        open(true);
      },
      onBlur: (event: FocusEvent) => {
        focused = false;
        dismissed = false;
        if (props.value.shouldCloseOnBlur !== false && !isInside(event.relatedTarget)) close(true);
      },
      onPointerdown: dismiss,
      onKeydown: (event: KeyboardEvent) => {
        if (event.key === "Escape" && !props.value.isKeyboardDismissDisabled) dismiss();
        else if (event.key === "Enter" || event.key === " ") dismiss();
      },
    })),
    tooltipProps: computed(() => ({
      ...dataProps.value,
      id,
      role: "tooltip",
      "data-slot": "base",
      class: slots.value.base({ class: props.value.classNames?.base }),
      onPointerenter: (event: PointerEvent) => {
        if (event.pointerType !== "touch") clearTimeout(closeTimer);
      },
      onPointerleave: () => {
        if (!focused) close();
      },
    })),
    tooltipContentProps: computed(() => ({
      ...dataProps.value,
      "data-slot": "content",
      class: slots.value.content({ class: [props.value.classNames?.content, props.value.class] }),
    })),
  };
}
