import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { BookChat } from "@/features/book/components/book-chat";
import { useBook } from "@/features/book/hooks/useBook";
import { useAuth } from "@/providers/auth-provider";

export default function BookChatScreen() {
  const params = useLocalSearchParams<{ id: string; isbn: string }>();
  const { user } = useAuth();
  const { book, loading, error } = useBook(user?.id, params.isbn);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <Card className="p-6">
          <CardContent className="items-center">
            <Ionicons name="hourglass-outline" size={48} color="hsl(var(--muted-foreground))" />
            <Text variant="title" className="mt-4">
              Loading...
            </Text>
          </CardContent>
        </Card>
      </View>
    );
  }

  if (error || !book) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <Card className="p-6">
          <CardContent className="items-center">
            <Ionicons name="alert-circle-outline" size={48} color="hsl(var(--muted-foreground))" />
            <Text variant="title" className="mt-4">
              Book not found
            </Text>
          </CardContent>
        </Card>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <BookChat book={book} user={user} />
    </View>
  );
}
