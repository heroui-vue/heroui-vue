import { getCurrentInstance, ref, onUpdated, onMounted } from "vue";

export function useReactiveAttrs<T = any>() {
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
