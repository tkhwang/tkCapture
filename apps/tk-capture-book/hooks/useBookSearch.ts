import { useQuery } from "@tanstack/react-query";
import { NaverBookSearchParams } from "../types/book";
import { searchBooks } from "../api/book";

export const useBookSearch = (params: NaverBookSearchParams) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => searchBooks(params),
    enabled: !!params.query, // 검색어가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
