import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { View, ScrollView, ToastAndroid, Platform, Alert } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { BookDetailHeader } from "@/features/book/components/book-detail-header";
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
        showMessage("책 정보를 불러오는 데 실패했습니다.");
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
      showMessage(`책 상태가 ${getStatusLabel(newStatus)}(으)로 변경되었습니다.`);
    } catch (error) {
      console.error("Error updating book status:", error);
      showMessage("책 상태 변경에 실패했습니다.");
    } finally {
      setStatusLoading(false);
    }
  };

  // Show message (toast on Android, alert on iOS)
  const showMessage = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("알림", message);
    }
  };

  // Get Korean label for book status
  const getStatusLabel = (status: BookStatus): string => {
    switch (status) {
      case "unread":
        return "읽지 않음";
      case "in_progress":
        return "읽는 중";
      case "completed":
        return "완료";
      case "on_hold":
        return "보류";
      default:
        return "알 수 없음";
    }
  };

  // Navigate to book chat
  const goToBookChat = () => {
    if (book) {
      router.push({
        pathname: "/(auth)/(stack)/book-chat",
        params: {
          id: book.id,
          isbn: book.isbn,
        },
      });
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
      {/* Book Detail Header */}
      <BookDetailHeader
        book={simplifiedBook as any}
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />

      {/* Book Status */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <Text variant="title">읽기 상태: {getStatusLabel(book.book_status)}</Text>
        </CardHeader>
        <CardContent className="flex-row flex-wrap gap-2">
          <Button
            size="sm"
            variant={book.book_status === "unread" ? "default" : "outline"}
            disabled={statusLoading}
            onPress={() => updateBookStatus("unread")}
            className="flex-1 min-w-20"
          >
            읽지 않음
          </Button>
          <Button
            size="sm"
            variant={book.book_status === "in_progress" ? "default" : "outline"}
            disabled={statusLoading}
            onPress={() => updateBookStatus("in_progress")}
            className="flex-1 min-w-20"
          >
            읽는 중
          </Button>
          <Button
            size="sm"
            variant={book.book_status === "completed" ? "default" : "outline"}
            disabled={statusLoading}
            onPress={() => updateBookStatus("completed")}
            className="flex-1 min-w-20"
          >
            완료
          </Button>
          <Button
            size="sm"
            variant={book.book_status === "on_hold" ? "default" : "outline"}
            disabled={statusLoading}
            onPress={() => updateBookStatus("on_hold")}
            className="flex-1 min-w-20"
          >
            보류
          </Button>
        </CardContent>
      </Card>

      {/* Book Chat Button */}
      <Card className="mx-4 mb-6">
        <CardHeader>
          <Text variant="title">챕터 및 독서 노트</Text>
        </CardHeader>
        <CardContent>
          <Text className="mb-4">이 책에 대한 생각과 인상적인 구절을 기록해보세요.</Text>
          <Button size="lg" className="w-full" onPress={goToBookChat}>
            <Ionicons name="chatbubble-outline" size={20} className="mr-2" />
            <Text className="font-medium text-primary-foreground">북챗 시작하기</Text>
          </Button>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
