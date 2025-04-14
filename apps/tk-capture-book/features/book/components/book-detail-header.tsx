import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Book } from "@/features/book/models/book";

interface BookDetailHeaderProps {
  book: Book;
  expanded: boolean;
  toggleExpanded: () => void;
}

export function BookDetailHeader({ book, expanded, toggleExpanded }: BookDetailHeaderProps) {
  return (
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
  );
}
