import { onMounted, ref, isRef, watch, type MaybeRef } from "vue";
import {
  type MaybeRefOrGetter,
  useEventListener,
  useMounted,
} from "@vueuse/core";

const rippleElement = ref();

function setCSSStyle(el: HTMLElement, style: CSSStyleDeclaration) {
  for (const [key, value] of Object.entries(style)) {
    el.style[key as any] = value;
  }
}

function ripple(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const { x, y, width, height } = target.getBoundingClientRect();
  const { clientX, clientY } = event;

  const newElement = rippleElement.value?.cloneNode() as HTMLSpanElement;
  const style = {
    position: "absolute",
    left: `${clientX - x}px`,
    top: `${clientY - y}px`,
    borderRadius: "50%",
    backgroundColor: "currentColor",
    transform: `translate(-50%, -50%)`,
    pointerEvents: "none",
  } as CSSStyleDeclaration;

  setCSSStyle(newElement, style);

  const radius = Math.round(Math.hypot(width, height)) * 2;
  const animate = newElement.animate(
    {
      opacity: [0.35, 0],
      width: ["0", `${radius}px`],
      height: ["0", `${radius}px`],
    },
    {
      duration: 450,
      easing: "ease-in",
      fill: "forwards",
    },
  );
  animate.addEventListener("finish", () => {
    target.removeChild(newElement);
  });
  target.appendChild(newElement);
}

export function useRipple(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
  options?: { disabled?: MaybeRef<boolean> },
) {
  const isMounted = useMounted();
  if (isMounted) {
    rippleElement.value = document.createElement("span");
  }

  const { disabled = false } = options || {};
  const cleanup = ref<ReturnType<typeof useEventListener>>();

  const disabledSource = isRef(disabled) ? disabled : ref(disabled);
  watch(
    disabledSource,
    (value) => {
      if (value) {
        cleanup.value?.();
      } else {
        cleanup.value = useEventListener(target, "click", ripple);
      }
    },
    { immediate: true },
  );
}

export default useRipple;
