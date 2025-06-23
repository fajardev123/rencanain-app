<script setup lang="ts">
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import type { FieldDefinition, TFilter, TArgsFetch } from "../types";

const props = defineProps<{
  fields: FieldDefinition;
  error?: String;
  isDisabled?: boolean;
  query?: TFilter;
}>();

const emit = defineEmits(["update:selected"]);

const modelValue = defineModel<any>();
const route = useRoute();
const isNew = computed(() => route.params?.id == "new");
const isLoading = ref(false);

const [domain, app, model] = props.fields.relation!.definition.split(":");
const api = props.fields.relation?.api[app];
const options = ref<Array<Record<string, any>>>([]);
const queries = ref<TFilter>([]);

const selected = computed(() => {
  return (
    options.value?.find((item: any) => item.id === modelValue.value) || null
  );
});

async function fetchAll(args: TArgsFetch = { query: [] }) {
  isLoading.value = true;

  const params = computed(() => {
    return {
      filter: JSON.stringify(args.query),
    };
  });

  await api
    ?.get(`/api/${model}`, { params: params.value })
    .then((response) => response.data)
    .then((resp) => {
      if (resp.code == 200) {
        options.value = resp.data;
      }
    })
    .catch((err) => {
      console.log(`Error fetch data relation : `, err);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

async function onOpen() {
  if (options.value.length > 0) return;
  await fetchAll();
}

watch(selected, (newVal) => {
  emit("update:selected", newVal);
});

watch(
  () => props.query,
  async (val) => {
    queries.value = val ?? [];
  },
  { immediate: true }
);

watch(
  () => queries.value,
  async (val) => {
    if (val) {
      await fetchAll({ query: val });
    }
  }
);

watch(
  () => modelValue.value,
  async (val) => {
    if (options.value.length) return;
    isLoading.value = true;
    if (val) {
      await fetchAll({ query: queries.value });
    }
    isLoading.value = false;
  }
);

async function initialFetch() {
  if (isNew.value) return;
  await fetchAll({ query: queries.value });
}

onMounted(initialFetch);
</script>

<template>
  <div class="nixt-field-wrapper">
    <label class="nixt-field-label">{{ fields?.name }}</label>
    <div class="nixt-office-relation-group-input-wrapper">
      <div class="nixt-office-relation-input-wrapper">
        <div v-show="isLoading" class="nixt-office-relation-skeleton-wrapper">
          <div class="nixt-office-relation-skeleton">
            <div class="nixt-office-relation-content"></div>
          </div>
        </div>
        <VueSelect
          v-model="modelValue"
          class="nixt-relation-control"
          :options="options"
          :reduce="(data: any) => data.id"
          :label="fields?.relation?.display"
          placeholder="Pilih..."
          :disabled="isDisabled"
          @open="onOpen"
        >
          <template #option="option">
            <span>{{ option[fields.relation!.display] }}</span>
          </template>
        </VueSelect>
      </div>
    </div>
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

.nixt-office-relation-group-input-wrapper {
  @apply flex items-center justify-center gap-1.5;
}

.nixt-office-relation-input-wrapper {
  @apply relative mt-1.5 flex-1;
}

.nixt-office-relation-skeleton-wrapper {
  @apply absolute z-10 w-full bg-white;
}

.nixt-office-relation-skeleton {
  @apply flex items-center justify-center w-full px-2 py-1 bg-white border-2 border-gray-300 rounded-lg animate-pulse outline-gray-500 disabled:bg-gray-100 h-9;
}

.nixt-office-relation-content {
  @apply w-full p-2 bg-gray-200 rounded;
}

.danger-alert {
  @apply mt-1 px-1.5 text-sm text-red-600;
}

.nixt-relation-control {
  @apply rounded-lg px-2 border-2 text-black outline-none;
  --vs-controls-color: #a1a1aa;
  --vs-border-color: default;
  --vs-dropdown-option--active-bg: #f4f4f5;
  --vs-dropdown-option--active-color: #2f2d38;
  --vs-search-input-placeholder-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
</style>
