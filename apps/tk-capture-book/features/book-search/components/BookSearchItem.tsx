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
            <View className="w-24 mr-4 aspect-[3/4]">
              <Image
                source={{ uri: book.thumbnail }}
                className="w-full h-full rounded-md"
                resizeMode="contain"
              />
            </View>
          )}
          <View className="justify-center flex-1">
            <Text className="text-base font-bold" numberOfLines={2}>
              {book.title}
            </Text>
            <Text className="mt-1 text-sm text-gray-600" numberOfLines={1}>
              {book.author}
            </Text>
            <Text className="text-sm text-gray-500" numberOfLines={1}>
              {book.publisher}
            </Text>
          </View>
        </View>
        <Text className="mt-2 text-gray-600" numberOfLines={2}>
          {book.description}
        </Text>
      </View>
    </Pressable>
  );
}
