import { Image, ScrollView, Text, View } from "react-native";

import { NaverBookResponse } from "@/features/book-search/types/naver-book";

interface NaverSearchResultProps {
  data: NaverBookResponse | undefined;
}

export function NaverSearchResult({ data }: NaverSearchResultProps) {
  if (!data?.items?.length) {
    return null;
  }

  return (
    <ScrollView className="flex-1">
      {data?.items.map((book) => (
        <View key={book.isbn} className="p-4 border-b border-gray-200">
          <View className="flex-row">
            {book.image && (
              <View className="w-16 h-24 mr-4">
                <Image
                  source={{ uri: book.image }}
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-md"
                  resizeMode="contain"
                />
              </View>
            )}
            <View className="flex-1">
              <Text className="text-lg font-bold" numberOfLines={2}>
                {book.title}
              </Text>
              <Text className="mt-1 text-gray-600">{book.author}</Text>
              <Text className="mt-1 text-gray-500">{book.publisher}</Text>
              <Text className="mt-1 text-gray-500">
                {book.discount ? `${book.discount}원` : "가격정보 없음"}
              </Text>
            </View>
          </View>
          <Text className="mt-2 text-gray-600" numberOfLines={2}>
            {book.description}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
