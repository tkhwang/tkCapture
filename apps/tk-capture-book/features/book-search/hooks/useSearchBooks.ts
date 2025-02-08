import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { searchBooks } from "@/features/book-search/api/search-books";
import { BookSearchProviderAtom } from "@/features/book-search/states/book";
import { BookSearchParams } from "@/features/book-search/types/book-search-interface";

export function useSearchBooks(params: BookSearchParams) {
  const provider = useAtomValue(BookSearchProviderAtom);

  return useQuery({
    queryKey: [`${provider}-api`, "books", params],
    queryFn: () => searchBooks(provider, params),
    enabled: !!params.query, // 검색어가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}
