export const AuthModel = {
  label: "Auth",
  definition: "lux:rencanain:auth",
  id: "id",
  info: {
    icon: "fa-solid fa-users",
    display: "nama",
  },
  excludes: [],
  includes: [],
  single: {
    fields: {
      nama: {
        handle: "nama",
        name: "Nama",
        input: "short-text",
        options: {
          note: "Nama dari user ini.",
        },
      },
      username: {
        handle: "username",
        name: "Username",
        input: "short-text",
        options: {
          note: "Username dari user ini.",
        },
      },
      password: {
        handle: "password",
        name: "Password",
        input: "password",
        options: {
          note: "Password dari user ini.",
        },
      },
      email: {
        handle: "email",
        name: "Email",
        input: "short-text",
        options: {
          note: "Email dari user ini.",
        },
      },
      telepon: {
        handle: "telepon",
        name: "Telepon",
        input: "short-text",
        options: {
          note: "Telepon dari user ini.",
        },
      },
    },
  },
};

export type UserSchema = {
  id: number;
  nama: string;
  username: string;
  password: string;
  email: string;
  telepon: string;
  id_peran: number;
  created_at: string;
  updated_at: string;
};

export type TRencanainUserModel = UserSchema;
