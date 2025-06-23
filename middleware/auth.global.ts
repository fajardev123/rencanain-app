import { useAuthStore } from "@/composable/stores";

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useAuthStore();

  while (store.isLoading) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const publicPages: string[] = [
    "/",
    "/login",
    "/akun",
    "/transaksi",
    "/rekap",
  ];
  const isPublic = publicPages.includes(to.path);

  if (!isPublic && !store.token && !store.isLogin) {
    return navigateTo("/akun");
  }

  const requiredRoles = to.meta?.roles as string[] | undefined;
  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = store.user?.peran?.kode;
    if (!userRole || !requiredRoles.some((role) => userRole == role)) {
      return navigateTo("/unauthorized");
    }
  }
});
