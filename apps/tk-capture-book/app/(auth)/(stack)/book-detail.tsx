import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useBook } from "@/features/book-search/hooks/useBook";
import { useAuth } from "@/providers/auth-provider";

export default function BookDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; isbn: string }>();
  const { user } = useAuth();
  const { book, loading, error } = useBook(user?.id, params.isbn);
  const [expanded, setExpanded] = useState(true);

  const handleCaptureSentence = () => {
    if (book) {
      router.push({
        pathname: "/(auth)/camera",
      });
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
      {/* Fixed Header with Book Info - Collapsible */}
      <Card className="mx-4 mb-4 overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <Pressable onPress={toggleExpanded} className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text variant="title" size="lg" numberOfLines={2}>
                {book.title}
              </Text>
              <Text variant="muted" size="sm" className="mt-1">
                {book.author}
              </Text>
            </View>
            <Ionicons
              name={expanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="hsl(var(--foreground))"
            />
          </Pressable>
        </CardHeader>

        {expanded && (
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
                <View className="flex-row items-center mb-1">
                  <View className="w-1 h-1 mr-1 rounded-full bg-primary" />
                  <Text variant="muted">출판사: {book.publisher}</Text>
                </View>
                <View className="flex-row items-center mb-1">
                  <View className="w-1 h-1 mr-1 rounded-full bg-primary" />
                  <Text variant="muted">ISBN: {book.isbn}</Text>
                </View>
              </View>
            </View>
          </CardContent>
        )}
      </Card>

      {/* Middle Chat Area - Scrollable */}
      <ScrollView className="flex-1 mx-4 mb-20" contentContainerStyle={{ paddingBottom: 16 }}>
        <Card className="mb-4">
          <CardHeader>
            <Text variant="title" size="base">
              Chat Area
            </Text>
          </CardHeader>
          <CardContent>
            <Text variant="muted">
              This is where the chat messages will appear. You can capture sentences from the book
              and discuss them here.
            </Text>
          </CardContent>
        </Card>

        {/* Example chat items - replace with actual chat data */}
        {[1, 2, 3].map((item) => (
          <Card key={item} className="mb-4">
            <CardContent className="p-4">
              <Text variant="muted" size="sm" className="mb-1">
                Captured Sentence {item}
              </Text>
              <Text>Example captured text from the book that can be discussed.</Text>
            </CardContent>
          </Card>
        ))}
      </ScrollView>

      {/* Bottom CTA Button - Fixed */}
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
