import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { useDebounce } from "use-debounce";

import { KakaoSearchResult } from "@/components/KakaoSearchResult";
import { useSearchKakaoBooks } from "@/hooks/useSearchKakaoBooks";

export default function SearchKakaoScreen() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const { data, isLoading, error } = useSearchKakaoBooks({
    query: debouncedSearchText,
    size: 20,
    sort: "accuracy", // accuracy (정확도순) or latest (발간일순)
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

      <KakaoSearchResult data={data} />
    </View>
  );
}
