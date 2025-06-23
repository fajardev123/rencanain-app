<script setup lang="ts">
import { AuthModel } from "@/packages/models";
import { useAuthStore } from "@/composable/stores";
import { z } from "zod";

const emit = defineEmits(["action:daftar"]);
const auth = useAuthStore();
const { values } = storeToRefs(auth);

const fields = AuthModel.single.fields;
const errors = ref();

const loginValidation = z.object({
  username: z
    .string({ message: "Silahkan masukkan username" })
    .min(1, "Silahkan masukkan username"),
  password: z
    .string({ message: "Silahkan masukkan password" })
    .min(1, "Silahkan masukkan password"),
});

async function handleLogin() {
  try {
    errors.value = {};
    loginValidation.parse(values.value);

    await auth.login();
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
      <div class="text-xl">Masuk</div>
      <div>Yuk masuk dengan akun identitas kamu</div>
    </div>
    <form>
      <div class="flex flex-col gap-2.5">
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
        <NixtButton type="submit" label="Masuk" @click="handleLogin" />
      </div>
    </form>
    <div class="flex justify-center items-center gap-1">
      Belum punya akun ?
      <button
        type="button"
        class="underline font-filson-bold"
        @click="$emit('action:daftar')"
      >
        Daftar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
