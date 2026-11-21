import { ref, watchEffect } from "vue";
import { link } from "@heroui/theme";
import { toReactive, useFocus } from "@vueuse/core";
import {
  toRefsWithDefault,
  mapPropsVariants,
  tryUseAttrs,
  mergeClassProps,
} from "@heroui-vue/shared";
import type { AnchorHTMLAttributes, MaybeRef, Ref, ToRefs } from "vue";
import type { MaybeElement } from "@vueuse/core";
import type { LinkVariantProps } from "@heroui/theme";
import type { HeroUIVueBaseProps, BaseProps } from "@heroui-vue/shared";

/** The input and modifiers for a link press, independent of the input device. */
export interface LinkPressEvent {
  type: "press" | "pressstart" | "pressend" | "pressup";
  pointerType: "mouse" | "pen" | "touch" | "keyboard" | "virtual";
  target: HTMLElement;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  x: number;
  y: number;
}

namespace Props {
  export interface Option extends HeroUIVueBaseProps {
    autofocus?: boolean;
    isExternal?: boolean;
    showAnchorIcon?: boolean;
  }
  export interface Variant {
    size?: LinkVariantProps["size"];
    color?: LinkVariantProps["color"];
    underline?: LinkVariantProps["underline"];
    isBlock?: boolean;
    isDisabled?: boolean;
    disableAnimation?: boolean;
  }
  export interface Native {
    href?: AnchorHTMLAttributes["href"];
    rel?: AnchorHTMLAttributes["rel"];
    target?: AnchorHTMLAttributes["target"];
    role?: AnchorHTMLAttributes["role"];
    tabIndex?: AnchorHTMLAttributes["tabindex"];
  }
}

namespace Return {
  export interface Slot {
    linkProps: BaseProps &
      Props.Native & {
        "data-focus": boolean;
        "data-focus-visible": boolean;
        "data-disabled": boolean;
      };
  }
  export interface Option {
    as: HeroUIVueBaseProps["as"];
    showAnchorIcon: Props.Option["showAnchorIcon"];
  }
}

export type UseLinkProps = Props.Option & Props.Variant & Props.Native;
export type UseLinkReturn = Return.Option & Return.Slot;
export type UseLinkSlot = "default" | "anchorIcon";

export function useLink(
  originalProps: MaybeRef<UseLinkProps>,
  linkRef?: MaybeRef<MaybeElement>,
): ToRefs<UseLinkReturn> {
  const props = toRefsWithDefault(toReactive(originalProps) as any as UseLinkProps, {
    as: "a",
    isExternal: false,
    showAnchorIcon: false,
    autofocus: false,
  });
  const { focused: isFocused } = useFocus(linkRef);
  const attrs = tryUseAttrs();
  const { class: className } = attrs;

  const linkProps = ref() as Ref<Return.Slot["linkProps"]>;

  // linkProps
  watchEffect(() => {
    const { as, isDisabled, isExternal, disableAnimation, rel, target, href } = toReactive(props);
    const [, variantProps] = mapPropsVariants(toReactive(originalProps), link.variantKeys);
    const styles = link({
      ...variantProps,
      disableAnimation,
      className,
    });
    const nativeProps: Props.Native = {
      href,
      role: as !== "a" ? "link" : undefined,
      tabIndex: as !== "a" && !isDisabled ? 0 : undefined,
      rel: isExternal ? (rel ?? "noopener noreferrer") : undefined,
      target: isExternal ? (target ?? "_blank") : undefined,
    };
    const mergedProps: UseLinkReturn["linkProps"] = {
      ...nativeProps,
      class: styles,
      "data-focus": !!isFocused.value,
      "data-disabled": !!isDisabled,
      // TODO
      "data-focus-visible": false,
    };
    linkProps.value = mergeClassProps(mergedProps as any, attrs) as any;
  });

  return {
    ...props,
    linkProps,
  };
}
