import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

export const useBook = (userId?: string, isbn?: string) => {
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

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", userId)
        .eq("isbn", isbn)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    enabled: !!userId && !!isbn,
  });

  return {
    book,
    loading,
    error,
  };
};
