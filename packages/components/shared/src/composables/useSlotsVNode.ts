import type { VNode } from "vue";
import { getCurrentInstance, watchEffect, ref } from "vue";

export function useSlotsVNode<Slots extends Record<string, any>>() {
  const inst = getCurrentInstance();
  const reactiveSlots = ref<Record<keyof Slots, VNode | undefined>>({} as any);

  watchEffect(() => {
    if (!inst) return;
    const keys = Object.keys(inst.slots) as (keyof Slots)[];
    const newSlots = {} as Record<keyof Slots, VNode | undefined>;
    keys.forEach((key) => {
      // Call slot function to get VNode
      newSlots[key] = inst.slots[key]?.() as unknown as VNode;
    });
    reactiveSlots.value = newSlots;
  });

  return reactiveSlots;
}
