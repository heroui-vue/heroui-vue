# @heroui-vue/user

User component for `heroui-vue`, using the HeroUI user theme and Vue Avatar.

```vue
<script setup>
import { User } from "@heroui-vue/user";
</script>

<template>
  <User name="Jane Doe" description="Product designer" :avatarProps="{ src: '/jane.jpg' }" />
</template>
```

Use the `name`, `description`, and `avatar` slots for custom content. The `avatar`
slot receives `avatarProps`. The `useUser` composable exposes the props for each
theme slot for custom implementations.
