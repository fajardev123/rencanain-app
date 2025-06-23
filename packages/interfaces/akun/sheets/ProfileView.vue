<script setup lang="ts">
import { useAuthStore } from "@/composable/stores";

const auth = useAuthStore();

async function handleLogout() {
  await auth.logout();
  location.reload();
}
</script>

<template>
  <div class="h-full relative flex flex-col">
    <div v-if="auth.isLogin" class="flex flex-col gap-2.5 py-3.5">
      <div class="px-3.5">
        <div class="flex flex-col rounded-lg overflow-hidden shadow-md">
          <div class="flex">
            <div
              class="bg-violet-800 flex justify-center items-center w-24 h-24 text-white text-4xl"
            >
              {{ auth.user?.nama?.slice(0, 1) }}
            </div>
            <div
              class="px-2.5 text-white bg-primary flex justify-center text-sm flex-col flex-1"
            >
              <div>{{ auth.user?.nama }}</div>
              <div>{{ auth.user?.telepon ?? "-" }}</div>
              <div>{{ auth.user?.email ?? "-" }}</div>
            </div>
          </div>
          <div class="p-2.5 flex gap-2.5">
            <NixtLink
              to="/akun/ubahPassword"
              label="Ubah Password"
              color="transparent"
            />
            <NixtButton label="Edit Profil" color="transparent" />
          </div>
        </div>
      </div>
      <div class="px-3.5">
        <NixtButton label="Keluar" color="danger" @click="handleLogout" />
      </div>
    </div>
    <AuthPage
      v-else
      icon="fa-solid fa-user"
      title="Identitas Kamu"
      description="Yuk masuk dengan akun identitas kamu"
    />
  </div>
</template>

<style scoped></style>
