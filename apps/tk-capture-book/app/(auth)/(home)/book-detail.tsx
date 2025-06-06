import { useState } from "react";

import { View, ScrollView } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { Text } from "@/components/ui/text";
import { BookDetailCapture } from "@/features/book/components/detail/book-detail-capture";
import { BookDetailChat } from "@/features/book/components/detail/book-detail-chat";
import { BookDetailHeader } from "@/features/book/components/detail/book-detail-header";
import { BookDetailStatus } from "@/features/book/components/detail/book-detail-status";
import { useUpdateBook } from "@/features/book/hooks/mutations/useUpdateBook";
import { useBook } from "@/features/book/hooks/queries/useBook";
import { Database } from "@/types/types_db";

type BookStatus = Database["public"]["Enums"]["book_status"];

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { book, loading } = useBook(id);
  const { mutate: updateBook, isPending: updating } = useUpdateBook();

  const [expanded, setExpanded] = useState(true);

  const updateBookStatus = (newStatus: BookStatus) => {
    if (!book) return;

    updateBook({
      bookId: book.id,
      newStatus,
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>책 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <BookDetailHeader
        book={book}
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />

      <BookDetailStatus
        loading={updating}
        status={book.book_status}
        onUpdateStatus={updateBookStatus}
      />

      <BookDetailChat bookId={book.id} bookIsbn={book.isbn} />

      <BookDetailCapture bookId={book.id} />
    </ScrollView>
  );
}
