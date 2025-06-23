<script setup lang="ts">
import { useAuthStore } from "@/composable/stores";
import {
  TransaksiModel,
  type TRencanainTransaksiModel,
} from "@/packages/models";
import { z } from "zod";
import { apiRencanain } from "@/config";
import dayjs from "dayjs";

const route = useRoute();
const isNew = computed(() => route.params?.id == "new");
const auth = useAuthStore();

const fields = TransaksiModel.single.fields;
const errors = ref();
const values = ref<Partial<TRencanainTransaksiModel>>(
  {} as TRencanainTransaksiModel
) as Ref<Partial<TRencanainTransaksiModel>>;

const queryTransaksi = computed(() => {
  if (values.value.id_kategori != 7) return;
  return [
    {
      handle: "id",
      operator: "!=",
      value: values.value.id_akun_pembayaran_asal,
    },
  ];
});

const transaksiValidation = z.object({
  nama: z
    .string({ message: "Keterangan harus diisi" })
    .min(1, "Keterangan harus diisi"),
  tanggal_transaksi: z.date({
    invalid_type_error: "Tanggal harus diisi",
    message: "Tanggal harus diisi",
  }),
  tipe: z.string({ message: "Tipe harus diisi" }).min(1, "Tipe harus diisi"),
  id_akun_pembayaran: z
    .number({ message: "Akun pembayaran harus diisi" })
    .gt(0, "Akun pembayaran harus diisi"),
  id_kategori: z
    .number({ message: "Kategori harus diisi" })
    .gt(0, "Kategori harus diisi"),
  nominal: z
    .number({ message: "Nominal harus diisi" })
    .gt(0, "Kategori harus diisi"),
});

async function submitOne() {
  await apiRencanain
    .post("/api/transaksi", values.value)
    .then((response) => response.data)
    .then((res) => {
      if (res.code == 201) {
        NixtToast(res.message, "success");
        navigateTo("/transaksi");
      }
    })
    .catch((error) => {
      console.log("Error :", error?.response.data);
      NixtToast(error?.response?.data?.message, "danger");
    });
}

async function handleSave() {
  try {
    errors.value = {};
    transaksiValidation.parse(values.value);

    await submitOne();
  } catch (e) {
    if (e instanceof z.ZodError) {
      errors.value = Object.fromEntries(
        Object.entries(e.formErrors.fieldErrors).map(([key, messages]) => [
          key,
          messages?.[0] || "",
        ])
      );
    }
  }
}

function updateKategori() {
  delete values.value.id_akun_pembayaran_asal;
  delete values.value.id_akun_pembayaran;
  delete values.value.id_transaksi;
  delete values.value.nominal;
}

function updateTransaksi(val: TRencanainTransaksiModel) {
  delete values.value.id_akun_pembayaran;
  delete values.value.tipe;
  values.value.id_akun_pembayaran_asal = val?.id_akun_pembayaran ?? null;
  values.value.nominal = val?.nominal ?? 0;
  values.value.tipe = val.tipe;
  values.value.nama = `Koreksi ${val.nama}`;
}

watch(
  () => route.query,
  (query) => {
    if (!isNew.value) return;
    setTimeout(() => {
      values.value.tipe = query.tipe as string;
      if (query.id_kategori) {
        values.value.id_kategori = parseInt(query.id_kategori as string);
      }
    }, 500);
  },
  { immediate: true }
);

onMounted(() => {
  if (!isNew.value) return;
  values.value.tanggal_transaksi = dayjs().toDate();
});
</script>

<template>
  <div class="h-full relative flex flex-col">
    <div v-if="auth.isLogin">
      <div class="flex items-center bg-white sticky top-0 z-20 py-2">
        <NuxtLink to="/transaksi" class="flex w-fit mx-2">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </NuxtLink>
      </div>
      <form>
        <div class="flex flex-col gap-2.5 px-3.5">
          <NixtField
            v-model="values.tanggal_transaksi"
            :fields="fields.tanggal_transaksi"
            :error="errors?.tanggal_transaksi"
            :is-disabled="values.id_kategori == 7"
          />
          <NixtRelation
            v-model="values.id_kategori"
            :fields="fields.id_kategori"
            @update:selected="updateKategori"
            :error="errors?.id_kategori"
            :is-disabled="route.query.id_kategori == '7'"
          />
          <NixtRelation
            v-if="values.id_kategori == 7"
            v-model="values.id_transaksi"
            :fields="fields.id_transaksi"
            @update:selected="updateTransaksi"
            :error="errors?.id_transaksi"
          />
          <NixtRelation
            v-if="values.id_kategori == 7"
            v-model="values.id_akun_pembayaran_asal"
            :fields="fields.id_akun_pembayaran_asal"
            :error="errors?.id_akun_pembayaran_asal"
            is-disabled
          />
          <NixtRelation
            v-model="values.id_akun_pembayaran"
            :fields="fields.id_akun_pembayaran"
            :error="errors?.id_akun_pembayaran"
            :query="queryTransaksi"
          />
          <NixtField
            v-model="values.tipe"
            :fields="fields.tipe"
            :error="errors?.tipe"
            :is-disabled="values.id_kategori == 7"
          />
          <NixtField
            v-model="values.nominal"
            :fields="fields.nominal"
            :error="errors?.nominal"
            :is-disabled="values.id_kategori == 7"
          />
          <NixtField
            v-model="values.nama"
            :fields="fields.nama"
            :error="errors?.nama"
            :is-disabled="values.id_kategori == 7"
          />
          <div class="mt-5 sticky bottom-3 z-20">
            <NixtButton
              type="submit"
              label="Simpan"
              color="success"
              @click="handleSave"
            />
          </div>
        </div>
      </form>
    </div>
    <AuthPage
      v-else
      icon="fa-solid fa-cash-register"
      title="Transaksi"
      description="Kamu dapat mencatat transaksi keseharianmu dengan berbagai jenis pemasukan maupun pengeluaran"
    />
  </div>
</template>

<style scoped></style>
