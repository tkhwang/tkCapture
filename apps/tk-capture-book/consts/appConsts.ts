import { validateAndLoadEnv } from "@/utils/env";

/*
 *  APP NAME
 */
export const APP_NAME = "tkCaptureBook";

/*
 *  APP VERSION
 */
export const APP_VERSION = "1.21.1";
export const PLAYSTORE_VERSION = "21";
export const VERSION = `${APP_VERSION} (${PLAYSTORE_VERSION})`;

/*
 *  Environment variable
 */
const env = validateAndLoadEnv();

export const SUPABASE_URL = env.EXPO_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const GOOGLE_WEB_CLIENT_ID = env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
export const GOOGLE_IOS_CLIENT_ID = env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
export const GOOGLE_CLOUD_API_KEY = env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY;
export const NAVER_CLIENT_ID = env.EXPO_PUBLIC_NAVER_CLIENT_ID;
export const NAVER_CLIENT_SECRET = env.EXPO_PUBLIC_NAVER_CLIENT_SECRET;
export const KAKAO_REST_API_KEY = env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

/*
 *  Application consts
 */
export const SEARCH_DEBOUNCE_MS = 500;
export const SEARCH_PAGE_SIZE = 20;

export const GOOGLE_CLOUD_VISION_API_URL = "https://vision.googleapis.com/v1/images:annotate";
