import { api } from "@/config";

export const TransaksiModel = {
  label: "Transaksi",
  definition: "lux:rencanain:transaksi",
  id: "id",
  info: {
    icon: "fa-solid fa-cash-register",
    display: "nama",
  },
  excludes: ["delete", "duplicate"],
  includes: [],
  filters: [],
  collection: {
    path: "/transaksi",
    columns: [
      {
        handle: "display_tanggal_transaksi",
        name: "Tanggal Transaksi",
      },
      {
        handle: "display_nominal",
        name: "Nominal",
      },
      {
        handle: "display_tipe",
        name: "Tipe",
      },
      {
        handle: "nama_akun_pembayaran",
        name: "Akun Pembayaran",
      },
      {
        handle: "nama_kategori",
        name: "Kategori",
      },
      {
        handle: "nama",
        name: "Keterangan",
      },
      {
        handle: "nama_user",
        name: "User",
      },
    ],
  },
  single: {
    path: "/transaksi",
    fields: {
      tanggal_transaksi: {
        handle: "tanggal_transaksi",
        name: "Tanggal Transaksi",
        input: "date",
        options: {
          note: "Tanggal transaksi dari transaksi ini.",
        },
      },
      nama: {
        handle: "nama",
        name: "Keterangan",
        input: "short-text",
        options: {
          note: "Keterangan dari transaksi ini.",
        },
      },
      nominal: {
        handle: "nominal",
        name: "Nominal",
        input: "float",
        options: {
          note: "Nominal dari transaksi ini.",
        },
      },
      tipe: {
        handle: "tipe",
        name: "Tipe",
        input: "select",
        options: {
          note: "Tipe dari transaksi ini.",
          display: "name",
          choices: [
            {
              name: "Masuk",
              value: "masuk",
            },
            {
              name: "Keluar",
              value: "keluar",
            },
          ],
        },
      },
      id_kategori: {
        handle: "id_kategori",
        name: "Kategori",
        input: "relation",
        options: {
          note: "Kategori dari transaksi ini.",
          isMultiple: false,
        },
        relation: {
          definition: "lux:rencanain:kategori",
          display: "nama",
          id: "id",
          api: api,
        },
      },
      id_akun_pembayaran: {
        handle: "id_akun_pembayaran",
        name: "Akun Pembayaran",
        input: "relation",
        options: {
          note: "Akun pembayaran dari transaksi ini.",
          isMultiple: false,
        },
        relation: {
          definition: "lux:rencanain:akunPembayaran",
          display: "nama",
          id: "id",
          api: api,
        },
      },
      id_user: {
        handle: "id_user",
        name: "User",
        input: "relation",
        options: {
          note: "User dari transaksi ini.",
          isMultiple: false,
        },
        relation: {
          definition: "lux:rencanain:user",
          display: "nama",
          id: "id",
          api: api,
        },
      },
      id_akun_pembayaran_asal: {
        handle: "id_akun_pembayaran_asal",
        name: "Akun Pembayaran Asal",
        input: "relation",
        options: {
          note: "Akun pembayaran asal dari transaksi ini.",
          isMultiple: false,
        },
        relation: {
          definition: "lux:rencanain:akunPembayaran",
          display: "nama",
          id: "id",
          api: api,
        },
      },
      id_transaksi: {
        handle: "id_transaksi",
        name: "Asal Transaksi",
        input: "relation",
        options: {
          note: "Asal transaksi dari transaksi ini.",
          isMultiple: false,
        },
        relation: {
          definition: "lux:rencanain:transaksi",
          display: "display",
          id: "id",
          api: api,
        },
      },
    },
  },
};

export type TransaksiSchema = {
  id: number;
  tanggal_transaksi: string | Date;
  nama: string;
  tipe: string;
  nominal: number;
  id_user: number;
  id_akun_pembayaran: number;
  nama_akun_pembayaran: string;
  id_kategori: number;
  id_akun_pembayaran_asal: number;
  id_transaksi: number;
  created_at: string;
  updated_at: string;
};

export type TRencanainTransaksiModel = TransaksiSchema;
