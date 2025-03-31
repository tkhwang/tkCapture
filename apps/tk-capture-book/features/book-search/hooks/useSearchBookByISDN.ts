import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { BOOK_CACHE_TIME } from "@/consts/appConsts";
import { searchBooks } from "@/features/book-search/api/search-books";
import { Book } from "@/features/book-search/models/book";
import { BookSearchProviderAtom } from "@/features/book-search/states/book";

export function useSearchBookByISDN(isbn: string) {
  const provider = useAtomValue(BookSearchProviderAtom);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["book", provider, isbn],
    queryFn: async () => {
      // First try to get from cache
      const cachedBook = queryClient.getQueryData<Book>(["book", provider, isbn]);

      // If found in cache, return it immediately without fetching
      if (cachedBook) {
        return cachedBook;
      }

      // If not in cache, then fetch it
      const results = await searchBooks(provider, { query: isbn });
      const book = results.items.find((b: Book) => b.isbn === isbn);

      if (!book) {
        throw new Error(`Book with ISBN ${isbn} not found`);
      }

      return book;
    },
    staleTime: BOOK_CACHE_TIME,
  });
}
