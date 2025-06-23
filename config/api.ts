import axios, { type AxiosInstance } from "axios";
import {
  buildStorage,
  setupCache,
  type AxiosCacheInstance,
} from "axios-cache-interceptor";
import { clear, del, get, set } from "idb-keyval";
import { useAuthStore } from "@/composable/stores";

export type TApiClient = AxiosInstance | AxiosCacheInstance;

export const storage = buildStorage({
  async find(key: string) {
    const value = await get(key);
    return value ? JSON.parse(value as string) : null;
  },
  async set(key: string, value: any) {
    await set(key, JSON.stringify(value));
  },
  async remove(key: string) {
    await del(key);
  },
  async clear() {
    await clear();
  },
});

function addAuthInterceptors(instance: TApiClient) {
  instance.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const authStore = useAuthStore();
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh") &&
        !originalRequest.url.includes("/auth/login")
      ) {
        originalRequest._retry = true;
        try {
          const resp = await instance.post(
            "/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );
          authStore.setAccessToken(resp.data.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${resp.data.data.accessToken}`;
          return instance(originalRequest);
        } catch (error) {
          authStore.logout();
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
}

export const createApiClient = (
  baseURL: string,
  headers: Record<string, string>,
  isCache: boolean
): TApiClient => {
  const config = {
    baseURL,
    headers,
    withCredentials: true,
  };
  let instance;
  if (isCache) {
    instance = setupCache(axios.create(config), {
      storage: storage,
      ttl: 1000 * 60 * 5,
    });
  } else {
    instance = axios.create(config);
  }
  addAuthInterceptors(instance);
  return instance;
};

export const apiIdentitas = createApiClient(
  import.meta.env.VITE_API_IDENTITAS_API_URL,
  { "x-lux-key": import.meta.env.VITE_API_X_IDENTITAS_KEY },
  false
);

export const apiRencanain = createApiClient(
  import.meta.env.VITE_API_RENCANAIN_URL,
  { "x-lux-key": import.meta.env.VITE_API_RENCANAIN_TOKEN },
  false
);

export const api: Record<string, TApiClient> = {
  rencanain: apiRencanain,
};
