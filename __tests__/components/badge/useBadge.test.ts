import { describe, expect, test } from "vitest";
import { defineComponent, h, type PropType } from "vue";
import { renderToString } from "vue/server-renderer";
import { Badge, useBadge, type UseBadgeProps } from "@heroui-vue/badge";
import { useBadge as useBadgeReact } from "@heroui/react";
import { renderHook } from "vitest-browser-react";

describe("props", () => {
  test("badgeProps", async () => {
    // const Badge = defineComponent<UseBadgeProps>(
    //   (props) => {
    //     const { badgeProps } = useBadge(props);
    //     return () => h("span", badgeProps.value);
    //   },
    //   {
    //     props: {
    //       content: {
    //         type: String as any as PropType<UseBadgeProps["content"]>,
    //       },
    //     },
    //   },
    // );
    const str = await renderToString(h(Badge, { content: "10" }));

    const props = { content: "10" };
    const react = await renderHook(() => useBadgeReact({ ...props, children: "" }));
    const { getBadgeProps } = react.result.current;
    const { badgeProps } = useBadge(props);
    expect(badgeProps.value.class).toBe(getBadgeProps().className);
    const c = new DOMParser()
      .parseFromString(str, "text/html")
      .querySelector("span")
      ?.getAttribute("class");
    expect(c).toBe(getBadgeProps().className);
  });
});
