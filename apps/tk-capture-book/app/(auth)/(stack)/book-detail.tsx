import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import { Text } from "@/components/ui/text";
import { BookDetailHeader } from "@/features/book/components/book-detail-header";
import { BookDetailCapture } from "@/features/book/components/detail/book-detail-capture";
import { BookDetailChat } from "@/features/book/components/detail/book-detail-chat";
import { BookDetailStatus } from "@/features/book/components/detail/book-detail-status";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import { Database } from "@/types/types_db";

type BookStatus = Database["public"]["Enums"]["book_status"];

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [expanded, setExpanded] = useState(true);
  const [book, setBook] = useState<Database["public"]["Tables"]["books"]["Row"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  const { user } = useAuth();

  // Fetch book data
  useEffect(() => {
    async function fetchBook() {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase.from("books").select("*").eq("id", id).single();

        if (error) throw error;
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  // Update book status
  const updateBookStatus = async (newStatus: BookStatus) => {
    if (!book || !user) return;

    try {
      setStatusLoading(true);
      const { error } = await supabase
        .from("books")
        .update({ book_status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", book.id)
        .eq("owner_id", user.id);

      if (error) throw error;

      setBook({ ...book, book_status: newStatus });
      console.log(`[+][BookDetailScreen]: book status is changed to ${newStatus}.`);
    } catch (error) {
      console.error("Error updating book status:", error);
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>책 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  // Create a simplified book-like object with just the properties needed by BookDetailHeader
  const simplifiedBook = {
    title: book.title,
    author: book.author,
    thumbnail: book.thumbnail,
    publisher: book.publisher,
    isbn: book.isbn,
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <BookDetailHeader
        book={simplifiedBook as any}
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />

      <BookDetailStatus
        loading={statusLoading}
        status={book.book_status}
        onUpdateStatus={updateBookStatus}
      />

      <BookDetailChat bookId={book.id} bookIsbn={book.isbn} />

      <BookDetailCapture bookId={book.id} />
    </ScrollView>
  );
}
