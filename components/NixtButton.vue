<script setup lang="ts">
const props = defineProps<{
  color?: "success" | "danger" | "warning" | "transparent";
  label: string;
}>();

const emit = defineEmits(["click"]);

const colorClass = computed(() => {
  if (props.color == "success") {
    return "text-green-100 bg-green-600 border-green-700 hover:text-white hover:bg-green-700";
  } else if (props.color == "danger") {
    return "text-red-100 bg-red-600 border-red-700 hover:text-white hover:bg-red-700";
  } else if (props.color == "warning") {
    return "text-yellow-900 bg-yellow-500 border-yellow-600 hover:text-white hover:bg-yellow-600";
  } else if (props.color == "transparent") {
    return "text-green-600 bg-white border-green-600 hover:text-white hover:bg-green-600";
  } else {
    return "text-gray-200 bg-gray-900 border-black hover:text-white hover:bg-black";
  }
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      'px-3.5 py-2.5 border rounded-lg flex justify-center items-center w-full duration-150',
      colorClass,
    ]"
    @click.prevent="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<style scoped></style>
