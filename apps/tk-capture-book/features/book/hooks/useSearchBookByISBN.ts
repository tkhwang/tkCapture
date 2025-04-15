import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { Book } from "@/features/book/models/book";
import { BookSearchProviderAtom } from "@/features/book/states/book";

export function useSearchBookByISBN(isbn: string) {
  const provider = useAtomValue(BookSearchProviderAtom);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["book", provider, isbn],
    queryFn: () => Promise.resolve(null),
    enabled: false,
    initialData: () => queryClient.getQueryData<Book>(["book", provider, isbn]),
    // staleTime: BOOK_DETAIL_QUERY_CACHE_TIME,
  });
}
