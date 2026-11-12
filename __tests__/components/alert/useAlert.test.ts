import { describe, test, expect } from "vitest";
import { reactive } from "vue";
import { useAlert, Alert } from "@heroui-vue/alert";
import { useAlert as useReactAlert } from "@heroui/alert";
import { renderHook } from "vitest-browser-react";
import { render } from "vitest-browser-vue";
import type { UseAlertProps } from "@heroui-vue/alert";
import type { AlertProps } from "@heroui/alert";

type Props = UseAlertProps & AlertProps;

async function createUserAlertReturn(props: Props) {
  const vueAlert = useAlert(reactive(props));
  const reactAlert = await renderHook(() => useReactAlert(props));
  return { vueAlert, reactAlert: reactAlert.result.current };
}

describe("no children", async () => {
  const input = {
    title: "alert title",
    description: "alert description",
    isDefaultVisible: true,
    // isVisible: false,
    // isClosable: false,
    // hideIcon: false,
    // hideIconWrapper: false,
  } satisfies Props;

  const variants: Array<Props["variant"]> = ["solid", "flat", "faded", "bordered", undefined];
  const colors: Array<Props["color"]> = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    undefined,
  ];
  const radiuses: Array<Props["radius"]> = ["sm", "md", "lg", "full", "none"];
  type CP = [Props["variant"], Props["color"], Props["radius"]];
  const cp: CP[] = variants.flatMap((variant) =>
    colors.flatMap((color) => radiuses.map((radius) => [variant, color, radius] satisfies CP)),
  );

  describe.shuffle("base and wrapper class name for the cp of variant, color, radius", () => {
    test.for(cp)("%s, %s, %s,", async ([variant, color, radius]) => {
      const props: Props = { ...input, variant, color, radius };
      const { vueAlert, reactAlert } = await createUserAlertReturn(props);
      const { baseProps, mainWrapperProps, iconWrapperProps } = vueAlert;
      const { getBaseProps, getMainWrapperProps, getIconWrapperProps } = reactAlert;
      expect(baseProps.value.class).toBe(getBaseProps().className);
      expect(mainWrapperProps.value.class).toBe(getMainWrapperProps().className);
      expect(iconWrapperProps.value.class).toBe(getIconWrapperProps().className);
    });
  });

  describe("visibility that the `isVisible` and `isDefaultVisible` all have been set", () => {
    type CP = Pick<Props, "isVisible" | "isDefaultVisible">;
    const cp: CP[] = [
      { isVisible: true, isDefaultVisible: true },
      { isVisible: true, isDefaultVisible: false },
      { isVisible: false, isDefaultVisible: false },
      { isVisible: false, isDefaultVisible: true },
    ];
    test.for(cp)(
      "isVisible: $isVisible, isDefaultVisible: $isDefaultVisible",
      async ({ isVisible, isDefaultVisible }) => {
        const { vueAlert, reactAlert } = await createUserAlertReturn({
          ...input,
          isVisible,
          isDefaultVisible,
        });
        expect(vueAlert.isVisible.value).toBe(reactAlert.isVisible);
      },
    );
  });
});
