import { useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { Database } from "@/types/types_db";

type Book = Database["public"]["Tables"]["books"]["Row"];

export const useBook = (userId?: string, isbn?: string) => {
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["book", userId, isbn],
    queryFn: async () => {
      if (!userId || !isbn) {
        return null;
      }

      // 먼저 캐시에서 데이터 확인
      const cachedData = queryClient.getQueryData<Book>(["book", userId, isbn]);
      if (cachedData) {
        console.log(`[+][useBook] Using cached book data for ISBN: ${isbn}`);
        return cachedData;
      }

      // 캐시에 없으면 DB에서 조회
      console.log(`[+][useBook] Fetching book data from DB for ISBN: ${isbn}`);
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("owner_id", userId)
        .eq("isbn", isbn)
        .single();

      console.log("TCL: useBook -> data", data);

      if (error) {
        throw error;
      }

      // 결과를 캐시에 저장
      if (data) {
        queryClient.setQueryData(["book", userId, isbn], data);
        console.log(`[+][useBook] Cached book data for ISBN: ${isbn}`);
      }

      return data;
    },
    enabled: !!userId && !!isbn,
    // 이미 캐시에서 처리하므로 staleTime을 길게 설정
    staleTime: 5 * 60 * 1000, // 5분
  });

  return {
    book,
    loading,
    error,
  };
};
