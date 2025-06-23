<script setup lang="ts">
import { useAuthStore } from "@/composable/stores";
import { apiRencanain } from "@/config";
import { toFormatIDR } from "@/utils";

const auth = useAuthStore();
const transaksi = ref<Record<string, any>[]>([]);

async function fetchTransaksi() {
  await apiRencanain
    .get(`/api/transaksi?limit=10&page=1`)
    .then((response) => response.data)
    .then((resp) => {
      if (resp.code == 200) {
        transaksi.value = resp.data;
      }
    })
    .catch((err) => {
      console.log(`Error fetch transaksi : `, err);
    });
}

onMounted(fetchTransaksi);
</script>

<template>
  <div class="h-full relative flex flex-col">
    <div v-if="auth.isLogin" class="h-full flex flex-col p-3.5 gap-2.5">
      <NixtLink to="/transaksi/new" label="Buat Transaksi" />
      <div class="text-sm">Riwayat 10 Transaksi Kamu</div>
      <div
        class="h-full flex-1 overflow-y-auto no-scrollbar bg-gray-100 rounded-lg"
      >
        <div
          v-for="(item, index) in transaksi"
          :class="[
            'flex border px-2.5 py-1.5 text-white rounded-lg justify-between items-center mb-1.5',
            item?.tipe == 'masuk' ? 'bg-green-600' : 'bg-red-600',
          ]"
          :key="index"
        >
          <div class="flex flex-col">
            <span class="text-sm">{{ item?.nama }}</span>
            <span class="text-xs"> {{ item?.nama_akun_pembayaran }}</span>
          </div>
          <div class="text-sm">
            {{ item?.tipe == "masuk" ? "+" : "-" }}
            {{ toFormatIDR(item?.nominal) }}
          </div>
        </div>
      </div>
    </div>
    <AuthPage
      v-else
      icon="fa-solid fa-cash-register"
      title="Transaksi"
      description="Kamu dapat mencatat transaksi keseharianmu dengan berbagai jenis pemasukan maupun pengeluaran"
      color="transparent"
    />
  </div>
</template>

<style scoped></style>
