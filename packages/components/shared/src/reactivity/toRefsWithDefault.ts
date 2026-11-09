import { refDefault, toRefs, type MaybeRef } from "@vueuse/core";
import { type ToRefs } from "vue";

export function toRefsWithDefault<T extends object>(
  obj: MaybeRef<T>,
  defaultObj?: { [K in keyof T]: any },
): ToRefs<T> {
  const refs = toRefs(obj);
  for (const key in defaultObj) {
    const k = key as keyof T;
    refs[k] = refDefault(refs[k], defaultObj[k]) as any;
  }

  return refs;
}
