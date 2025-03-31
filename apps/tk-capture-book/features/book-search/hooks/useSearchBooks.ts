import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { BOOK_LIST_QUERY_CACHE_TIME } from "@/consts/appConsts";
import { searchBooks } from "@/features/book-search/api/search-books";
import { Book } from "@/features/book-search/models/book";
import { BookSearchProviderAtom } from "@/features/book-search/states/book";
import { BookSearchParams } from "@/features/book-search/types/book-search-interface";

export function useSearchBooks(params: BookSearchParams) {
  const provider = useAtomValue(BookSearchProviderAtom);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["books", provider, params],
    queryFn: async () => {
      const results = await searchBooks(provider, params);

      results.items.forEach((book: Book) => {
        if (book.isbn) {
          queryClient.setQueryData(["book", provider, book.isbn], book);
        }
      });

      return results;
    },
    enabled: !!params.query,
    staleTime: BOOK_LIST_QUERY_CACHE_TIME,
  });
}
