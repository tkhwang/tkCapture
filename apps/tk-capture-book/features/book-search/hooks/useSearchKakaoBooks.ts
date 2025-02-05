import { useQuery } from "@tanstack/react-query";

import { searchKakaoBooks } from "@/features/book-search/api/search-kakao-books";
import { KakaoBookSearchParams } from "@/features/book-search/types/kakao-book";

export function useSearchKakaoBooks(params: KakaoBookSearchParams) {
  return useQuery({
    queryKey: ["kakao-api", "books", params],
    queryFn: () => searchKakaoBooks(params),
    enabled: !!params.query, // 검색어가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}
