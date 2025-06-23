<script setup lang="ts">
const props = defineProps<{
  label?: string;
  saldo: string | number;
  masuk: string | number;
  keluar: string | number;
}>();
</script>

<template>
  <div
    class="rounded-xl px-3.5 py-2.5 gap-2.5 flex flex-col justify-between shadow-md border border-violet-900 mb-2 bg-[#13549E]"
  >
    <div>
      <div class="text-gray-100">Saldo {{ label }}</div>
      <div class="text-gray-100 font-filson-bold">
        {{ saldo }}
      </div>
    </div>
    <div class="w-12 h-8 bg-[#E9D175] rounded-md"></div>
    <div class="flex justify-between items-center">
      <div class="text-sm">
        <div class="text-green-400">Masuk</div>
        <div class="text-green-400 font-filson-bold">
          {{ masuk }}
        </div>
      </div>
      <div class="text-sm flex flex-col items-end">
        <div class="text-red-400">Keluar</div>
        <div class="text-red-400 font-filson-bold">
          {{ keluar }}
        </div>
      </div>
    </div>
  </div>
</template>
