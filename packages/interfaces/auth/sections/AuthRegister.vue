<script setup lang="ts">
import { AuthModel } from "@/packages/models";
import { useAuthStore } from "@/composable/stores";
import { z } from "zod";

const emit = defineEmits(["action:masuk"]);
const auth = useAuthStore();

const fields = AuthModel.single.fields;
const errors = ref();
const { values } = storeToRefs(auth);

const registerValidation = z.object({
  nama: z
    .string({ message: "Silahkan masukkan nama" })
    .min(1, "Silahkan masukkan nama"),
  username: z
    .string({ message: "Silahkan masukkan username" })
    .min(5, "Username harus terdiri dari 5 huruf atau lebih"),
  password: z
    .string({ message: "Silahkan masukkan password" })
    .min(5, "Password harus terdiri dari 5 huruf atau lebih"),
});

async function handleRegister() {
  try {
    errors.value = {};
    registerValidation.parse(values.value);

    await auth.register();
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
</script>

<template>
  <div class="px-3.5 py-6 flex flex-col gap-2.5">
    <div class="flex flex-col justify-center items-center">
      <div class="text-xl">Daftar</div>
      <div>Yuk isi data identitas kamu untuk mendaftar</div>
    </div>
    <form>
      <div class="flex flex-col gap-2.5">
        <NixtField
          v-model="values.nama"
          :fields="fields.nama"
          :error="errors?.nama"
        />
        <NixtField
          v-model="values.username"
          :fields="fields.username"
          :error="errors?.username"
        />
        <NixtField
          v-model="values.password"
          :fields="fields.password"
          :error="errors?.password"
        />
        <NixtField
          v-model="values.email"
          :fields="fields.email"
          :error="errors?.email"
        />
        <NixtField
          v-model="values.telepon"
          :fields="fields.telepon"
          :error="errors?.telepon"
        />
        <NixtButton type="submit" label="Daftar" @click="handleRegister" />
      </div>
    </form>
    <div class="flex justify-center items-center gap-1">
      Sudah punya akun ?
      <button
        type="button"
        class="underline font-filson-bold"
        @click="$emit('action:masuk')"
      >
        Masuk
      </button>
    </div>
  </div>
</template>

<style scoped></style>
