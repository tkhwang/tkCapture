import { Image, Pressable, Text, View } from "react-native";

import { BookSearchItem } from "../types/book-search-interface";

interface BookSearchItemProps {
  book: BookSearchItem;
  onPress?: (book: BookSearchItem) => void;
}

export function BookSearchItemView({ book, onPress }: BookSearchItemProps) {
  return (
    <Pressable className="w-1/3 p-2" onPress={() => onPress?.(book as BookSearchItem)}>
      <View className="overflow-hidden">
        {/* 이미지 */}
        <View className="w-full aspect-[3/4] mb-2 bg-gray-50 border border-gray-200 rounded-md">
          {book.thumbnail ? (
            <View className="w-full h-full p-0">
              <Image
                source={{ uri: book.thumbnail }}
                className="w-full h-full rounded-md"
                resizeMode="contain"
                style={{ backgroundColor: "#F8FAFC" }}
              />
            </View>
          ) : (
            <View className="w-full h-full bg-gray-100 rounded-md" />
          )}
        </View>

        {/* 텍스트 정보 */}
        <View className="px-1">
          <Text className="text-sm font-bold text-gray-800" numberOfLines={2}>
            {book.title}
          </Text>
          <Text className="mt-1 text-xs text-gray-600" numberOfLines={1}>
            {book.author}
          </Text>
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {book.publisher}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
