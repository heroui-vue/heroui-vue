<script setup>
import { Alert } from '@heroui-vue/core/raw'
</script>

# Alert
Temporary notifications that provide concise feedback about actions or events

## Installation
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
> If you use [global installation](/en/guide/installation#global-installation), you can skip this installation step

## Import
::: code-group
```js [On-demand import]
import { Alert } from '@heroui-vue/alert'
```
```js [Global import]
import { Alert } from 'heroui-vue'
```
:::

## Usage

::: component-view
<Alert
  title="This is an alert"
  description="Thanks for subscribing to our newsletter!"
/>
:::

### Colors
Alert has 6 color variants to convey different meanings.

::: component-view
<div style="display: grid; row-gap: 1rem;">
  <Alert v-for="color in ['default', 'primary', 'secondary', 'success', 'warning', 'danger']" :key="color" :color :title="`This is a ${color} alert`" />
</div>
:::

### Variants

::: component-view
<div style="display: grid; row-gap: 1rem; margin-top: 1rem;">
  <Alert
   v-for="variant in ['solid', 'bordered', 'flat', 'faded']"
   :key="variant"
   :variant color="secondary"
   :title="`This is a ${variant} alert`" />
</div>
:::

### Custom Icon

By default, the Alert component displays a corresponding icon based on the `color` prop. You can override this behavior by providing a custom icon using the `icon` slot.

::: component-view
<Alert title="An alert with a custom icon">
  <template #icon>
  <svg data-name="Iconly/Curved/Profile" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="fill-current w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z" data-name="Stroke 1"></path><path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3"></path></g></svg>
  </template>
</Alert>
:::

### Without Icon

You can hide the icon by setting the `hideIcon` prop to `true`.

::: component-view
<Alert
  hideIcon
  color="success"
  description="Thanks for subscribing to our newsletter!"
  title="This is an alert"
  variant="faded"
/>
:::

### Without Icon Wrapper

You can hide the icon wrapper by setting the `hideIconWrapper` prop to `true`.

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
