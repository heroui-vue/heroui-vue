import type { Component, ComputedRef } from "vue";

import type { SlotsToClasses } from "@heroui/theme";

export type HTMLHeroVueUIProps<T extends keyof HTMLElementTagNameMap = "div"> = {
  as?: Component | T | (string & {});
  class?: string;
};

export type BaseProps = {
  class?: string;
};

/**
 * Flattens a complex intersection type into a single object type for better readability.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ClassNameValue = SlotsToClasses<string>[string];

export type ToComputedRefs<T = any, P extends keyof T = never> = {
  [K in keyof T]: K extends P ? T[K] : ComputedRef<T[K]>;
};
