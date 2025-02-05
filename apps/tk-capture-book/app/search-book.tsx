import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, Image, ScrollView } from "react-native";
import { useDebounce } from "use-debounce";

import { useSearchBooks } from "@/features/book-search/hooks/useSearchBooks";

export default function SearchBookScreen() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const { data, isLoading, error } = useSearchBooks("naver", {
    query: debouncedSearchText,
    page: 1,
    size: 20,
    sort: "accuracy",
  });

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <TextInput
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="검색어를 입력하세요"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {isLoading && (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" />
        </View>
      )}

      {error && (
        <View className="items-center justify-center flex-1">
          <Text className="text-red-500">검색 중 오류가 발생했습니다.</Text>
        </View>
      )}

      {/* TODO: it should be extracted to a component */}
      <ScrollView className="flex-1">
        {data?.items.map((book) => (
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
                {/* <Text className="mt-1 text-gray-500">
                  {book.discount ? `${book.discount}원` : "가격정보 없음"}
                </Text> */}
              </View>
            </View>
            <Text className="mt-2 text-gray-600" numberOfLines={2}>
              {book.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
