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
  test.only("attrs inherit", async () => {
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
    const className = new DOMParser()
      .parseFromString(str, "text/html")
      .querySelector("a")
      ?.getAttribute("class");

    const compose = await renderHook(() => {
      const { getLinkProps } = useLinkReact({ color: "primary" });
      const { getButtonProps } = useButtonReact({ variant: "solid", color: "primary" });
      return cn(getLinkProps().className, getButtonProps().className);
    });
    const excepted_className = compose.result.current;

    const fmtClass = (cls?: string | null) =>
      Array.from(new Set(cls!.split(" ") ?? []))
        .sort()
        .join(" ");

    expect(fmtClass(excepted_className)).toBe(fmtClass(className));
  });
});
