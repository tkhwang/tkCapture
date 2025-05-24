import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Book } from "@/features/book/types/book";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import { Database } from "@/types/types_db";

type BookStatus = Database["public"]["Enums"]["book_status"];

interface UpdateBookStatusParams {
  bookId: string;
  newStatus: BookStatus;
}

/**
 * Hook for updating a book's status
 */
export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const userId = user?.id;

  type Context = {
    previousBooks: Book[];
    previousBook: Book;
  };

  return useMutation<void, Error, UpdateBookStatusParams, Context>({
    mutationFn: async ({ bookId, newStatus }: UpdateBookStatusParams) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("books")
        .update({ book_status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", bookId)
        .eq("owner_id", user.id);

      if (error) throw error;

      console.log(`[+][useUpdateBook]: book status is changed to ${newStatus}.`);
    },
    onMutate: async ({ bookId, newStatus }) => {
      const previousBook = queryClient.getQueryData([userId, "book", bookId]) as Book;
      const previousBooks = queryClient.getQueryData([userId, "books"]) as Book[];

      const updatedBook = {
        ...previousBook,
        book_status: newStatus,
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData([userId, "book", bookId], updatedBook);
      queryClient.setQueryData([userId, "books"], (old: Book[] | undefined) => {
        if (!old) return old;
        return old.map((book: Book) => (book.id === bookId ? updatedBook : book));
      });

      return { previousBooks, previousBook };
    },
    onError: (err, variables, context) => {
      if (context?.previousBooks) {
        queryClient.setQueryData([userId, "books"], context.previousBooks);
      }
      if (context?.previousBook) {
        queryClient.setQueryData([userId, "book", variables.bookId], context.previousBook);
      }
      console.error("Error updating book status:", err);
    },
  });
};
