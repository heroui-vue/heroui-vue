import { ref, computed, mergeProps, watch, useAttrs, getCurrentInstance } from "vue";
import type { WatchSource, ComputedRef, Ref } from "vue";

interface UseClassNameReturn {
  class: string;
  className: string;
}

export function useClassNames(
  input?: WatchSource<string>,
): ComputedRef<UseClassNameReturn> | Ref<UseClassNameReturn> {
  const classRef = ref({ class: "", className: "" });

  if (!getCurrentInstance()) {
    return computed(() => classRef.value);
  }

  const { class: attrsClassName } = useAttrs();

  function init(className?: string) {
    const { class: mergedClassName } = mergeProps(
      { class: attrsClassName },
      { class: className },
    ) as {
      class: string;
    };

    classRef.value = {
      class: mergedClassName,
      className: mergedClassName,
    };
  }

  if (input) {
    watch(input, init);
  } else {
    init();
  }

  return classRef;
}
