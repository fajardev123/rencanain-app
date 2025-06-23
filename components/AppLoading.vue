<script setup lang="ts">
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed bg-white top-0 left-0 bottom-0 right-0 flex justify-center items-center duration-1000 transition-all z-[999999]"
    >
      <div
        class="inline-flex text-6xl text-primary rounded-full animate-scale-loop"
      >
        <i class="fa-solid fa-bug"></i>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes scale-loop {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}

.animate-scale-loop {
  animation: scale-loop 1.5s infinite ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
