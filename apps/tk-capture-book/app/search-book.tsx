import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useDebounce } from "use-debounce";

import { SEARCH_DEBOUNCE_MS, SEARCH_PAGE_SIZE } from "@/consts/appConsts";
import { SearchProviderSelector } from "@/features/book-search/components/SearchProviderSelector";
import { BookSearchProvider } from "@/features/book-search/factories/book-search-factory";
import { useSearchBooks } from "@/features/book-search/hooks/useSearchBooks";

export default function SearchBookScreen() {
  const [searchText, setSearchText] = useState("");
  const [provider, setProvider] = useState<BookSearchProvider>("naver");
  const [debouncedSearchText] = useDebounce(searchText, SEARCH_DEBOUNCE_MS);

  const { data, isLoading, error } = useSearchBooks(provider, {
    query: debouncedSearchText,
    page: 1,
    size: SEARCH_PAGE_SIZE,
    sort: "accuracy",
  });

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

        <SearchProviderSelector provider={provider} onProviderChange={setProvider} />
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
