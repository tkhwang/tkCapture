import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { useDebounce } from "use-debounce";

import { SEARCH_DEBOUNCE_MS } from "@/consts/appConsts";
import { BookSearchList } from "@/features/book-search/components/BookSearchList";
import { useSearchBooks } from "@/features/book-search/hooks/useSearchBooks";

export default function SearchBookScreen() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, SEARCH_DEBOUNCE_MS);

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

      {/* 검색 결과 리스트 */}
      <BookSearchList items={data?.items ?? []} />
    </View>
  );
}
