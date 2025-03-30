// Parse and validate environment variables

import { z } from "zod";

// Define the environment schema
const envSchema = z.object({
  // Auth & API Keys
  EXPO_PUBLIC_SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: z.string().min(1, "GOOGLE_WEB_CLIENT_ID is required"),
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: z.string().min(1, "GOOGLE_IOS_CLIENT_ID is required"),
  EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY: z.string().min(1, "GOOGLE_CLOUD_API_KEY is required"),
  EXPO_PUBLIC_NAVER_CLIENT_ID: z.string().min(1, "NAVER_CLIENT_ID is required"),
  EXPO_PUBLIC_NAVER_CLIENT_SECRET: z.string().min(1, "NAVER_CLIENT_SECRET is required"),
  EXPO_PUBLIC_KAKAO_REST_API_KEY: z.string().min(1, "KAKAO_REST_API_KEY is required"),
});

// Type for the validated environment
type EnvSchema = z.infer<typeof envSchema>;

export function validateAndLoadEnv(): EnvSchema {
  try {
    const result = envSchema.parse(process.env);

    // Log successful validation
    Object.entries(result).forEach(([key, value]) => {
      if (key.startsWith("EXPO_PUBLIC_")) {
        const shortKey = key.replace("EXPO_PUBLIC_", "");
        console.log(`[+][const] ${shortKey}: ${value}`);
      }
    });

    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((e) => e.message).join(", ");
      throw new Error(`Environment validation failed: ${missingVars}`);
    }
    throw new Error("Failed to validate environment variables");
  }
}
