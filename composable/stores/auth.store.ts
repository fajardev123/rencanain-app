import { defineStore } from "pinia";
import { ref } from "vue";
import { apiIdentitas } from "@/config";
import { NixtToast } from "@/utils";

export type TUserPayload = {
  id: number;
  nama: string;
  username: string;
  email: string;
  telepon: string;
  peranId: number;
  peran: {
    id: number;
    kode: string;
    nama: string;
  };
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<TUserPayload | null>();
  const token = useCookie("rencanain_luxtify", { path: "/" });
  const isLogin = ref(false);
  const isLoading = ref(true);
  const values = ref({
    nama: "",
    username: "",
    password: "",
    email: "",
    telepon: "",
  });

  function setAccessToken(accessToken: string) {
    token.value = accessToken;
  }

  async function register() {
    await apiIdentitas
      .post("/auth/register", values.value)
      .then((response) => response.data)
      .then((resp) => {
        if (resp.code == 200) {
          NixtToast("Identitas berhasil didaftarkan", "success");
          values.value = {
            nama: "",
            username: "",
            password: "",
            email: "",
            telepon: "",
          };
          navigateTo("/akun");
        }
      })
      .catch((err) => {
        console.log("Error registration :", err);
        NixtToast(err?.response?.data?.message, "danger");
      });
  }

  async function login() {
    try {
      const res = await apiIdentitas.post("/auth/login", values.value);
      const response = res.data;
      if (response.code == 200) {
        token.value = response.data.accessToken;
        await getInfo();
        navigateTo("/");
      }
    } catch (err) {
      NixtToast("Username atau password salah", "danger");
      console.log("Error fetch Data :", err);
    }
  }

  async function getInfo() {
    try {
      const res = await apiIdentitas.get("/auth/getInfo");
      const response = res.data;

      if (response.code == 200) {
        user.value = response.data;
        isLogin.value = true;
      }
    } catch (err) {
      isLogin.value = false;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    await apiIdentitas.post("/auth/logout");
    isLogin.value = false;
    user.value = null;
    token.value = null;
    values.value = {
      nama: "",
      username: "",
      password: "",
      email: "",
      telepon: "",
    };
  }

  return {
    values,
    user,
    token,
    isLogin,
    isLoading,
    login,
    getInfo,
    logout,
    setAccessToken,
    register,
  };
});
