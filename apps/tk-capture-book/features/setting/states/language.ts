import { atomWithAsyncStorage } from "@/lib/jotai-storage";

export type Language = "en" | "ko";

// 'app-language'는 AsyncStorage에 저장될 키 이름입니다
export const languageAtom = atomWithAsyncStorage<Language>("app-language", "en");
