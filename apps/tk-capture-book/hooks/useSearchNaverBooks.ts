import { searchNaverBooks } from "@/api/search-naver-books";
import { NaverBookSearchParams } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useSearchNaverBooks(params: NaverBookSearchParams) {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => searchNaverBooks(params),
    enabled: !!params.query, // 검색어가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}
