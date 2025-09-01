import { getCurrentInstance, ref, watchEffect } from "vue";

type FirstUppercase<T extends string> = T extends `${infer F}${infer Rest}`
  ? `${Uppercase<F>}${Rest}`
  : never;
export type OnEventName<T extends string> = `on${FirstUppercase<T>}`;

export function useRegisteredListeners<T extends string>() {
  type Listeners = Record<OnEventName<T>, Function>;
  const instance = getCurrentInstance();
  const listeners = ref<Listeners>({} as any);

  if (!instance) {
    throw new Error("useRegisteredListeners must be called within setup");
  }

  // @ts-ignore
  const emits = Object.keys(instance.emitsOptions || {});

  watchEffect(() => {
    const vnodeProps = instance.vnode.props || {};
    const eventListeners = {} as Listeners;

    Object.keys(vnodeProps).forEach((key) => {
      const eventName = key.slice(2).toLowerCase() as T;
      if (
        emits.includes(eventName) &&
        key.startsWith("on") &&
        typeof vnodeProps[key] === "function"
      ) {
        // @ts-ignore
        eventListeners[key] = vnodeProps[key] as Function;
      }
    });

    listeners.value = eventListeners;
  });

  return listeners;
}
