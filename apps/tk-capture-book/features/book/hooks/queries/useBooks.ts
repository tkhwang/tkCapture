import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";

export function useBooks() {
  const { user } = useAuth();
  const userId = user?.id;

  const queryClient = useQueryClient();

  const {
    data: books = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: [userId, "books"],
    queryFn: async () => {
      if (!userId) return [];

      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("owner_id", userId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error(`[-][useBooks] Error fetching books: ${JSON.stringify(error)}`);
          throw new Error(error.message);
        }

        console.log(`[+][useBooks] Fetched ${data?.length} books`);
        return data ?? [];
      } catch (error) {
        console.error(`[-][useBooks] Unexpected error: ${JSON.stringify(error)}`);
        throw error;
      }
    },
    enabled: !!userId,
  });

  // 책 목록 데이터를 가져온 후 각 책을 ISBN 기준으로 캐시에 저장
  useEffect(() => {
    if (books && books.length > 0) {
      books.forEach((book) => {
        if (book.isbn) {
          // 각 책의 데이터를 ['book', userId, isbn] 키로 캐시에 저장
          queryClient.setQueryData([userId, "book", book.isbn], book);
          console.log(`[+][useBooks] Cached book with ISBN: ${book.isbn}`);
        }
      });
    }
  }, [books, queryClient, userId]);

  return { books, loading, error };
}
