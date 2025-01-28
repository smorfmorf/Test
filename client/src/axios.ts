import axios, { AxiosInstance } from "axios";

// создаем экземпляр axios с базовой URL
const instance: AxiosInstance = axios.create({
   baseURL: import.meta.env.VITE_APP_SERVER,
});

// миддлваре, которая при каждом запросе будет отправлять Authorization с токеном
instance.interceptors.request.use((config: any) => {
   const token = window.localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export default instance;
