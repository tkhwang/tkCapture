import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { useDebounce } from "use-debounce";

import { SEARCH_DEBOUNCE_MS, SEARCH_PAGE_SIZE } from "@/consts/appConsts";
import { BookSearchItemView } from "@/features/book-search/components/BookSearchItem";
import { SearchProviderSelector } from "@/features/book-search/components/SearchProviderSelector";
import { BookSearchProvider } from "@/features/book-search/factories/book-search-factory";
import { useSearchBooks } from "@/features/book-search/hooks/useSearchBooks";
import { BookSearchItem } from "@/features/book-search/types/book-search-interface";

export default function SearchBookScreen() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [provider, setProvider] = useState<BookSearchProvider>("naver");
  const [debouncedSearchText] = useDebounce(searchText, SEARCH_DEBOUNCE_MS);

  const { data, isLoading, error } = useSearchBooks(provider, {
    query: debouncedSearchText,
    page: 1,
    size: SEARCH_PAGE_SIZE,
    sort: "accuracy",
  });

  const handleBookPress = (book: BookSearchItem) => {
    router.push({
      pathname: "/(stack)/book-detail",
      params: { id: book.isbn },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <View className="gap-4 p-4 space-y-2">
        <View className="relative flex-row items-center">
          <TextInput
            className="flex-1 p-2 pr-8 border border-gray-300 rounded-lg"
            placeholder="검색어를 입력하세요"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <Pressable className="absolute right-2" onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </Pressable>
          )}
        </View>
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
      {/* TODO: it should be extracted to a component */}
      <ScrollView className="flex-1">
        {data?.items.map((book) => (
          <BookSearchItemView
            key={`${provider}-${book.isbn}`}
            book={book}
            onPress={handleBookPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}
