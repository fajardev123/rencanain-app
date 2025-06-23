<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps<{
  fields: Record<string, any>;
  error?: String;
  isDisabled?: boolean;
}>();
const modelValue = defineModel<any>();

const isInputActive = ref(false);

function formatNumberWithDecimal(value: number | null) {
  if (value === null || isNaN(value)) return "";
  const parts = value.toFixed(2).split(".");
  const integerPart = parts[0];
  const withThousands = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return withThousands;
}

const displayValue = computed({
  get() {
    if (isInputActive.value) {
      return modelValue.value !== null && modelValue.value !== undefined
        ? modelValue.value.toString().replace(".", ",")
        : "";
    }
    return formatNumberWithDecimal(
      typeof modelValue.value === "number"
        ? modelValue.value
        : parseFloat(modelValue.value as string)
    );
  },
  set(val: string) {
    const normalized = val.replace(/\./g, "").replace(",", ".");
    const angka = parseFloat(normalized);
    modelValue.value = isNaN(angka) ? null : angka;
  },
});
</script>

<template>
  <div class="nixt-field-wrapper">
    <label class="nixt-field-label">{{ fields?.name }}</label>
    <input
      v-if="fields?.input === 'float'"
      :value="displayValue"
      @input="(e) => displayValue = (e.target as HTMLInputElement).value"
      @focus="isInputActive = true"
      @blur="isInputActive = false"
      type="text"
      :id="fields?.handle"
      :placeholder="fields?.options?.placeholder"
      class="nixt-field"
      :disabled="isDisabled"
      autocomplete="off"
    />
    <input
      v-else-if="fields?.input == 'short-text'"
      type="text"
      v-model="modelValue"
      class="nixt-field"
      :disabled="isDisabled"
    />
    <VueSelect
      v-else-if="fields?.input == 'select'"
      v-model="modelValue"
      class="nixt-select-control"
      :disabled="isDisabled"
      :options="fields?.options?.choices"
      :reduce="(data: any) => data.value"
      :label="fields.options?.display"
      placeholder="Select..."
    >
      <template #option="option">
        <span>{{ option[fields?.options?.display] }}</span>
      </template>
    </VueSelect>
    <VueDatePicker
      v-else-if="fields?.input == 'date'"
      v-model="modelValue"
      :disabled="isDisabled"
      :range="fields?.options?.range ?? false"
      auto-apply
    ></VueDatePicker>
    <input
      v-else
      :type="fields?.input"
      v-model="modelValue"
      class="nixt-field"
      :disabled="isDisabled"
    />
    <p v-if="error && error?.length > 0" class="danger-alert">*{{ error }}</p>
  </div>
</template>

<style scoped>
.nixt-field-wrapper {
  @apply flex flex-col;
}

.nixt-field-label {
  @apply font-bold w-fit mb-1;
}

.nixt-field {
  @apply w-full px-3.5 py-1 placeholder-gray-400 bg-white border-2 border-[#e4e4e7] rounded-lg shadow-sm focus:outline-none focus:border-gray-900 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
}

.nixt-field-select {
  @apply w-full px-3.5 py-2 placeholder-gray-400 bg-white border-2 border-[#e4e4e7] rounded-lg shadow-sm focus:outline-none focus:border-gray-900 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
}

.danger-alert {
  @apply mt-1 px-1.5 text-sm text-red-600;
}

.nixt-select-control {
  @apply rounded-lg px-2 border-2 text-black outline-none;
  --vs-controls-color: #a1a1aa;
  --vs-border-color: default;
  --vs-dropdown-option--active-bg: #f4f4f5;
  --vs-dropdown-option--active-color: #2f2d38;
  --vs-search-input-placeholder-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
</style>
