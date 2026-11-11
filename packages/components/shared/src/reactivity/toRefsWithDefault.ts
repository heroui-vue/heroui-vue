import { refDefault, toRefs, toRef, type MaybeRef } from "@vueuse/core";
import type { ToRefs } from "vue";
import type { PickRequired } from "../types";

export function toRefsWithDefault<T extends object, K extends keyof T>(
  obj: MaybeRef<T>,
  defaultObj?: { [P in K]: T[P] },
): PickRequired<ToRefs<T>, K> {
  const refs = toRefs(obj);
  for (const key in defaultObj) {
    const k = key as K;
    refs[k] = (k in obj ? refDefault(refs[k], defaultObj[k]) : toRef(defaultObj[k])) as any;
  }

  return refs as PickRequired<ToRefs<T>, K>;
}
