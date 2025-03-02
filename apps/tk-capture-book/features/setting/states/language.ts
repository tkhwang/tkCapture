import { atom } from "jotai";

export type Language = "en" | "ko";

export const languageAtom = atom<Language>("en");
