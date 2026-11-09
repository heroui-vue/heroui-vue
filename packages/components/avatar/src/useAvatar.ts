import { ref, watchEffect, toValue, h } from "vue";
import { useElementHover, useFocus, useImage, toReactive } from "@vueuse/core";
import { safeText, clsx, tryUseSlots, cloneSlot, toRefsWithDefault } from "@heroui-vue/shared";
import { avatar } from "@heroui/theme";
import { AvatarIcon } from "@heroui-vue/icon";
import type { UseAsyncStateOptions, MaybeElementRef, MaybeElement } from "@vueuse/core";
import type { HTMLHeroVueUIProps, BaseProps } from "@heroui-vue/shared";
import type { AvatarSlots, AvatarVariantProps, SlotsToClasses } from "@heroui/theme";
import type {
  Ref,
  MaybeRef,
  MaybeRefOrGetter,
  Reactive,
  ToRefs,
  ImgHTMLAttributes,
  VNode,
} from "vue";

namespace Props {
  export interface Option extends HTMLHeroVueUIProps {
    name?: string;
    src?: string;
    alt?: string;
    isFocusable?: boolean;
    ignoreFallback?: boolean;
    showFallback?: boolean;
    getInitials?: (name: string) => string;
    onError?: UseAsyncStateOptions<false>["onError"];
    /**
     * same `ImgComponent`
     */
    imgAs?: HTMLHeroVueUIProps["as"];
    imgProps?: /* @vue-ignore */ ImgHTMLAttributes;
    classNames?: SlotsToClasses<AvatarSlots>;
  }
  export interface Variant {
    size?: AvatarVariantProps["size"];
    color?: AvatarVariantProps["color"];
    radius?: AvatarVariantProps["radius"];
    isBordered?: boolean;
    isDisabled?: boolean;
    isInGroup?: boolean;
    isInGridGroup?: boolean;
    disableAnimation?: boolean;
  }
}
namespace Return {
  export interface Slot {
    avatarProps: BaseProps & {
      tabIndex: 0 | -1;
      "data-hover": boolean;
      "data-focus": boolean;
      "data-focus-visible": boolean;
    };
    imageProps: BaseProps & {
      src: Props.Option["src"];
      "data-loaded": boolean;
    };
    // icon: () => VNode | VNode[] | null;
    fallback: () => VNode | VNode[] | null;
  }
  export interface Option extends Props.Option {
    slots: ReturnType<typeof avatar>;
    isImgLoaded: boolean;
  }
}

export type UseAvatarProps = Props.Option & Props.Variant;
export type UseAvatarReturn = Return.Option & Return.Slot;
export type UseAvatarEmit = "error";
export type UseAvatarSlot = "icon" | "fallback";

export function useAvatar(
  originalProps: MaybeRef<UseAvatarProps>,
  avatarRef: MaybeElementRef<MaybeElement> & MaybeRefOrGetter<EventTarget | null | undefined>,
): ToRefs<UseAvatarReturn> {
  const props = toRefsWithDefault(originalProps, {
    as: "span",
    imgAs: "img",
    alt: toValue(originalProps).name || "avatar",
    getInitials: safeText,
  });
  const { isReady } = useImage(toReactive(props) as Reactive<UseAvatarProps> as any, {
    throwError: false,
  });
  const { focused } = useFocus(avatarRef);
  const isHovered = useElementHover(avatarRef);
  const { fallback, icon } = tryUseSlots<UseAvatarSlot[]>("fallback", "icon");

  const isImgLoaded = ref() as Ref<Return.Option["isImgLoaded"]>;
  const showFallback = ref() as Ref<Return.Option["showFallback"]>;
  const slots = ref() as Ref<Return.Option["slots"]>;
  const avatarProps = ref() as Ref<Return.Slot["avatarProps"]>;
  const imageProps = ref() as Ref<Return.Slot["imageProps"]>;
  const fallbackContent = ref() as Ref<Return.Slot["fallback"]>;

  watchEffect(() => {
    const { ignoreFallback, as, imgAs } = toReactive(props);
    isImgLoaded.value = ignoreFallback || (as !== undefined && imgAs !== "img") || isReady.value;
  });
  watchEffect(() => {
    const { src, showFallback: showFallbackProp } = toReactive(props);
    showFallback.value = (!src || !isImgLoaded.value) && showFallbackProp;
  });
  watchEffect(() => {
    const {
      color,
      radius,
      size,
      isBordered,
      isDisabled,
      isInGroup,
      disableAnimation,
      isInGridGroup,
    } = toReactive(props);

    slots.value = avatar({
      color,
      radius,
      size,
      isBordered,
      isDisabled,
      isInGroup,
      disableAnimation,
      // groupContext?.isGrid ?? false
      isInGridGroup: isInGridGroup ?? false,
    });
  });
  watchEffect(() => {
    const { isFocusable, isDisabled, as, classNames } = toReactive(props);
    avatarProps.value = {
      tabIndex: isFocusable || as === "button" ? (0 as const) : (-1 as const),
      // TODO: need test
      "data-hover": isDisabled && isHovered.value,
      "data-focus": focused.value,
      // TODO: should exact value
      "data-focus-visible": false,
      class: slots.value?.base({
        class: clsx(classNames?.base),
      }),
    } as Return.Slot["avatarProps"];
  });
  watchEffect(() => {
    const { src, classNames } = toReactive(props);
    imageProps.value = {
      src,
      "data-loaded": !!isImgLoaded.value,
      class: slots.value?.img({ class: classNames?.img }),
    };
  });
  watchEffect(() => {
    const { src, alt, classNames, name, getInitials } = toReactive(props);
    const createImgWrapperVnodes = (
      wrapper: keyof HTMLElementTagNameMap,
      className: string | undefined,
      vnodes: VNode[] | VNode | string | undefined | null,
    ): VNode => {
      return h(
        wrapper,
        {
          "aria-label": alt,
          class: className,
          role: "img",
        },
        vnodes as any,
      );
    };
    fallbackContent.value = () => {
      const fallbackVnodes = cloneSlot(fallback)();
      const iconVnodes = cloneSlot(icon)();
      if (!showFallback.value && src) {
        return null;
      } else if (fallbackVnodes) {
        return createImgWrapperVnodes(
          "div",
          slots?.value?.fallback({ class: classNames?.fallback }),
          fallbackVnodes,
        );
      } else {
        if (name) {
          return createImgWrapperVnodes(
            "span",
            slots?.value?.name({ class: classNames?.name }),
            getInitials?.(name),
          );
        } else {
          return createImgWrapperVnodes(
            "span",
            slots?.value?.icon({ class: classNames?.icon }),
            iconVnodes || h(AvatarIcon),
          );
        }
      }
    };
  });

  return {
    ...props,
    isImgLoaded,
    showFallback,
    slots,
    avatarProps,
    imageProps,
    fallback: fallbackContent,
  };
}
