import type { Component, ComputedRef, ToRef, EmitsToProps } from "vue";
import type { SlotsToClasses } from "@heroui/theme";

/**
 * @deprecated use `HeroUIVueBaseProps`
 */
export type HTMLHeroVueUIProps = HeroUIVueBaseProps;

export type HeroUIVueBaseProps = {
  as?: Component | keyof HTMLElementTagNameMap | (string & {});
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

export type ToRefsWithDefault<T extends object, K extends keyof T> = {
  [P in keyof T]: ToRef<P extends K ? T[P] & {} : T[P]>;
};

export type UnionToIntersection<U> = (U extends any ? (arg: U) => void : never) extends (
  arg: infer I,
) => void
  ? I
  : never;

export type EventsToEmits<T extends Record<string, any[]>> = UnionToIntersection<
  {
    [K in keyof T]: (e: K, ...args: T[K]) => void;
  }[keyof T]
>;

export type EventsToListeners<T extends Record<string, any[]>> = {
  [P in keyof EmitsToProps<T>]: (cb: EmitsToProps<T>[P]) => void;
};
