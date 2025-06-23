<script setup lang="ts">
import { useAuthStore } from "@/composable/stores";
import { apiIdentitas } from "@/config";
import { NixtToast } from "@/utils";
import { z } from "zod";

const auth = useAuthStore();

const values = ref({ old_password: "", new_password: "" });
const errors = ref();
const fields = {
  old_password: {
    handle: "old_password",
    name: "Password Lama",
    input: "password",
    options: {},
  },
  new_password: {
    handle: "new_password",
    name: "Password Baru",
    input: "password",
    options: {},
  },
};

const changePasswordValidation = z.object({
  old_password: z
    .string({ message: "Silahkan masukkan password lama" })
    .min(1, "Silahkan masukkan password lama"),
  new_password: z
    .string({ message: "Silahkan masukkan password baru" })
    .min(1, "Silahkan masukkan password baru"),
});

async function submitChangePassword() {
  await apiIdentitas
    .post("/auth/ubah-password", values.value)
    .then((response) => response.data)
    .then((res) => {
      if (res.code == 200) {
        NixtToast(res.message, "success");
        navigateTo("/akun");
      }
    })
    .catch((error) => {
      console.log("Error :", error?.response.data);
      NixtToast(error?.response?.data?.message, "danger");
    });
}

async function handleChangePassword() {
  try {
    errors.value = {};
    changePasswordValidation.parse(values.value);

    await submitChangePassword();
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
  <div class="h-full relative flex flex-col">
    <div v-if="auth.isLogin" class="flex flex-col">
      <div class="p-2.5">
        <NuxtLink to="/akun">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </NuxtLink>
        <form>
          <div class="flex flex-col gap-2.5 mt-2.5">
            <NixtField
              v-model="values.old_password"
              :fields="fields.old_password"
              :error="errors?.old_password"
            />
            <NixtField
              v-model="values.new_password"
              :fields="fields.new_password"
              :error="errors?.new_password"
            />
            <div class="mt-2">
              <NixtButton
                label="Ubah"
                color="success"
                @click="handleChangePassword"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <AuthPage
      v-else
      icon="fa-solid fa-user-large-slash"
      title="Identitas Kamu"
      description="Yuk masuk dengan akun identitas kamu"
    />
  </div>
</template>

<style scoped>
.profile-btn {
  @apply border border-primary px-3.5 py-2.5 rounded-lg text-sm flex justify-center items-center w-full text-primary duration-150 hover:bg-primary hover:text-green-100;
}
</style>
