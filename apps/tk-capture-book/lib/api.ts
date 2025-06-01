import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);
