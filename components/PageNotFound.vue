<script setup lang="ts"></script>

<template>
  <div class="h-full relative flex flex-col">
    <div class="h-full flex justify-center items-center">
      <div class="flex items-center flex-col gap-2.5 w-full px-3.5">
        <i class="fa-solid fa-user-large-slash text-5xl"></i>
        <div class="text-center text-xl font-filson-bold">
          Wah, halaman ini belum berhasil ditampilkan.
        </div>
        <p class="text-center">
          Kemungkinan halaman ini sudah tidak aktif. Pastikan halaman yang kamu
          tuju sudah benar ya!
        </p>

        <NixtLink to="/" label="Kembali" color="transparent" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
