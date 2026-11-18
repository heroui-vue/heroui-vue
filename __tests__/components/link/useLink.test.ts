import { afterEach, describe, expect, test, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { createApp, defineComponent, h, nextTick, reactive, ref, type VNodeChild } from "vue";
import { renderToString } from "vue/server-renderer";
import { link } from "@heroui/theme";
import { Link, useLink, type LinkPressEvent, type UseLinkProps } from "@heroui-vue/link";

const cleanups: (() => void)[] = [];

afterEach(() => {
  cleanups.splice(0).forEach((cleanup) => cleanup());
});

function mountLink(
  props: UseLinkProps = {},
  slots: Record<string, () => VNodeChild> = { default: () => "Link" },
) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const state = reactive(props);
  const app = createApp(() => h(Link, state, slots));
  app.mount(container);
  cleanups.push(() => {
    app.unmount();
    container.remove();
  });
  return { element: container.firstElementChild as HTMLElement, state, container };
}

function dispatchPointer(element: HTMLElement, type: string, options: PointerEventInit = {}) {
  const rect = element.getBoundingClientRect();
  element.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      pointerId: 1,
      isPrimary: true,
      pointerType: "touch",
      button: 0,
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
      ...options,
    }),
  );
}

describe("Link", () => {
  test("renders on the server with native link attributes and HeroUI styles", async () => {
    const html = await renderToString(
      h(
        Link,
        { href: "/guide", color: "secondary", size: "lg", underline: "hover", class: "custom" },
        () => "Guide",
      ),
    );
    const element = new DOMParser().parseFromString(html, "text/html").querySelector("a")!;
    expect(element.getAttribute("href")).toBe("/guide");
    expect(element.textContent).toBe("Guide");
    expect(element.className).toBe(
      link({ color: "secondary", size: "lg", underline: "hover", class: "custom" }),
    );
    expect(element.hasAttribute("data-disabled")).toBe(false);
  });

  test("defaults external attributes and preserves explicit overrides reactively", async () => {
    const { element, state } = mountLink({ isExternal: true });
    expect(element.getAttribute("target")).toBe("_blank");
    expect(element.getAttribute("rel")).toBe("noopener noreferrer");
    state.target = "_self";
    state.rel = "nofollow";
    await nextTick();
    expect(element.getAttribute("target")).toBe("_self");
    expect(element.getAttribute("rel")).toBe("nofollow");
    state.isExternal = false;
    state.target = undefined;
    state.rel = undefined;
    await nextTick();
    expect(element.hasAttribute("target")).toBe(false);
    expect(element.hasAttribute("rel")).toBe(false);
  });

  test("forwards native attributes and shows the default or custom anchor icon", () => {
    const { element } = mountLink({
      showAnchorIcon: true,
      href: "#",
      download: "file.txt",
      referrerPolicy: "no-referrer",
      "aria-label": "Download",
    } as UseLinkProps);
    expect(element.getAttribute("download")).toBe("file.txt");
    expect(element.getAttribute("referrerpolicy")).toBe("no-referrer");
    expect(element.getAttribute("aria-label")).toBe("Download");
    expect(element.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    const custom = mountLink(
      { showAnchorIcon: true },
      {
        default: () => "Custom",
        anchorIcon: () => h("span", { "data-custom-icon": "" }, "→"),
      },
    );
    expect(custom.element.querySelector("[data-custom-icon]")).not.toBeNull();
    expect(custom.element.querySelector("svg")).toBeNull();
    expect(mountLink().element.querySelector("svg")).toBeNull();
  });

  test("updates variants, classes, href, and disabled state", async () => {
    const { element, state } = mountLink({ href: "#enabled" });
    state.color = "danger";
    state.isBlock = true;
    state.disableAnimation = true;
    state.class = "updated";
    state.isDisabled = true;
    await nextTick();
    expect(element.className).toBe(
      link({
        color: "danger",
        isBlock: true,
        disableAnimation: true,
        class: "updated",
        isDisabled: true,
      }),
    );
    expect(element.hasAttribute("href")).toBe(false);
    expect(element.getAttribute("aria-disabled")).toBe("true");
    expect(element.getAttribute("role")).toBe("link");
    expect(element.getAttribute("tabindex")).toBe("-1");
    state.isDisabled = false;
    await nextTick();
    expect(element.getAttribute("href")).toBe("#enabled");
    expect(element.hasAttribute("data-disabled")).toBe(false);
    expect(element.hasAttribute("aria-disabled")).toBe(false);
  });

  test("emits one mouse press lifecycle followed by click", async () => {
    const events: string[] = [];
    const onPress = vi.fn((_event: LinkPressEvent) => events.push("press"));
    const { element } = mountLink({
      onPressStart: () => events.push("start"),
      onPressChange: (pressed) => events.push(String(pressed)),
      onPressUp: () => events.push("up"),
      onPressEnd: () => events.push("end"),
      onPress,
      onClick: () => events.push("click"),
    });
    await userEvent.click(element);
    expect(events).toEqual(["start", "true", "up", "end", "false", "press", "click"]);
    expect(onPress).toHaveBeenCalledOnce();
    expect(onPress.mock.calls[0][0]).toMatchObject({
      type: "press",
      pointerType: "mouse",
      target: element,
    });
  });

  test.each(["a", "span", "button"] as const)(
    "activates %s once with Enter and ignores Space",
    async (as) => {
      const onPress = vi.fn();
      const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
      const { element } = mountLink({ as, href: "#keyboard", onPress, onClick });
      element.focus();
      await userEvent.keyboard("{Enter}");
      expect(onPress).toHaveBeenCalledOnce();
      expect(onClick).toHaveBeenCalledOnce();
      expect(onPress.mock.calls[0][0].pointerType).toBe("keyboard");
      await userEvent.keyboard(" ");
      expect(onPress).toHaveBeenCalledOnce();
      expect(onClick).toHaveBeenCalledOnce();
    },
  );

  test.each(["touch", "pen"])(
    "preserves the %s pointer type through activation",
    async (pointerType) => {
      const onPress = vi.fn();
      const onPressUp = vi.fn();
      const { element } = mountLink({ onPress, onPressUp });
      await userEvent.hover(element);
      dispatchPointer(element, "pointerdown", { pointerType });
      dispatchPointer(element, "pointerup", { pointerType });
      element.dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1 }));
      expect(onPress).toHaveBeenCalledOnce();
      expect(onPressUp).toHaveBeenCalledOnce();
      expect(onPress.mock.calls[0][0].pointerType).toBe(pointerType);
    },
  );

  test.each(["pointercancel", "scroll"])("cancels a touch press on %s", async (type) => {
    const onPress = vi.fn();
    const onPressEnd = vi.fn();
    const onPressUp = vi.fn();
    const { element } = mountLink({ onPress, onPressEnd, onPressUp });
    await userEvent.hover(element);
    dispatchPointer(element, "pointerdown");
    if (type === "scroll") document.dispatchEvent(new Event("scroll"));
    else dispatchPointer(element, "pointercancel");
    dispatchPointer(element, "pointerup");
    const click = new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1 });
    expect(element.dispatchEvent(click)).toBe(false);
    expect(onPress).not.toHaveBeenCalled();
    expect(onPressUp).not.toHaveBeenCalled();
    expect(onPressEnd).toHaveBeenCalledOnce();
  });

  test("ends a press when leaving and restarts it when reentering", async () => {
    const onPressStart = vi.fn();
    const onPressEnd = vi.fn();
    const { element } = mountLink({ onPressStart, onPressEnd });
    await userEvent.hover(element);
    dispatchPointer(element, "pointerdown");
    dispatchPointer(element, "pointerleave");
    expect(onPressEnd).toHaveBeenCalledOnce();
    dispatchPointer(element, "pointerenter");
    expect(onPressStart).toHaveBeenCalledTimes(2);
    dispatchPointer(element, "pointerup");
    expect(onPressEnd).toHaveBeenCalledTimes(2);
  });

  test("pressUp fires even when the press started outside the link", async () => {
    const onPressUp = vi.fn();
    const onPress = vi.fn();
    const { element } = mountLink({ onPressUp, onPress });
    await userEvent.hover(element);
    dispatchPointer(element, "pointerup");
    expect(onPressUp).toHaveBeenCalledOnce();
    expect(onPress).not.toHaveBeenCalled();
  });

  test("prevents repeated Enter key activations", () => {
    const { element } = mountLink({ href: "#repeat" });
    const repeat = new KeyboardEvent("keydown", { key: "Enter", repeat: true, cancelable: true });
    expect(element.dispatchEvent(repeat)).toBe(false);
  });

  test("disabled links block navigation and callbacks even for programmatic clicks", () => {
    const onPress = vi.fn();
    const onClick = vi.fn();
    const { element } = mountLink({ href: "#disabled", isDisabled: true, onPress, onClick });
    const click = new MouseEvent("click", { bubbles: true, cancelable: true });
    expect(element.dispatchEvent(click)).toBe(false);
    element.click();
    expect(onPress).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test("custom components retain attrs, classes, and handlers; disabled links suppress router clicks", async () => {
    const navigate = vi.fn((event: MouseEvent) => event.preventDefault());
    const RouterLink = defineComponent(
      (_, { attrs, slots }) =>
        () =>
          h("a", { ...attrs, href: "/route", onClick: navigate }, slots.default?.()),
    );
    const { element, state } = mountLink({ as: RouterLink, isDisabled: true });
    element.click();
    expect(navigate).not.toHaveBeenCalled();
    state.isDisabled = false;
    await nextTick();
    element.click();
    expect(navigate).toHaveBeenCalledOnce();
    expect(element.getAttribute("role")).toBe("link");
  });

  test("keyboard focus sets the focus-visible attribute and blur clears it", async () => {
    const { element } = mountLink();
    await userEvent.keyboard("{Tab}");
    expect(document.activeElement).toBe(element);
    expect(element.hasAttribute("data-focus")).toBe(true);
    expect(element.hasAttribute("data-focus-visible")).toBe(true);
    element.blur();
    await nextTick();
    expect(element.hasAttribute("data-focus")).toBe(false);
    expect(element.hasAttribute("data-focus-visible")).toBe(false);
  });

  test("autoFocus focuses enabled links and leaves disabled links unfocused", () => {
    const { element } = mountLink({ autoFocus: true });
    expect(document.activeElement).toBe(element);
    const disabled = mountLink({ autoFocus: true, isDisabled: true });
    expect(document.activeElement).not.toBe(disabled.element);
  });

  test("useLink accepts reactive refs for custom implementations", () => {
    const props = ref<UseLinkProps>({ href: "/before" });
    const result = useLink(props);
    expect(result.linkProps.value.href).toBe("/before");
    props.value = { href: "/after", showAnchorIcon: true };
    expect(result.linkProps.value.href).toBe("/after");
    expect(result.showAnchorIcon.value).toBe(true);
  });
});
