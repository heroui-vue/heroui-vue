import { ref, watchEffect, type VNode, type Ref } from "vue";
import { useSlotsVNode } from "./useSlotsVNode";
import { useReactiveAttrs } from "./useReactiveAttrs";
import { useRawChildren, type Children } from "./useRawChildren";
import {
  useRegisteredListeners,
  type OnEventName,
} from "./useRegisteredListeners";

export type ReactMockProps<
  Props,
  Slots extends string,
  Emits extends string,
> = {
  children?: Children;
  className?: string;
} & Props &
  Record<Slots, VNode> &
  Record<OnEventName<Emits>, Function>;

export function useMockReact<Props, Slots extends string, Emits extends string>(
  props: Props,
) {
  const mock = ref({} as any);

  const slotsVNode = useSlotsVNode();
  const attrs = useReactiveAttrs();
  const children = useRawChildren();
  const events = useRegisteredListeners<Emits>();

  watchEffect(() => {
    mock.value = {
      ...props,
      // like React Node props
      ...(slotsVNode.value ?? {}),
      // like React Event props
      ...(events.value ?? {}),
      children: children.value,
      className: attrs.value.class,
    };
  });

  return mock as Ref<ReactMockProps<Props, Slots, Emits>>;
}
