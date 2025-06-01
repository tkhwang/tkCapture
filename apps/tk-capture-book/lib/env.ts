import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_NAVER_CLIENT_ID: z.string(),
  EXPO_PUBLIC_NAVER_CLIENT_SECRET: z.string(),
  EXPO_PUBLIC_KAKAO_REST_API_KEY: z.string(),
  EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY: z.string(),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: z.string(),
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: z.string(),
});

export const env = envSchema.parse(process.env);
