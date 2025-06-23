<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div class="flex items-center flex-col gap-2.5 w-full px-3.5">
      <i :class="[icon, 'text-5xl']"></i>
      <div class="text-center text-xl font-filson-bold">{{ title }}</div>
      <p class="text-center">{{ description }}</p>
      <NixtLink to="/login" label="Daftar/Masuk" color="transparent" />
    </div>
  </div>
</template>

<style scoped></style>
