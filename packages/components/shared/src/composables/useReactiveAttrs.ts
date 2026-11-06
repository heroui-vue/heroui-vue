import { getCurrentInstance, ref, onUpdated, onMounted } from "vue";
import type { Ref } from "vue";

export function useReactiveAttrs<T = any>(): Ref<any, any> | Ref<T, T> {
  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error("useReactiveAttrs must be called within a setup function");
  }

  const reactiveAttrs = ref<T>({} as any);

  const updateAttrs = () => {
    reactiveAttrs.value = { ...instance.attrs };
  };

  onMounted(() => {
    updateAttrs();
  });
  onUpdated(() => {
    updateAttrs();
  });

  return reactiveAttrs;
}
