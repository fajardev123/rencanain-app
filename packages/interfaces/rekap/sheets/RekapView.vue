<script setup lang="ts">
import { useAuthStore } from "@/composable/stores";

const auth = useAuthStore();
</script>

<template>
  <div class="h-full relative flex flex-col">
    <div v-if="auth.isLogin">Rekap</div>
    <AuthPage
      v-else
      icon="fa-solid fa-file-invoice"
      title="Rekap"
      description="Kamu dapat melihat rekap semua transaksimu dan menganalisis pemasukan maupun pengeluaranmu sendiri"
    />
  </div>
</template>

<style scoped></style>
