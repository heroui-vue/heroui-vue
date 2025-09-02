<script setup>
import { Alert } from '@heroui-vue/core/raw'
</script>

# Alert
提供关于操作或事件的简洁反馈的临时通知

## 安装
::: code-group
```sh [npm]
npm add @heroui-vue/alert
```
```sh [pnpm]
pnpm add @heroui-vue/alert
```
```sh [yarn]
yarn add @heroui-vue/alert
```
```sh [bun]
bun add @heroui-vue/alert
```
:::

> [!NOTE]
> 如果你使用[全局安装](/guide/installation#全局安装)的方式，可忽略此安装步骤

## 导入
::: code-group
```js [按需导入]
import { Alert } from '@heroui-vue/alert'
```
```js [全局导入]
import { Alert } from 'heroui-vue'
```
:::

## 使用

::: component-view
<Alert
  title="This is an alert"
  description="Thanks for subscribing to our newsletter!"
/>
:::

### 颜色
Alert有6种颜色变体，用以传达不同的含义。

::: component-view
<div style="display: grid; row-gap: 1rem;">
  <Alert v-for="color in ['default', 'primary', 'secondary', 'success', 'warning', 'danger']" :key="color" :color :title="`This is a ${color} alert`" />
</div>
:::

### 变体

::: component-view
<div style="display: grid; row-gap: 1rem; margin-top: 1rem;">
  <Alert
   v-for="variant in ['solid', 'bordered', 'flat', 'faded']"
   :key="variant"
   :variant color="secondary"
   :title="`This is a ${variant} alert`" />
</div>
:::

### 自定义图标

默认情况下，Alert 组件会根据`color`属性显示相应的图标。你可以通过使用`icon`插槽提供自定义图标来覆盖这一行为。

::: component-view
<Alert title="An alert with a custom icon">
  <template #icon>
  <svg data-name="Iconly/Curved/Profile" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="fill-current w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z" data-name="Stroke 1"></path><path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3"></path></g></svg>
  </template>
</Alert>
:::

### 不带图标

您可以通过将 `hideIcon` 属性设置为 `true` 来隐藏图标。

::: component-view
<Alert
  hideIcon
  color="success"
  description="Thanks for subscribing to our newsletter!"
  title="This is an alert"
  variant="faded"
/>
:::

### 不带图标容器

您可以通过将 `hideIconWrapper` 属性设置为 `true` 来隐藏图标容器。

::: component-view
<Alert
  hideIconWrapper
  color="secondary"
  description="This is a bordered variant alert"
  title="Bordered Alert"
  variant="bordered"
/>
:::

###
