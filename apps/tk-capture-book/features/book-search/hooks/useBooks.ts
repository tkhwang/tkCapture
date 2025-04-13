import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

export function useBooks(userId?: string) {
  const {
    data: books = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["books", userId],
    queryFn: async () => {
      if (!userId) return [];

      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("ownerId", userId)
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

  return { books, loading, error };
}
