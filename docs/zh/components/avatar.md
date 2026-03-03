<script setup>
import { Avatar } from '@heroui-vue/core/raw'
</script>

# Avatar
Avatar 用于展示用户或实体的头像，可以显示图片、姓名缩写或回退图标。

## 安装
::: code-group
```sh [npm]
npm add @heroui-vue/avatar
```
```sh [pnpm]
pnpm add @heroui-vue/avatar
```
```sh [yarn]
yarn add @heroui-vue/avatar
```
```sh [bun]
bun add @heroui-vue/avatar
```
:::

> [!NOTE]
> 如果你使用的是[全局安装](/zh/guide/installation#global-installation)，可以跳过这一步

## 导入
::: code-group
```js [按需导入]
import { Avatar } from '@heroui-vue/avatar'
```
```js [全局导入]
import { Avatar } from 'heroui-vue'
```
:::

## 使用

::: component-view
<Avatar
  name="HeroUI Vue"
  showFallback
/>
:::

### 图片头像

::: component-view
<Avatar
  name="Hotdog"
  src="https://i.pravatar.cc/150?u=heroui-vue-avatar"
/>
:::

### 尺寸

::: component-view
<div class="flex items-center gap-4">
  <Avatar size="sm" name="小" showFallback />
  <Avatar size="md" name="中" showFallback />
  <Avatar size="lg" name="大" showFallback />
</div>
:::

### 颜色

::: component-view
<div class="flex items-center gap-4">
  <Avatar color="default" name="默" showFallback />
  <Avatar color="primary" name="主" showFallback />
  <Avatar color="secondary" name="次" showFallback />
  <Avatar color="success" name="成" showFallback />
  <Avatar color="warning" name="警" showFallback />
  <Avatar color="danger" name="危" showFallback />
</div>
:::

### 圆角

::: component-view
<div class="flex items-center gap-4">
  <Avatar radius="none" name="无" showFallback />
  <Avatar radius="sm" name="小" showFallback />
  <Avatar radius="md" name="中" showFallback />
  <Avatar radius="lg" name="大" showFallback />
  <Avatar radius="full" name="圆" showFallback />
</div>
:::

### 边框

::: component-view
<div class="flex items-center gap-4">
  <Avatar isBordered color="primary" name="HV" showFallback />
  <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=heroui-vue-avatar-bordered" />
</div>
:::

### 自定义回退内容

::: component-view
<Avatar showFallback>
  <template #fallback>
    <span class="text-xs font-semibold">HV</span>
  </template>
</Avatar>
:::

## 样式插槽 Slots
- **base**：根容器。
- **img**：图片元素。
- **fallback**：回退内容容器。
- **name**：姓名缩写内容。
- **icon**：图标回退内容。
