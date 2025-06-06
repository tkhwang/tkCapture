import { atom } from "jotai";

import { Book } from "@/features/book/types/book";
import { BookSearchProvider } from "@/features/book/types/book-search-interface";

export const selectedBookAtom = atom<Book | null>(null);

export const BookSearchProviderAtom = atom<BookSearchProvider>("naver");
