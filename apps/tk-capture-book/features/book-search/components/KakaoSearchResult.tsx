import { Image, ScrollView, Text, View } from "react-native";

import { KakaoBookResponse } from "@/features/book-search/types/kakao-book";

interface KakaoSearchResultProps {
  data: KakaoBookResponse | undefined;
}

export function KakaoSearchResult({ data }: KakaoSearchResultProps) {
  if (!data?.documents?.length) {
    return null;
  }

  return (
    <ScrollView className="flex-1">
      {data.documents.map((book) => (
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
              <Text className="mt-1 text-gray-600">{book.authors.join(", ")}</Text>
              <Text className="mt-1 text-gray-500">{book.publisher}</Text>
              <Text className="mt-1 text-gray-500">
                {book.sale_price ? `${book.sale_price}원` : `${book.price}원`}
              </Text>
            </View>
          </View>
          <Text className="mt-2 text-gray-600" numberOfLines={2}>
            {book.contents}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
