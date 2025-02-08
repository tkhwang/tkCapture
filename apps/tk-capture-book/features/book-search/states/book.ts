import { atom } from "jotai";

import { BookSearchProvider } from "@/features/book-search/types/book-search-interface";

export const BookSearchProviderAtom = atom<BookSearchProvider>("naver");
