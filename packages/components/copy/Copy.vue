<script lang="ts" setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

export interface Props {
  /**
   * 要复制的文本.
   */
  text?: string;
  /**
   * 将root元素渲染为指定的HTML标签.
   * @default span
   */
  as?: keyof HTMLElementTagNameMap;
  /**
   * 复制后距下次可复制的延迟时间, 单位`毫秒`.
   * @default 2000.
   */
  delay?: number;
  /**
   * 是否只在指定元素出现溢出时显示.
   *
   * 可以指定:
   *  - `previous`: 父元素的子元素节点中的前一个元素节点.
   *  - `next`: 父元素的子元素节点中的后一个元素节点.
   *  - CSS选择器字符串所匹配到的第一个元素.
   */
  showOnElementOverflow?: "previous" | "next" | (string & {});
  /**
   * 是否显示浏览器环境不支持剪切板写入的错误信息, 默认展示.
   * @default show
   */
  noSupport?: "show" | "silence";
}

export interface Emits {
  /**
   * 复制事件.
   * @param e 事件名称.
   * @param text 复制的文本.
   */
  (e: "copy", text: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  as: "span",
  delay: 2000,
});

const copyIdAttr = "useCopy";
const supportClipboardWriteText = ref(!!navigator?.clipboard?.writeText);
const available = ref(true);
const availableCountdown = ref();
const copyRef = ref<HTMLElement | null>();
const show = ref(true);

const stopWatch = watch(
  [() => props.showOnElementOverflow, () => props.text],
  async ([selector]) => {
    await nextTick();
    let element: Element | null | undefined;
    if (selector === "previous") {
      element = copyRef.value?.previousElementSibling;
    } else if (selector === "next") {
      element = copyRef.value?.nextElementSibling;
    } else {
      try {
        element = document.querySelector(selector as string);
      } catch {
        console.warn(`无效的CSS选择器: ${selector}`);
      }
    }

    if (element) {
      const { width } = element.getBoundingClientRect();
      const scrollWidth = element.scrollWidth;
      show.value = scrollWidth > width;
    }
  },
  {
    immediate: true,
  },
);

function onClick(event: Event) {
  event.preventDefault();
  if (available.value) {
    navigator.clipboard?.writeText(props.text ?? "");
    available.value = false;
    clearTimeout(availableCountdown.value);
    availableCountdown.value = setTimeout(() => {
      available.value = true;
    }, props.delay);
  }
}

onBeforeUnmount(() => {
  clearTimeout(availableCountdown.value);
  stopWatch();
});
</script>

<template>
  <component :is="props.as" :id="copyIdAttr" ref="copyRef" @click.capture="onClick">
    <template v-if="supportClipboardWriteText">
      <span v-show="show">
        <button v-if="available">
          <slot>复制</slot>
        </button>

        <span v-else data-copied>
          <!-- 复制文本后显示的内容 -->
          <slot name="copied">复制成功</slot>
        </span>
      </span>
    </template>

    <template v-else>
      <slot
        v-if="props.noSupport === 'show'"
        title="当前浏览器或者浏览器版本不支持复制功能"
        name="noSupport"
      />
    </template>
  </component>
</template>

<style scoped>
button {
  all: initial;
  color: #ff8b3d;
  cursor: pointer;
  transition: color 0.15s ease;
}
button:hover {
  color: #ff8b3da3;
  transition: color 0.15s ease;
}
span[data-copied] {
  color: #67c23a;
}
</style>
