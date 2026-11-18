export type TooltipPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

export interface TooltipPositionOptions {
  placement: TooltipPlacement;
  offset: number;
  crossOffset: number;
  containerPadding: number;
  shouldFlip: boolean;
}

/** Resolve logical alignment and viewport collisions without accessing the DOM during SSR. */
export function getTooltipPosition(
  trigger: HTMLElement,
  overlay: HTMLElement,
  options: TooltipPositionOptions,
): { x: number; y: number; placement: TooltipPlacement; arrowPlacement: TooltipPlacement } {
  const win = trigger.ownerDocument.defaultView!;
  const target = trigger.getBoundingClientRect();
  const floating = overlay.getBoundingClientRect();
  const viewport = win.visualViewport;
  const left = (viewport?.offsetLeft ?? 0) + options.containerPadding;
  const top = (viewport?.offsetTop ?? 0) + options.containerPadding;
  const right =
    (viewport?.offsetLeft ?? 0) + (viewport?.width ?? win.innerWidth) - options.containerPadding;
  const bottom =
    (viewport?.offsetTop ?? 0) + (viewport?.height ?? win.innerHeight) - options.containerPadding;
  let [side, alignment] = options.placement.split("-") as [
    "top" | "bottom" | "left" | "right",
    "start" | "end" | undefined,
  ];
  const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" } as const;
  const space = {
    top: target.top - top,
    bottom: bottom - target.bottom,
    left: target.left - left,
    right: right - target.right,
  };
  const vertical = side === "top" || side === "bottom";
  const needed = (vertical ? floating.height : floating.width) + options.offset;
  if (options.shouldFlip && space[side] < needed && space[opposite[side]] > space[side])
    side = opposite[side];

  const rtl = win.getComputedStyle(trigger).direction === "rtl";
  const physicalAlignment =
    vertical && rtl
      ? alignment === "start"
        ? "end"
        : alignment === "end"
          ? "start"
          : undefined
      : alignment;
  let x = target.left + (target.width - floating.width) / 2;
  let y = target.top + (target.height - floating.height) / 2;
  if (vertical) {
    if (physicalAlignment === "start") x = target.left;
    if (physicalAlignment === "end") x = target.right - floating.width;
    x += options.crossOffset;
    y =
      side === "top"
        ? target.top - floating.height - options.offset
        : target.bottom + options.offset;
  } else {
    if (alignment === "start") y = target.top;
    if (alignment === "end") y = target.bottom - floating.height;
    y += options.crossOffset;
    x =
      side === "left"
        ? target.left - floating.width - options.offset
        : target.right + options.offset;
  }
  x = Math.max(left, Math.min(x, right - floating.width));
  y = Math.max(top, Math.min(y, bottom - floating.height));

  // Fixed descendants of transformed portal containers use that container's coordinates.
  for (let parent = overlay.parentElement; parent; parent = parent.parentElement) {
    const style = win.getComputedStyle(parent);
    if (
      style.transform === "none" &&
      style.perspective === "none" &&
      style.filter === "none" &&
      !/(paint|layout|strict|content)/.test(style.contain)
    )
      continue;
    const rect = parent.getBoundingClientRect();
    const scaleX = parent.offsetWidth ? rect.width / parent.offsetWidth : 1;
    const scaleY = parent.offsetHeight ? rect.height / parent.offsetHeight : 1;
    x = (x - rect.left) / (scaleX || 1) - parent.clientLeft + parent.scrollLeft;
    y = (y - rect.top) / (scaleY || 1) - parent.clientTop + parent.scrollTop;
    break;
  }

  const placement = `${side}${alignment ? `-${alignment}` : ""}` as TooltipPlacement;
  const arrowPlacement =
    `${side}${physicalAlignment ? `-${physicalAlignment}` : ""}` as TooltipPlacement;
  return { x, y, placement, arrowPlacement };
}
