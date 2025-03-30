import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { useDebounce } from "use-debounce";

import { SEARCH_DEBOUNCE_MS, SEARCH_PAGE_SIZE } from "@/consts/appConsts";
import { BookSearchItemView } from "@/features/book-search/components/BookSearchItem";
import { useSearchBooks } from "@/features/book-search/hooks/useSearchBooks";
import { BookSearchProviderAtom } from "@/features/book-search/states/book";
import { BookSearchItem } from "@/features/book-search/types/book-search-interface";

export default function SearchBookScreen() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const { t } = useTranslation();

  const bookSearchProvider = useAtomValue(BookSearchProviderAtom);
  const [debouncedSearchText] = useDebounce(searchText, SEARCH_DEBOUNCE_MS);

  const { data, isLoading, error } = useSearchBooks({
    query: debouncedSearchText,
    page: 1,
    size: SEARCH_PAGE_SIZE,
    sort: "accuracy",
  });

  const handleBookPress = (book: BookSearchItem) => {
    router.push({
      pathname: "/(stack)/book-detail",
      params: { book: JSON.stringify(book) },
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

      {!isLoading && !error && (!data?.items || data.items.length === 0) && (
        <View className="absolute inset-0 flex items-center justify-center px-4">
          <View className="items-center">
            <Image
              source={require("../../../assets/images/woman-book-flying-green.png")}
              className="mb-8 w-72 h-72"
              resizeMode="contain"
            />
            <Text className="mb-3 text-xl font-medium text-gray-800">
              {t("search.search-no-result.title")}
            </Text>
            <Text className="text-base text-center text-gray-500">
              {t("search.search-no-result.description")}
            </Text>
          </View>
        </View>
      )}

      {/* 검색 결과 리스트 */}
      <ScrollView className="flex-1">
        <View className="flex-row flex-wrap">
          {data?.items.map((book) => (
            <BookSearchItemView
              key={`${bookSearchProvider}-${book.isbn}`}
              book={book}
              onPress={handleBookPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
