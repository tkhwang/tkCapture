import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, ScrollView } from "react-native";

import { BookSearchItem } from "@/features/book-search/types/book-search-interface";

export default function BookDetailScreen() {
  const { book } = useLocalSearchParams();
  const bookData = JSON.parse(book as string) as BookSearchItem;

  return (
    <ScrollView className="flex-1 bg-white">
      {/* 상단 제목 및 기본 정보 */}
      <View className="p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold">{bookData.title}</Text>
        <Text className="mt-2 text-gray-600">
          {bookData.author} | {bookData.publisher}
        </Text>
      </View>

      {/* 책 표지 이미지 */}
      <View className="items-center justify-center py-8">
        {bookData.thumbnail && (
          <View className="w-48 shadow-lg h-72">
            <Image
              source={{ uri: bookData.thumbnail }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
        )}
      </View>

      {/* 세부 정보 */}
      <View className="p-4">
        <Text className="mb-2 text-lg font-semibold">도서 정보</Text>
        <Text className="leading-6 text-gray-600">{bookData.description}</Text>
      </View>
    </ScrollView>
  );
}
