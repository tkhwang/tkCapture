import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { useDebounce } from "use-debounce";

import { NaverSearchResult } from "@/components/NaverSearchResult";
import { useSearchNaverBooks } from "@/hooks/useSearchNaverBooks";

export default function SearchNaverScreen() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const { data, isLoading, error } = useSearchNaverBooks({
    query: debouncedSearchText,
    display: 20,
    sort: "sim",
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

      <NaverSearchResult data={data} />
    </View>
  );
}
