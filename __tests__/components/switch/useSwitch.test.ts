import { describe, expect, test } from "vitest";
import { defineComponent } from "vue";
import { useSwitch, type UseSwitchProps } from "@heroui-vue/switch";
import { renderHook } from "vitest-browser-react";
import { useSwitch as useSwitchReact } from "@heroui/react";

describe("useSwitch", async () => {
  const { thumbProps, wrapperProps, baseProps } = useSwitch({ defaultSelected: true });
  const r = await renderHook(() => useSwitchReact({ defaultSelected: true }));
  const heroui = r.result.current;
  test("thumbProps className", () => {
    expect(thumbProps.value.class).toBe(heroui.getThumbProps().className);
  });
  test("wrapperProps className", () => {
    expect(wrapperProps.value.class).toBe(heroui.getWrapperProps().className);
  });
  test("baseProps className", () => {
    expect(baseProps.value.class).toBe(heroui.getBaseProps().className);
  });
});
