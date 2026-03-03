import type { HTMLHeroVueUIProps } from "@heroui-vue/shared";
import type { ComputedRef, ImgHTMLAttributes } from "vue";

import { computed, mergeProps, ref, useAttrs, watch } from "vue";
import { useElementHover, useFocus } from "@vueuse/core";
import { dataAttr, mapPropsVariants } from "@heroui-vue/shared";
import { avatar } from "@heroui/theme";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type AvatarRadius = "none" | "sm" | "md" | "lg" | "full";
export type AvatarSlots = "base" | "img" | "fallback" | "name" | "icon";
export type AvatarClassNames = Partial<Record<AvatarSlots, string>>;

export interface AvatarDefineProps extends /* @vue-ignore */ HTMLHeroVueUIProps {
  src?: string;
  name?: string;
  icon?: any;
  fallback?: any;
  imgProps?: /* @vue-ignore */ ImgHTMLAttributes;
  showFallback?: boolean;
  isFocusable?: boolean;
  classNames?: AvatarClassNames;
}

export interface AvatarVariantProps {
  size?: AvatarSize;
  color?: AvatarColor;
  radius?: AvatarRadius;
  isBordered?: boolean;
  isDisabled?: boolean;
  disableAnimation?: boolean;
}

export type AvatarProps = AvatarDefineProps & AvatarVariantProps;

export type UseAvatar = {
  tag: ComputedRef<string | object>;
  baseProps: ComputedRef<Record<string, unknown>>;
  imgProps: ComputedRef<Record<string, unknown>>;
  fallbackProps: ComputedRef<Record<string, unknown>>;
  nameProps: ComputedRef<Record<string, unknown>>;
  iconProps: ComputedRef<Record<string, unknown>>;
  showImage: ComputedRef<boolean>;
  showFallbackContent: ComputedRef<boolean>;
  initials: ComputedRef<string>;
  handleLoad: () => void;
  handleError: () => void;
};

function getInitials(name?: string) {
  if (!name) {
    return "";
  }

  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function useAvatar(props: AvatarProps): UseAvatar {
  const attrs = useAttrs();
  const baseRef = ref<HTMLElement | null>(null);
  const hasError = ref(false);
  const isLoaded = ref(false);
  const { focused } = useFocus(baseRef, { initialValue: false });
  const isHovered = useElementHover(baseRef);

  watch(
    () => props.src,
    () => {
      hasError.value = false;
      isLoaded.value = false;
    },
  );

  const avatarState = computed(() => {
    const [avatarProps, variantProps] = mapPropsVariants(
      props,
      avatar.variantKeys as (keyof AvatarProps)[],
    );
    const {
      as,
      class: className,
      classNames,
      src,
      name,
      showFallback = false,
      imgProps,
      isFocusable = false,
      ...otherProps
    } = { ...avatarProps, ...attrs };

    const styles = avatar({
      ...variantProps,
      className,
    });
    const tag = as ?? (isFocusable ? "button" : "span");
    const initials = getInitials(name);
    const showFallbackContent = !!showFallback && (!src || hasError.value);
    const showImage = !!src && !hasError.value;
    const alt = imgProps?.alt ?? name ?? "avatar";

    const mergedImgProps = mergeProps(
      {
        src,
        alt,
      },
      imgProps ?? {},
    );

    return {
      tag,
      baseProps: {
        ...otherProps,
        ref: baseRef,
        "data-hover": dataAttr(!!isHovered.value),
        "data-focus": dataAttr(!!focused.value),
        "data-focus-visible": dataAttr(false),
        "data-disabled": dataAttr(!!props.isDisabled),
        class: styles.base({ class: classNames?.base }),
        "aria-disabled": dataAttr(!!props.isDisabled),
        disabled: tag === "button" ? !!props.isDisabled : undefined,
        tabindex: tag !== "button" && isFocusable ? 0 : undefined,
        type: tag === "button" ? "button" : undefined,
      },
      imgProps: {
        ...mergedImgProps,
        "data-loaded": dataAttr(isLoaded.value),
        class: styles.img({ class: classNames?.img }),
      },
      fallbackProps: {
        class: styles.fallback({ class: classNames?.fallback }),
      },
      nameProps: {
        class: styles.name({ class: classNames?.name }),
      },
      iconProps: {
        class: styles.icon({ class: classNames?.icon }),
      },
      showImage,
      showFallbackContent,
      initials,
    };
  });

  function handleLoad() {
    hasError.value = false;
    isLoaded.value = true;
  }

  function handleError() {
    hasError.value = true;
    isLoaded.value = false;
  }

  return {
    tag: computed(() => avatarState.value.tag),
    baseProps: computed(() => avatarState.value.baseProps),
    imgProps: computed(() => avatarState.value.imgProps),
    fallbackProps: computed(() => avatarState.value.fallbackProps),
    nameProps: computed(() => avatarState.value.nameProps),
    iconProps: computed(() => avatarState.value.iconProps),
    showImage: computed(() => avatarState.value.showImage),
    showFallbackContent: computed(() => avatarState.value.showFallbackContent),
    initials: computed(() => avatarState.value.initials),
    handleLoad,
    handleError,
  };
}
