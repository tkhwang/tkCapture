import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useBook } from "@/features/book-search/hooks/useBook";
import { useAuth } from "@/providers/auth-provider";

export default function BookDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; isbn: string }>();
  const { user } = useAuth();
  const { book, loading, error } = useBook(user?.id, params.isbn);

  const handleCaptureSentence = () => {
    if (book) {
      router.push({
        pathname: "/(auth)/camera",
      });
    }
  };

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
      <ScrollView className="flex-1 pb-20">
        <Card className="mx-4 mb-4 overflow-hidden">
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

      {/* Bottom Capture Sentence Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card border-border">
        <Button
          onPress={handleCaptureSentence}
          variant="default"
          className="flex-row items-center justify-center w-full h-12"
        >
          <Ionicons name="camera-outline" size={20} color="white" style={{ marginRight: 8 }} />
          <Text className="text-base font-medium text-white">Capture Sentence</Text>
        </Button>
      </View>
    </View>
  );
}
