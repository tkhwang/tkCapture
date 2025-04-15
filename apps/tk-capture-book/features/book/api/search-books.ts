import { createBookSearchAdapter } from "@/features/book/factories/book-search-factory";
import { BookSearchParams, BookSearchProvider } from "@/features/book/types/book-search-interface";

export async function searchBooks(
  bookSearchProvider: BookSearchProvider,
  params: BookSearchParams,
) {
  const bookSearchAdapter = createBookSearchAdapter(bookSearchProvider);
  return bookSearchAdapter.search(params);
}
