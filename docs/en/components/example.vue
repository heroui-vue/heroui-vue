<script setup>
import { Badge } from "@heroui-vue/badge";
import { NotificationIcon } from "@heroui-vue/icon";
</script>

<template>
  <Badge color="danger" content="99+" shape="circle">
    <Button isIconOnly aria-label="more than 99 notifications" radius="full" variant="light">
      <NotificationIcon :size="24" />
    </Button>
  </Badge>
</template>
