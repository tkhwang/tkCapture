import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { BOOK_LIST_QUERY_CACHE_TIME } from "@/consts/appConsts";
import { searchBooks } from "@/features/book/api/search-books";
import { BookSearchProviderAtom } from "@/features/book/states/book";
import { BookSearchItem, BookSearchParams } from "@/features/book/types/book-search-interface";

export function useSearchBooks(params: BookSearchParams) {
  const provider = useAtomValue(BookSearchProviderAtom);
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ["books", provider, params.query, params],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams = {
        ...params,
        page: pageParam,
      };

      const results = await searchBooks(provider, searchParams);

      results.items.forEach((book: BookSearchItem) => {
        if (book.isbn) {
          queryClient.setQueryData(["book", provider, book.isbn], book);
        }
      });

      return results;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있는지 확인
      const totalItems = lastPage.total;
      const currentPage = lastPage.page;
      const pageSize = params.size || 21;

      // 현재까지 로드된 아이템 수
      const loadedItems = currentPage * pageSize;

      // 더 로드할 아이템이 있으면 다음 페이지 번호 반환, 없으면 undefined
      return loadedItems < totalItems ? currentPage + 1 : undefined;
    },
    enabled: !!params.query,
    staleTime: BOOK_LIST_QUERY_CACHE_TIME,
  });
}
