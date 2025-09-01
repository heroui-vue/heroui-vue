import type { Slot, VNodeTypes } from "vue";
import { getCurrentInstance, ref, watchEffect, Text, Comment } from "vue";

export type Children = VNodeTypes | VNodeTypes[] | null;

export function useRawChildren(slotName = "default") {
  const instance = getCurrentInstance();
  const children = ref<VNodeTypes | VNodeTypes[] | null>([]);

  if (!instance) {
    throw new Error("useRawChildren must be called within setup");
  }

  const extractRawContent = (slot: ReturnType<Slot>) => {
    if (!slot?.length) return null;

    if (slot.length === 1) {
      const vnode = slot[0];
      if (vnode.type === Text) return vnode.children;
      if (vnode.type === Comment) return null;
      return vnode;
    }

    if (slot.every((node) => node.type === Text)) {
      return slot.map((node) => node.children).join("");
    }

    return slot;
  };

  watchEffect(() => {
    const slot = instance.slots[slotName]?.();
    children.value = extractRawContent(slot as any);
  });

  return children;
}
