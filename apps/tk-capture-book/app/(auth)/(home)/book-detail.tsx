import { useState, useEffect } from "react";

import { View, ScrollView } from "react-native";

import { useSetAtom } from "jotai";

import { useLocalSearchParams } from "expo-router";

import { Text } from "@/components/ui/text";
import { BookDetailEdit } from "@/features/book/components/detail/book-detail-edit";
import { BookDetailHeader } from "@/features/book/components/detail/book-detail-header";
import { BookDetailNavigation } from "@/features/book/components/detail/book-detail-navigation";
import { useUpdateBook } from "@/features/book/hooks/mutations/useUpdateBook";
import { useBook } from "@/features/book/hooks/queries/useBook";
import { selectedBookAtom } from "@/features/book/states/book";
import { BookStatus } from "@/features/book/types/book";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { book, loading } = useBook(id);
  const { mutate: updateBook, isPending: updating } = useUpdateBook();

  const [expanded, setExpanded] = useState(true);

  const setSelectedBook = useSetAtom(selectedBookAtom);

  useEffect(() => {
    if (book) {
      setSelectedBook(book);
    }
    return () => {
      setSelectedBook(null);
    };
  }, [book, setSelectedBook]);

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

      <BookDetailEdit loading={updating} book={book} onUpdateStatus={updateBookStatus} />

      <BookDetailNavigation bookId={book.id} bookIsbn={book.isbn} />
    </ScrollView>
  );
}
