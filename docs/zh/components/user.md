# User 用户信息

[HeroUI User 文档](https://v2.heroui.com/docs/components/user)

User 组件将头像、姓名和描述组合在一起，用于展示用户信息。

## 安装

::: code-group
```sh [npm]
npm add @heroui-vue/user
```

```sh [pnpm]
pnpm add @heroui-vue/user
```

```sh [yarn]
yarn add @heroui-vue/user
```

```sh [bun]
bun add @heroui-vue/user
```
:::

> [!NOTE]
> 如果你使用的是[全局安装](/zh/guide/installation#global-installation)，可以跳过这一步。

## 导入

::: code-group
```js [按需导入]
import { User } from "@heroui-vue/user";
```

```js [全局导入]
import { User } from "heroui-vue";
```
:::

## 用法

通过 `avatarProps` 设置头像，通过 `name` 和 `description` 插槽设置用户姓名和描述。更多头像属性请参考 [Avatar 文档](/zh/components/avatar)。

:::sfc
<script setup>
import { User } from "@heroui-vue/user";
</script>

<template>
  <User :avatarProps="{ src: 'https://i.pravatar.cc/150?u=a04258114e29026702d', name: 'Jane Doe' }">
    <template #name>Jane Doe</template>
    <template #description>Product Designer</template>
  </User>
</template>
:::

### 链接描述

描述插槽可以包含链接等自定义内容。这里使用 HeroUI Vue 的 `Link` 展示用户社交账号。

:::sfc
<script setup>
import { User } from "@heroui-vue/user";
import { Link } from "@heroui-vue/link";
</script>

<template>
  <User :avatarProps="{ src: 'https://avatars.githubusercontent.com/u/30373425?v=4', name: 'Junior Garcia' }">
    <template #name>Junior Garcia</template>
    <template #description>
      <Link isExternal href="https://x.com/jrgarciadev" size="sm">@jrgarciadev</Link>
    </template>
  </User>
</template>
:::

## 样式插槽

通过 `classNames` 为 User 的各个部分设置 Tailwind CSS 类：

- **base**：User 的根容器。
- **wrapper**：姓名和描述的容器。
- **name**：姓名文本。
- **description**：描述内容。

## Data 属性

当 User 获得焦点时，根元素会带有 `data-focus="true"`。

:::tip
当前实现暂未提供 `data-focus-visible` 的键盘焦点状态。
:::

## 无障碍

- 姓名与描述通过文本插槽提供，确保用户信息对辅助技术可见。
- 默认根元素是 `div`，不会进入 Tab 顺序。需要键盘聚焦时使用 `isFocusable`。
- `isFocusable` 不会单独提供按钮语义或交互；可通过 `as="button"` 指定按钮元素，并为操作添加对应事件。
- 头像的替代文本、姓名缩写和图片回退行为由内部 `Avatar` 处理。通过 `avatarProps` 配置头像，详情参见 [Avatar 文档](/zh/components/avatar)。

## API

### User 属性

| 属性          | 类型                                                                                                         | 默认值                   | 说明                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------ | ------------------------------------------------------------------- |
| `as`          | `string / Component`                                                                                         | `div`                    | 根元素或 Vue 组件。                                                 |
| `isFocusable` | `boolean`                                                                                                    | `false`                  | 使根元素进入 Tab 顺序。`as="button"` 时也会自动聚焦。               |
| `avatarProps` | `Partial<UseAvatarProps>`                                                                                    | `{ isFocusable: false }` | 传递给内部 `Avatar` 的属性，例如 `src`、`name`、`size` 和 `color`。 |
| `classNames`  | `Partial<Record<"base" \| "wrapper" \| "name" \| "description", string \| false \| 0 \| null \| undefined>>` | —                        | 设置各样式插槽的自定义类名。                                        |
| `class`       | `string`                                                                                                     | —                        | 根元素的附加类名。                                                  |

### User 插槽

| 插槽          | 说明                                        |
| ------------- | ------------------------------------------- |
| `name`        | 姓名内容。                                  |
| `description` | 描述内容，可放入文本、链接或其他 Vue 内容。 |
