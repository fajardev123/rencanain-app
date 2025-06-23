<script setup lang="ts">
import { quickMenus } from "@/constants";
import { apiRencanain } from "@/config";
import { useAuthStore } from "@/composable/stores";
import { EffectCards } from "swiper/modules";

const auth = useAuthStore();
const transaksi = ref<Record<string, any>[]>([]);

const perhitungan = computed(() => {
  const column: string[] = [];
  const result: Array<{ id: number; nama: string }> = [];
  transaksi.value?.forEach((field) => {
    if (!column?.includes(field?.nama_akun_pembayaran)) {
      column.push(field?.nama_akun_pembayaran);
      result.push({
        id: field?.id_akun_pembayaran,
        nama: field?.nama_akun_pembayaran,
      });
    }
  });
  return result.sort((a, b) => a.id - b.id);
});

async function fetchTransaksi() {
  if (!auth.isLogin) return;

  await apiRencanain
    .get(`/api/transaksi`)
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

function hitungSaldo(id: number) {
  const data = transaksi.value
    .filter((field) => field?.id_akun_pembayaran == id)
    ?.map((field) => {
      return {
        tipe: field?.tipe,
        nominal: field?.nominal,
      };
    })
    .reduce((acc, curr) => {
      let hasil = 0;
      if (curr.tipe == "masuk") {
        hasil = acc + curr.nominal;
      } else {
        hasil = acc - curr.nominal;
      }

      return hasil;
    }, 0);

  return toFormatIDR(data);
}

function hitungPemasukkan(id: number) {
  const data = transaksi.value
    .filter(
      (field) => field?.id_akun_pembayaran == id && field?.tipe == "masuk"
    )
    ?.map((field) => field?.nominal)
    .reduce((acc, curr) => acc + curr, 0);

  return toFormatIDR(data);
}

function hitungPengeluaran(id: number) {
  const data = transaksi.value
    .filter(
      (field) => field?.id_akun_pembayaran == id && field?.tipe == "keluar"
    )
    ?.map((field) => field?.nominal)
    .reduce((acc, curr) => acc + curr, 0);

  return toFormatIDR(data);
}

onMounted(fetchTransaksi);
</script>

<template>
  <div class="h-full relative flex flex-col">
    <div class="h-[20dvh] bg-primary absolute top-0 w-full -z-10"></div>
    <div class="flex justify-around items-center px-3.5 mt-7">
      <template v-for="(menu, index) in quickMenus" :key="index">
        <NuxtLink
          :to="menu.to"
          class="h-full gap-1 text-white flex flex-col justify-end items-center"
        >
          <i :class="[menu.icon, 'text-2xl']"></i>
          <span class="text-xs">{{ menu.nama }}</span>
        </NuxtLink>
      </template>
    </div>
    <div class="px-3.5 mt-3.5 overflow-hidden">
      <template v-if="transaksi.length">
        <ClientOnly>
          <swiper-container
            :effect="'cards'"
            :grabCursor="true"
            :modules="[EffectCards]"
          >
            <swiper-slide v-for="(col, idx) in perhitungan" :key="idx">
              <CreditCard
                :label="col.nama"
                :saldo="hitungSaldo(col.id)"
                :masuk="hitungPemasukkan(col.id)"
                :keluar="hitungPengeluaran(col.id)"
              />
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </template>
      <template v-else>
        <CreditCard saldo="0" masuk="0" keluar="0" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.swiper-button-prev,
.swiper-button-next {
  width: 20px;
  height: 20px;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 14px;
}
</style>
