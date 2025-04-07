import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";
import { Database } from "@/types/types_db";

type Book = Database["public"]["Tables"]["books"]["Row"];

export function useBooks(userId?: string) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchBooks() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("ownerId", userId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error(`[-][useBooks] Error fetching books: ${JSON.stringify(error)}`);
          setBooks([]);
          return;
        }

        setBooks(data ?? []);
        console.log(`[+][useBooks] Fetched ${data?.length} books`);
      } catch (error) {
        console.error(`[-][useBooks] Unexpected error: ${JSON.stringify(error)}`);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return { books, loading };
}
