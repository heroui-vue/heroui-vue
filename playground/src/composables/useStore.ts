import { ref, computed, watchEffect } from "vue";
import {
  useStore as useReplStore,
  useVueImportMap,
  mergeImportMap,
  type ImportMap,
} from "@vue/repl";
import { useMounted } from "@vueuse/core";
// @ts-ignore
import welcomeSFCCode from "../template/Welcome.vue?raw";

export function useStore() {
  const mounted = useMounted();
  if (!mounted) return;
  console.log(location);
  const defaultImportMap = ref<ImportMap>({
    imports: {
      "heroui-vue":
        "https://cdn.jsdelivr.net/npm/heroui-vue@0.0.17/dist/index.js",
    },
  });
  const { importMap } = useVueImportMap();

  const builtinImportMap = computed(() => {
    return mergeImportMap(defaultImportMap.value, importMap.value);
  });
  const template = ref({
    welcomeSFC: welcomeSFCCode,
  });

  const store = useReplStore(
    {
      builtinImportMap,
      template,
    },
    location.hash,
  );

  watchEffect(() => history.replaceState({}, "", store.serialize()));

  return store;
}
