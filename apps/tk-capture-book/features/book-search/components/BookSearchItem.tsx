import { Image, Pressable, Text, View } from "react-native";

import { BookSearchItem } from "../types/book-search-interface";

interface BookSearchItemProps {
  book: BookSearchItem;
  onPress?: (book: BookSearchItem) => void;
}

export function BookSearchItemView({ book, onPress }: BookSearchItemProps) {
  return (
    <Pressable onPress={() => onPress?.(book as BookSearchItem)}>
      <View key={book.isbn} className="p-4 border-b border-gray-200">
        <View className="flex-row">
          {book.thumbnail && (
            <View className="w-20 mr-4 h-28">
              <Image
                source={{ uri: book.thumbnail }}
                className="w-full h-full rounded-md"
                resizeMode="cover"
              />
            </View>
          )}
          <View className="flex-1">
            <Text className="text-lg font-bold" numberOfLines={2}>
              {book.title}
            </Text>
            <Text className="mt-1 text-gray-600">{book.author}</Text>
            <Text className="mt-1 text-gray-500">{book.publisher}</Text>
          </View>
        </View>
        <Text className="mt-2 text-gray-600" numberOfLines={2}>
          {book.description}
        </Text>
      </View>
    </Pressable>
  );
}
