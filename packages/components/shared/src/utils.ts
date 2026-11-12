import {
  Text,
  Comment,
  Fragment,
  getCurrentInstance,
  cloneVNode,
  isVNode,
  useSlots,
  useAttrs,
  inject,
} from "vue";
import { isEmpty } from "@heroui/shared-utils";
import { cn } from "@heroui/theme";
import type { ComponentInternalInstance, Slot, VNode } from "vue";

export function pureObject(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, Object.create(null));
}

/**
 * This function is copied from heroui souce code
 */
export const mapPropsVariants = <T extends Record<string, any>, K extends keyof T>(
  props: T,
  variantKeys?: K[],
  removeVariantProps = true,
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}];
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return { ...acc, [key]: props[key] };
    } else {
      return acc;
    }
  }, {});

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({ ...acc, [key]: props[key as keyof T] }), {});

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
  } else {
    return [props, picked] as [T, Pick<T, K>];
  }
};

export const hasBoundProp = (instance: ComponentInternalInstance, key: string): boolean => {
  if (!instance?.vnode.props) {
    return false;
  }
  const kebabKey = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  return key in instance.vnode.props || kebabKey in instance.vnode.props;
};

export function upperFirst(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function hasEmitListeners<T extends string[]>(
  ...events: [...T]
): {
  [K in T[number] as `has${Capitalize<K>}`]: boolean;
} {
  const instance = getCurrentInstance();
  const result = {} as any;
  if (!instance || isEmpty(instance?.vnode.props)) {
    return result;
  }

  const props = instance.vnode.props!;
  for (const event of events) {
    const camelEvent = event.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const camelOnKey = `on${upperFirst(camelEvent)}`;
    const key = `has${upperFirst(event)}`;
    const onKey = `on${upperFirst(event)}`;
    const updateKey = event.startsWith("update:") ? `onUpdate:${event.slice(7)}` : null;
    result[key] = !!(props[onKey] || props[camelOnKey] || (updateKey && props[updateKey]));
  }

  return result;
}

/**
 * Safe `useSlots`
 */
export function tryUseSlots<T extends string[], R = Record<T[number], Slot | undefined>>(
  ...slotNames: [...T]
): R {
  const instance = getCurrentInstance();
  const result = {} as any;
  if (!instance) {
    return result;
  }
  const slots = useSlots();
  for (const name of slotNames) {
    result[name] = slots?.[name];
  }
  return result;
}

/**
 * Safe `useAttrs`
 */
export function tryUseAttrs<T extends string[], R = Record<T[number], string | undefined>>(
  ...attrNames: [...T]
): R {
  const instance = getCurrentInstance();
  const result = {} as any;
  if (!instance) {
    return result;
  }
  const attrs = useAttrs();
  for (const name of attrNames) {
    result[name] = attrs?.[name];
  }
  return result;
}

/**
 * Safe `inject`
 */
// @ts-expect-error overloads are not compatible
export const tryInject: typeof inject = <T>(...args) => {
  const instance = getCurrentInstance();
  if (!instance) {
    return;
  }
  // @ts-expect-error overloads are not compatible
  return inject<T>(...args);
};

export function isValidVNode(vnode?: VNode) {
  if (!vnode) {
    return false;
  }
  const { type } = vnode;
  return type !== Comment && type !== Text;
}

export function flattenVNodes(vnodes: VNode | VNode[] | undefined | null): VNode[] {
  if (!vnodes) {
    return [];
  } else if (!Array.isArray(vnodes)) {
    return flattenVNodes([vnodes]);
  }

  const flatVnodes = vnodes.flatMap((vnode) => {
    if (!isVNode(vnode)) {
      return [];
    } else if (vnode.type === Fragment) {
      return flattenVNodes(vnode.children as VNode | VNode[]);
    } else {
      return [vnode];
    }
  });

  return flatVnodes;
}

/**
 * @deprecated use `cloneValidVnode` instead
 */
export function cloneSlot(
  slot: Slot | undefined | null,
  ...cloneNode: Parameters<typeof cloneValidVnode> extends [infer _, ...infer R] ? R : never
): () => ReturnType<typeof cloneValidVnode> {
  if (!slot) {
    return () => null;
  } else {
    return () => cloneValidVnode(slot(), ...cloneNode);
  }
}

export function cloneValidVnode(
  vnodes: VNode | VNode[] | undefined,
  ...cloneNode: Parameters<typeof cloneVNode> extends [infer _, ...infer R] ? R : never
): VNode[] | null {
  if (!vnodes) {
    return null;
  } else if (!Array.isArray(vnodes)) {
    return cloneValidVnode([vnodes], ...cloneNode);
  }

  const flatVnodes = flattenVNodes(vnodes);
  if (flatVnodes.filter(isValidVNode).length !== 1) {
    return vnodes;
  }

  const clonedVnodes = flatVnodes.map((vnode) => {
    if (!isValidVNode(vnode)) {
      return vnode;
    } else {
      const [props, ...rest] = cloneNode;
      if (props) {
        const mergedClass = cn(vnode.props?.class, props.class as string);
        delete vnode.props?.class;
        return cloneVNode(vnode, { ...props, class: mergedClass }, ...rest);
      }
      return cloneVNode(vnode, ...cloneNode);
    }
  });

  return clonedVnodes;
}
