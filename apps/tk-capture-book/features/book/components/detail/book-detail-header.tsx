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
                className="mr-4 h-44 w-32 rounded-md shadow"
                resizeMode="cover"
              />
            ) : (
              <View className="mr-4 h-44 w-32 items-center justify-center rounded-md bg-muted">
                <Ionicons name="image-outline" size={32} color="hsl(var(--muted-foreground))" />
                <Text variant="muted" size="sm" className="mt-2">
                  No Image
                </Text>
              </View>
            )}
            <View className="flex-1">
              <View className="mb-1 flex-row items-center">
                <View className="mr-1 h-1 w-1 rounded-full bg-primary" />
                <Text variant="muted">출판사: {book.publisher}</Text>
              </View>
              <View className="mb-1 flex-row items-center">
                <View className="mr-1 h-1 w-1 rounded-full bg-primary" />
                <Text variant="muted">ISBN: {book.isbn}</Text>
              </View>
            </View>
          </View>
        </CardContent>
      )}
    </Card>
  );
}
