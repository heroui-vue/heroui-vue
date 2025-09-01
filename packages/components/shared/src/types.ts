import type { Component, HTMLAttributes } from "vue";

// export type HTMLHeroVueUIProps<T extends keyof HTMLElementTagNameMap = "div"> =
//   {
//     as?: Component | T | (string & {});
//   } & /* @vue-ignore */ HTMLAttributes;

export type HTMLHeroVueUIProps<T extends keyof HTMLElementTagNameMap = "div"> =
  {
    as?: Component | T | (string & {});
  };

/**
 * Flattens a complex intersection type into a single object type for better readability.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
