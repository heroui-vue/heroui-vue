import { getCurrentInstance, watchEffect, ref } from "vue";
import type { VNode, Ref } from "vue";

type Slots = Record<string, any>;
type ReactiveSlots = Record<keyof Slots, VNode | undefined>;

export function useSlotsVNode(): Ref<ReactiveSlots, ReactiveSlots> {
  const inst = getCurrentInstance();
  const reactiveSlots = ref<ReactiveSlots>({} as any);

  watchEffect(() => {
    if (!inst) return;
    const keys = Object.keys(inst.slots) as (keyof Slots)[];
    const newSlots = {} as ReactiveSlots;
    keys.forEach((key) => {
      // Call slot function to get VNode
      newSlots[key] = inst.slots[key]?.() as unknown as VNode;
    });
    reactiveSlots.value = newSlots;
  });

  return reactiveSlots;
}
