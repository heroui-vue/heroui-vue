<script setup lang="ts">
import { Button, Alert } from "heroui-vue";
</script>

<template>
  <div class="h-svh w-full flex justify-center items-center">
    <div class="flex flex-col gap-4">
      <Alert
        color="success"
        title="HeroUI Vue"
        description="Power by Vue3 and HeroUI Theme"
      />
      <Button color="primary" full-width>Click me</Button>
    </div>
  </div>
</template>
