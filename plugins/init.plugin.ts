import { useAuthStore } from "@/composable/stores";

export default defineNuxtPlugin(async () => {
  console.log("initialized Application 🚀");

  const authStore = useAuthStore();

  if (!authStore.isLogin) {
    await authStore.getInfo();
  }
});
