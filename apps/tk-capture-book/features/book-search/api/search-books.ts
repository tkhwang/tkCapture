import { createBookSearchAdapter } from "@/features/book-search/factories/book-search-factory";
import {
  BookSearchParams,
  BookSearchProvider,
} from "@/features/book-search/types/book-search-interface";

export async function searchBooks(
  bookSearchProvider: BookSearchProvider,
  params: BookSearchParams,
) {
  const bookSearchAdapter = createBookSearchAdapter(bookSearchProvider);
  return bookSearchAdapter.search(params);
}
