import { describe, test, expect } from "vitest";
import { h, defineComponent } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  Avatar,
  AvatarGroup,
  useAvatar,
  useAvatarGroup,
  type UseAvatarProps,
  type UseAvatarGroupProps,
} from "@heroui-vue/avatar";
// import { render } from "vitest-browser-vue";
import type { PropType } from "vue";

describe("fallback", () => {
  const avatar = defineComponent<Pick<UseAvatarProps, "showFallback" | "src" | "name" | "alt">>(
    (props) => {
      const { fallback } = useAvatar(props, null as any);
      return () => fallback.value();
    },
    {
      props: {
        showFallback: {
          type: Boolean as PropType<UseAvatarProps["showFallback"]>,
        },
        src: {
          type: String as PropType<UseAvatarProps["src"]>,
        },
        name: {
          type: String as PropType<UseAvatarProps["name"]>,
        },
        alt: {
          type: String as PropType<UseAvatarProps["alt"]>,
        },
      },
    },
  );
  test("show name", async () => {
    const alt = "show";
    expect(
      await renderToString(
        h(avatar, {
          src: "https://images.unsplash.com/broken",
          showFallback: true,
          name: alt,
          alt,
        }),
      ),
    ).toContain(`aria-label="${alt}"`);
  });
  test("show default avatar icon", async () => {
    const alt = "default avatar icon";
    expect(
      await renderToString(
        h(avatar, {
          src: "https://images.unsplash.com/broken",
          showFallback: true,
          alt,
        }),
      ),
    ).toContain(`aria-label="${alt}"`);
  });
});

describe.todo("slot props", () => {});

describe("avatarGroup", () => {
  const extractClass = (html: string) => {
    const document = new DOMParser().parseFromString(html, "text/html");
    return [...document.querySelectorAll("[class]")].map((el) => el.getAttribute("class"));
  };
  test.only("props", async () => {
    const AvatarChildren = () => {
      const src = "https://i.pravatar.cc/150?u=a042581f4e29026024d";
      return Array.from({ length: 6 }).map(() => h(Avatar, { src }));
    };

    const str = await renderToString(h(AvatarGroup, null, AvatarChildren));
    console.log(extractClass(str));
  });
});
