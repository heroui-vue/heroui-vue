import { describe, test, expect } from "vitest";
import { cloneValidVnode, cloneSlot, isValidVNode, tryUseSlots } from "@heroui-vue/shared";
import { h, defineComponent, createCommentVNode, createTextVNode, Fragment } from "vue";
import { renderToString } from "vue/server-renderer";

const vnodes = [h("span"), h("span", "content"), createCommentVNode(), createTextVNode()];

test("isValidVNode", () => {
  const [span_with_empty, span_with_content, commentNode, testNode] = vnodes;
  expect(isValidVNode(span_with_empty)).toBeTruthy();
  expect(isValidVNode(span_with_content)).toBeTruthy();
  expect(isValidVNode(commentNode)).toBeFalsy();
  expect(isValidVNode(testNode)).toBeFalsy();
});

describe("cloneValidVnode", async () => {
  const ADDED_CLASS = "addedClass";
  const SINGLE_VALID_VNODES = [h("span"), createCommentVNode(), createTextVNode()];
  test("fragment with multiple valid vnodes", async () => {
    expect(
      await renderToString(
        h(
          "div",
          cloneValidVnode(
            [...SINGLE_VALID_VNODES, h(Fragment, null, [h("span", "no class"), "nested content"])],
            {
              class: ADDED_CLASS,
            },
          )!,
        ),
      ),
    ).not.toContain(ADDED_CLASS);
  });
  test("fragment with single valid vnode", async () => {
    expect(
      await renderToString(
        h(
          "div",
          cloneValidVnode(h(Fragment, SINGLE_VALID_VNODES), {
            class: ADDED_CLASS,
          })!,
        ),
      ),
    ).toContain(ADDED_CLASS);
  });
  test("html element", async () => {
    expect(
      await renderToString(
        h(
          "div",
          cloneValidVnode(SINGLE_VALID_VNODES, {
            class: ADDED_CLASS,
          })!,
        ),
      ),
    ).toContain(ADDED_CLASS);
  });
});

test("cloneSlot", async () => {
  const CONTENT = "This content slot";
  const child = defineComponent({
    setup() {
      const { content } = tryUseSlots("content");
      return cloneSlot(content);
    },
  });
  expect(
    await renderToString(
      h(child, null, {
        content: () => CONTENT,
      }),
    ),
  ).toContain(CONTENT);
});

test("tryUseSlots", async () => {
  const CONTENT = "This slot for the content";
  const child = defineComponent({
    setup() {
      const { content } = tryUseSlots("content");
      return () => h("div", content?.());
    },
  });
  const rendered = await renderToString(
    h(child, null, {
      content: () => h("span", CONTENT),
    }),
  );
  expect(rendered).toContain(CONTENT);
});
