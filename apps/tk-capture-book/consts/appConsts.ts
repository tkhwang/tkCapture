/*
 *  APP NAME
 */
export const APP_NAME = "tkCaptureBook";

/*
 *  Environment variable
 */
// export const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
// if (!GOOGLE_CLIENT_ID) {
//   throw new Error("EXPO_PUBLIC_GOOGLE_CLIENT_ID is not set");
// } else {
//   console.log(`[+][const] GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}`);
// }

// export const GOOGLE_CLIENT_SECRET = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET;
// if (!GOOGLE_CLIENT_SECRET) {
//   throw new Error("EXPO_PUBLIC_GOOGLE_CLIENT_SECRET is not set");
// } else {
//   console.log(`[+][const] GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET}`);
// }

export const NAVER_CLIENT_ID = process.env.EXPO_PUBLIC_NAVER_CLIENT_ID;
if (!NAVER_CLIENT_ID) {
  throw new Error("EXPO_PUBLIC_NAVER_CLIENT_ID is not set");
} else {
  console.log(`[+][const] NAVER_CLIENT_ID: ${NAVER_CLIENT_ID}`);
}

export const NAVER_CLIENT_SECRET = process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET;
if (!NAVER_CLIENT_SECRET) {
  throw new Error("EXPO_PUBLIC_NAVER_CLIENT_SECRET is not set");
} else {
  console.log(`[+][const] NAVER_CLIENT_SECRET: ${NAVER_CLIENT_SECRET}`);
}

export const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
if (!KAKAO_REST_API_KEY) {
  throw new Error("EXPO_PUBLIC_KAKAO_REST_API_KEY is not set");
} else {
  console.log(`[+][const] KAKAO_REST_API_KEY: ${KAKAO_REST_API_KEY}`);
}

export const GOOGLE_CLOUD_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY;
if (!GOOGLE_CLOUD_API_KEY) {
  throw new Error("EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY is not set");
} else {
  console.log(`[+][const] GOOGLE_CLOUD_API_KEY: ${GOOGLE_CLOUD_API_KEY}`);
}

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
if (!SUPABASE_URL) {
  throw new Error("EXPO_PUBLIC_SUPABASE_URL is not set");
} else {
  console.log(`[+][const] SUPABASE_URL: ${SUPABASE_URL}`);
}

export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_ANON_KEY) {
  throw new Error("EXPO_PUBLIC_SUPABASE_ANON_KEY is not set");
} else {
  console.log(`[+][const] SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY}`);
}

/*
 *  Application consts
 */
export const SEARCH_DEBOUNCE_MS = 500;
export const SEARCH_PAGE_SIZE = 20;

export const GOOGLE_CLOUD_VISION_API_URL = "https://vision.googleapis.com/v1/images:annotate";
