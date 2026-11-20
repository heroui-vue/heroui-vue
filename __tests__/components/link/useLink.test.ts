import { describe, expect, test } from "vitest";
import { defineComponent, h } from "vue";
import { useLink as useLinkReact } from "@heroui/react";
import { renderToString } from "vue/server-renderer";
import { renderHook } from "vitest-browser-react";
import { renderToString as renderReactNodeToString } from "react-dom/server";
import { clsx } from "@heroui-vue/shared";
import { useLink, type UseLinkProps } from "@heroui-vue/link";

describe("useLink props", () => {
  test("class", async () => {
    const { linkProps } = useLink({});
    const react = await renderHook(() => useLinkReact({}));
    expect(linkProps.value.class).toBe(react.result.current.getLinkProps().className);
  });
});
