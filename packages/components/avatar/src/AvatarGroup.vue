<script lang="ts">
import type { VNode } from "vue";

import {
  Comment,
  cloneVNode,
  computed,
  defineComponent,
  h,
  provide,
  toRef,
  useAttrs,
} from "vue";
import { avatarGroup } from "@heroui/theme";
import { avatarGroupContextKey } from "./use-avatar";

export default defineComponent({
  name: "AvatarGroup",
  props: {
    isGrid: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: undefined,
    },
    total: {
      type: Number,
      default: undefined,
    },
    renderCount: {
      type: Boolean,
      default: true,
    },
    classNames: {
      type: Object as () => Partial<Record<"base" | "count", string>>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const isGrid = toRef(props, "isGrid");

    provide(avatarGroupContextKey, {
      isInGroup: computed(() => !isGrid.value),
      isInGridGroup: isGrid,
    });

    const styles = computed(() => avatarGroup({ isGrid: props.isGrid }));

    const slotChildren = computed(() => {
      return (slots.default?.() ?? []).filter((node) => node.type !== Comment);
    });

    const visibleChildren = computed(() => {
      if (!props.max || props.max < 1) {
        return slotChildren.value;
      }

      return slotChildren.value.slice(0, props.max);
    });

    const hiddenCount = computed(() => {
      if (!props.renderCount) {
        return 0;
      }

      const renderedCount = visibleChildren.value.length;
      const sourceCount = props.total ?? slotChildren.value.length;

      return Math.max(sourceCount - renderedCount, 0);
    });

    return () => {
      const children: VNode[] = visibleChildren.value.map((child, index) =>
        cloneVNode(child, { key: child.key ?? `avatar-group-${index}` }),
      );

      if (hiddenCount.value > 0) {
        children.push(
          h(
            "span",
            {
              class: styles.value.count({ class: props.classNames?.count }),
              key: "avatar-group-count",
            },
            `+${hiddenCount.value}`,
          ),
        );
      }

      return h(
        "div",
        {
          ...attrs,
          class: styles.value.base({
            class:
              [props.classNames?.base, attrs.class].filter(Boolean).join(" ") ||
              undefined,
          }),
        },
        children,
      );
    };
  },
});
</script>
