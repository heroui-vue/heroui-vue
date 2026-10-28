<script setup>
import { Button } from '@heroui-vue/core/raw'
</script>

# Button

允许用户通过单次轻触执行操作和选择。

## 安装

::: code-group
```sh [npm]
npm add @heroui-vue/button
```

```sh [pnpm]
pnpm add @heroui-vue/button
```

```sh [yarn]
yarn add @heroui-vue/button
```

```sh [bun]
bun add @heroui-vue/button
```
:::

> [!NOTE]
> 如果你使用[全局安装](/zh/guide/installation#全局安装)的方式，可忽略此安装步骤

## 导入

::: code-group
```js [按需导入]
import { Button } from "@heroui-vue/button";
```

```js [全局导入]
import { Button } from "heroui-vue";
```
:::

## 使用

::: component-view
<Button color="primary">Button</Button>
:::

### 禁用

按钮将无法点击

::: component-view
<Button color="primary" isDisabled>Button</Button>
:::

### 大小

显示不同尺寸的按钮

::: component-view
<div class="flex gap-4 items-center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
</div>
:::

### 半径

显示不同角度的按钮

::: component-view
<div className="flex gap-4 items-center">
  <Button radius="full">Full</Button>
  <Button radius="lg">Large</Button>
  <Button radius="md">Medium</Button>
  <Button radius="sm">Small</Button>
  <Button radius="none">None</Button>
</div>
:::

### 颜色

显示不同颜色的按钮

::: component-view
<div class="flex flex-wrap gap-4 items-center">
  <Button color="default">Default</Button>
  <Button color="primary">Primary</Button>
  <Button color="secondary">Secondary</Button>
  <Button color="success">Success</Button>
  <Button color="warning">Warning</Button>
  <Button color="danger">Danger</Button>
</div>
:::

### 变体

显示不同种类的按钮

::: component-view
<div className="flex flex-wrap gap-4 items-center">
  <Button color="primary" variant="solid">
    Solid
  </Button>
  <Button color="primary" variant="faded">
    Faded
  </Button>
  <Button color="primary" variant="bordered">
    Bordered
  </Button>
  <Button color="primary" variant="light">
    Light
  </Button>
  <Button color="primary" variant="flat">
    Flat
  </Button>
  <Button color="primary" variant="ghost">
    Ghost
  </Button>
  <Button color="primary" variant="shadow">
    Shadow
  </Button>
</div>
:::

### 加载

传递 `isLoading` 属性以在按钮内显示 `Spinner` 组件。

:::warning
正在开发中
:::

你还可以通过将自定义组件传递给`spinner`插槽来自定义加载spinner。

::: component-view
<Button color="secondary" isLoading>
  <template #spinner>
      <svg
          class="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
          />
          <path
              class="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
          />
      </svg>
  </template>
  Loading
</Button>
:::

`spinner`插槽默认显示在按钮的开始位置，你也可以在按钮的结束位置显示自定义组件，通过指定`spinnerPlacement`来实现。

::: component-view
<Button color="secondary" spinnerPlacement="end" isLoading>
  <template #spinner>
      <svg
          class="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
          />
          <path
              class="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
          />
      </svg>
  </template>
  Loading
</Button>
:::

### 带图标

你可以通过传递`startContent`或`endContent`插槽来添加图标。

::: component-view
<div className="flex gap-4 items-center">
  <Button color="success">
    <template #endContent>
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
    </template>
    Take a photo
  </Button>
  <Button color="danger" variant="bordered">
    <template #startContent>
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          >
            <path
              d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
            />
            <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" />
          </g>
        </svg>
    </template>
    Delete user
  </Button>
</div>
:::

### 仅图标

你还可以通过将`isIconOnly`属性和所需的图标作为默认子元素传递来显示不带文本的按钮。

::: component-view
<div className="flex gap-4 items-center">
    <Button isIconOnly aria-label="Like" color="danger">
        <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
    </Button>
    <Button isIconOnly aria-label="Take a photo" color="warning" variant="faded">
        <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
    </Button>
</div>
:::

### 自定义样式

你可以通过将自定义 Tailwind CSS 类传递给组件槽来自定义 Button 组件。

::: component-view
<Button
class="bg-gradient-to-tr from-pink-500 to-yellow-500 bg-sky-500 text-white shadow-lg"
radius="full"

>

Button
</Button>
:::

### 禁用Ripple

按钮按下时将不会出现涟漪效果

::: component-view
<Button disableRipple>
  Button
</Button>
:::

### 禁用动画

按钮按下时将不会出现动画效果

::: component-view
<Button disableAnimation>
  Button
</Button>
:::

## 数据属性

`Button` 在 `base` 元素上具有以下属性：

- **data-hover**:
  当按钮被悬停时。基于 [useElementHover](https://vueuse.org/core/useElementHover/#useelementhover)
- **data-focus**:
  当按钮被聚焦时。基于 [useFocus](https://vueuse.org/core/useFocus/#usefocus)。
- **data-focus-visible**: 目前尚不支持，默认为 `false`。
- **data-disabled**:
  当按钮被禁用时。基于 `isDisabled` 属性。
- **data-pressed**:
  当按钮被按下时。基于 [useMousePressed](https://vueuse.org/core/useMousePressed/#usemousepressed)
- **data-loading**:
  当按钮正在加载时。基于 `isLoading` 属性。

## 无障碍访问

:::info
某些功能可能不够完善，如果你发现任何问题，请提交 issue
:::

- Button 具有 `button` 角色（目前尚不支持，计划支持）。
- 支持 <Kbd>Space</Kbd> 和 <Kbd>Enter</Kbd> 键的键盘事件。
- 鼠标和触摸事件处理，以及按下状态管理。
- 键盘焦点管理和跨浏览器标准化。

:heart:来自 HeroUI：我们推荐阅读这篇[博客文章](https://react-spectrum.adobe.com/blog/building-a-button-part-1.html)，了解构建在各种设备和交互方法下都能良好工作的按钮的复杂性。

## API

### Button 属性

| 名称             | 类型                                                                           | 默认值      | 描述                             |
| ---------------- | ------------------------------------------------------------------------------ | ----------- | -------------------------------- |
| variant          | `"solid" \| "bordered" \| "light" \| "flat" \| "faded" \| "shadow" \| "ghost"` | `"solid"`   | 按钮外观样式。                   |
| color            | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"`  | `"default"` | 按钮颜色主题。                   |
| size             | `"sm" \| "md" \| "lg"`                                                         | `"md"`      | 按钮大小                         |
| radius           | `"none" \| "sm" \| "md" \| "lg" \| "full"`                                     | `"md"`      | 按钮边框圆角。                   |
| spinnerPlacement | `"start" \| "end"`                                                             | `"start"`   | 加载器位置。                     |
| fullWidth        | `boolean`                                                                      | `false`     | 按钮是否应占据其父元素的全宽。   |
| isIconOnly       | `boolean`                                                                      | `false`     | 按钮是否应具有相同的宽度和高度。 |
| isDisabled       | `boolean`                                                                      | `false`     | 按钮是否被禁用。                 |
| isLoading        | `boolean`                                                                      | `false`     | 按钮是否正在加载。               |
| disableRipple    | `boolean`                                                                      | `false`     | 按钮是否应在按下时显示涟漪效果。 |
| disableAnimation | `boolean`                                                                      | `false`     | 按钮是否应显示动画。             |

### Button 插槽

| 名称         | 作用域 | 描述           |
| ------------ | ------ | -------------- |
| default      | -      | 默认插槽。     |
| startContent | -      | 开始内容插槽。 |
| endContent   | -      | 结束内容插槽。 |
| spinner      | -      | 加载器插槽。   |

### Button 事件 (开发中)

| 名称        | 类型                           | 默认值 |
| ----------- | ------------------------------ | ------ |
| press       | `(e: PressEvent) => void`      | -      |
| pressStart  | `(e: PressEvent) => void`      | -      |
| pressEnd    | `(e: PressEvent) => void`      | -      |
| pressChange | `(isPressed: boolean) => void` | -      |
| pressUp     | `(e: PressEvent) => void`      | -      |
| keyDown     | `(e: KeyboardEvent) => void`   | -      |
| keyUp       | `(e: KeyboardEvent) => void`   | -      |
