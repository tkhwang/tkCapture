import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";

import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useBook } from "@/features/book-search/hooks/useBook";
import { useAuth } from "@/providers/auth-provider";

export default function BookDetailScreen() {
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
    <ScrollView className="flex-1 p-4 bg-background">
      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-4">
          <View className="flex-row">
            {book.thumbnail ? (
              <Image
                source={{ uri: book.thumbnail }}
                className="w-32 mr-4 rounded-md shadow h-44"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center justify-center w-32 mr-4 rounded-md h-44 bg-muted">
                <Ionicons name="image-outline" size={32} color="hsl(var(--muted-foreground))" />
                <Text variant="muted" size="sm" className="mt-2">
                  No Image
                </Text>
              </View>
            )}
            <View className="flex-1">
              <Text variant="title" size="xl" className="mb-2" numberOfLines={2}>
                {book.title}
              </Text>
              <View className="flex-row items-center mb-1">
                <View className="w-1 h-1 mr-1 rounded-full bg-primary" />
                <Text variant="default">{book.author}</Text>
              </View>
              <View className="flex-row items-center mb-1">
                <View className="w-1 h-1 mr-1 rounded-full bg-primary" />
                <Text variant="muted">{book.publisher}</Text>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
