<script setup lang="ts">
import { menus } from "@/constants";
import { useRoute } from "vue-router";

const route = useRoute();
const headerTitle = computed(() => route.meta.headerTitle || "Rencanain");
const headerIcon = computed(() => route.meta.headerIcon || "fa-solid fa-bug");
</script>

<template>
  <div class="max-w-[480px] mx-auto relative flex flex-col h-dvh">
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="bg-primary flex justify-between items-center">
        <div class="px-3.5 flex justify-center items-center">
          <div class="text-white flex justify-center items-center gap-1.5">
            <i :class="[headerIcon, 'mb-1']"></i>
            <span class="text-xl">{{ headerTitle }}</span>
          </div>
        </div>
        <div class="px-7 py-3.5">
          <button type="button" class="flex justify-center items-center">
            <i class="fa-solid fa-bars text-white text-lg"></i>
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto no-scrollbar">
        <slot />
      </div>
    </div>
    <div
      class="h-16 flex justify-around overflow-hidden rounded-t shadow-[0px_0px_5px_rgba(107,114,128,0.3)] bg-white"
    >
      <NuxtLink
        v-for="(menu, index) in menus"
        :to="menu.to"
        class="flex justify-center items-center flex-col w-full border-t-3 border-primary"
        :key="index"
      >
        <div><i :class="menu.icon"></i></div>
        <div
          class="text-sm text-nowrap text-ellipsis overflow-x-hidden w-full text-center"
        >
          {{ menu.nama }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
