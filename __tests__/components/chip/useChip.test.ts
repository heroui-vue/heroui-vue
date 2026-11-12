import { describe, test, expect } from "vitest";
import { h, defineComponent } from "vue";
import { renderToString } from "vue/server-renderer";
import { renderToString as renderReactNodeToString } from "react-dom/server";
import { useChip } from "@heroui-vue/chip";
import { useAvatar, Avatar, type UseAvatarProps } from "@heroui-vue/avatar";
import { cn } from "@heroui/theme";
import { useChip as useChipReact } from "@heroui/react";
import { renderHook } from "vitest-browser-react";
import React from "react";
import type { PropType } from "vue";
import type { UseChipProps } from "@heroui-vue/chip";
import type { ChipProps } from "@heroui/react";

type Props = UseChipProps & ChipProps;

describe("useChip", () => {
  describe("option", async () => {
    const chip = useChip({});
    const reactChip = (await renderHook(() => useChipReact({}))).result.current;
    test("as", () => {
      expect(chip.as.value).toBe(reactChip.Component.toString());
    });
    test("isDot", () => {
      expect(chip.isDot.value).toBe(reactChip.isDot);
    });
    test("isCloseable", () => {
      expect(chip.isCloseable).toBe(reactChip.isCloseable);
    });
  });

  describe("slot props", () => {
    test("avatar", async () => {
      const AvatartChip = defineComponent<UseChipProps>((props) => {
        const { avatarProps } = useChip(props);
        return () => h("span", avatarProps.value, h("span"));
      });
      const react = await renderHook(() =>
        useChipReact({
          avatar: React.createElement("span", null, React.createElement("span")),
        }),
      );
      expect(await renderToString(h(AvatartChip))).toBe(
        renderReactNodeToString(react.result.current.startContent),
      );
    });
  });

  describe("slot vnode", () => {
    test("startContent", async () => {
      const START_CONTENT = "This start content";
      const chip = defineComponent(
        (props: Props) => {
          const { startContent } = useChip(props as Props);
          return startContent.value;
        },
        {
          props: {
            variant: {
              type: String as PropType<Props["variant"]>,
            },
          },
        },
      );
      expect(
        await renderToString(h(chip, { variant: "dot" }, { startContent: () => START_CONTENT })),
      ).toContain(START_CONTENT);
      expect(await renderToString(h(chip, null, { startContent: () => START_CONTENT }))).toContain(
        START_CONTENT,
      );
      expect(await renderToString(h(chip, { variant: "dot" }))).toMatch(/^<span/);
      expect(h(chip).children).toBeNull();
    });
    test("startContent with avatar", async () => {
      const ChipWithAvatar = defineComponent<UseChipProps>({
        setup(props) {
          const { startContent } = useChip(props);
          return () => {
            const v = startContent.value();
            return h("div", null, v!);
          };
        },
      });
      const inputedAvatarProps: UseAvatarProps = {
        size: "sm",
        src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      };
      const { avatarProps } = useAvatar(inputedAvatarProps, null);
      const { avatarProps: chipAvatarProps } = useChip({});
      const str = await renderToString(
        h(ChipWithAvatar, null, {
          avatar: () => h(Avatar, inputedAvatarProps),
        }),
      );
      // classes should merged
      expect(str).toContain(cn(avatarProps.value.class, chipAvatarProps.value.class));
    });
  });
});
