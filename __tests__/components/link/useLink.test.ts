import { describe, expect, test } from "vitest";
import { defineComponent, h, useAttrs, mergeProps, type PropType } from "vue";
import {
  Link as LinkReact,
  useLink as useLinkReact,
  useButton as useButtonReact,
} from "@heroui/react";
import { renderToString } from "vue/server-renderer";
import { renderHook } from "vitest-browser-react";
import {} from "@heroui-vue/shared";
import { cn } from "@heroui/theme";
import { Link, useLink, type UseLinkProps } from "@heroui-vue/link";
import { useButton, type UseButtonProps } from "@heroui-vue/button";

describe("useLink props", () => {
  test("class", async () => {
    const { linkProps } = useLink({});
    const react = await renderHook(() => useLinkReact({}));
    expect(linkProps.value.class).toBe(react.result.current.getLinkProps().className);
  });

  test.only("attrs inherit", async () => {
    const MiniLink = defineComponent<UseLinkProps>(
      (props) => {
        const { linkProps } = useLink(props);
        // return () => Array.from(new Set((linkProps.value.class as string).split(" "))).join(" ");
        return () => h("a", linkProps.value);
      },
      {
        props: {
          color: String as PropType<UseLinkProps["color"]>,
        },
        inheritAttrs: false,
      },
    );

    const Button = defineComponent<UseButtonProps>(
      (props) => {
        const { as, buttonProps } = useButton(props);
        return () => h(as.value as string, buttonProps.value);
      },
      {
        props: {
          as: Object as PropType<UseButtonProps["as"]>,
          variant: String as PropType<UseButtonProps["variant"]>,
          color: String as PropType<UseButtonProps["color"]>,
        },
      },
    );

    const str = await renderToString(h(Button, { as: Link, variant: "solid", color: "primary" }));
    const btn = await renderHook(() => {
      return useButtonReact({ as: LinkReact, variant: "solid", color: "primary" });
    });
    const compose = await renderHook(() => {
      const { getLinkProps } = useLinkReact({ color: "primary" });
      const { getButtonProps } = useButtonReact({ variant: "solid", color: "primary" });
      return cn(getLinkProps().className, getButtonProps().className);
    });

    const cls = new DOMParser()
      .parseFromString(str, "text/html")
      .querySelector("a")
      ?.getAttribute("class");
    expect(compose.result.current!.split(" ").sort().join(" ")).toBe(
      cls!.split(" ").sort().join(" "),
    );
    // expect(btn.result.current.getButtonProps().className.split(" ").sort().join(" ")).toBe(
    //   str.split(" ").sort().join(" "),
    // );
  });
});
