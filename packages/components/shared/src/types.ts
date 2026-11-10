import type { Component, ComputedRef } from "vue";

import type { SlotsToClasses } from "@heroui/theme";

/**
 * @deprecated use `HeroUIVueBaseProps`
 */
export type HTMLHeroVueUIProps = HeroUIVueBaseProps;

export type HeroUIVueBaseProps = {
  as?: Component | keyof HTMLElementTagNameMap | (string & {});
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

export type PickRequired<T, K extends keyof T> = Required<{ [P in K]: T[P] }> & Omit<T, K>;
