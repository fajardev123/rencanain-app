export const quickMenus = [
  {
    icon: "fa-regular fa-square-plus",
    nama: "Isi Saldo",
    to: "/transaksi/new?tipe=masuk&id_kategori=1",
  },
  {
    icon: "fa-solid fa-arrow-up-from-bracket",
    nama: "Bayar",
    to: "/transaksi/new?tipe=keluar",
  },
  {
    icon: "fa-solid fa-utensils",
    nama: "Makan",
    to: "/transaksi/new?tipe=keluar&id_kategori=4",
  },
  {
    icon: "fa-solid fa-candy-cane",
    nama: "Jajan",
    to: "/transaksi/new?tipe=keluar&id_kategori=5",
  },
  {
    icon: "fa-solid fa-arrow-right-arrow-left",
    nama: "Koreksi",
    to: "/transaksi/new?id_kategori=7",
  },
];
