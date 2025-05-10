import { useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import { Database } from "@/types/types_db";

type Book = Database["public"]["Tables"]["books"]["Row"];

export function useBook(bookId: string) {
  const { user } = useAuth();
  const userId = user?.id;

  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: [userId, "book", bookId],
    queryFn: async () => {
      const cachedData = queryClient.getQueryData<Book>(["book", userId, bookId]);
      if (cachedData) {
        console.log(`[+][useBook] Using cached book data for bookId: ${bookId}`);
        return cachedData;
      }

      // 캐시에 없으면 DB에서 조회
      console.log(`[+][useBook] Fetching book data from DB for bookId: ${bookId}`);
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("owner_id", userId)
        .eq("id", bookId)
        .single();

      if (error) {
        throw error;
      }

      // 결과를 캐시에 저장
      if (data) {
        queryClient.setQueryData(["book", userId, bookId], data);
        console.log(`[+][useBook] Cached book data for bookId: ${bookId}`);
      }

      return data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분
  });

  return {
    book,
    loading,
    error,
  };
}
