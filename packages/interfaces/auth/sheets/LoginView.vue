<script setup lang="ts">
import { AuthLogin, AuthRegister } from "../sections";

const isRegister = ref(false);
</script>

<template>
  <div class="h-full relative flex flex-col">
    <AuthRegister v-if="isRegister" @action:masuk="isRegister = false" />
    <AuthLogin v-else @action:daftar="isRegister = true" />
  </div>
</template>

<style scoped></style>
