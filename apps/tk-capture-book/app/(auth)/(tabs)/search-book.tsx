import { Ionicons } from "@expo/vector-icons";
import { BookSearchInput } from "@/features/book/components/book-search-input";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  TextInput,
  ActivityIndicator,
  Pressable,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { useDebounce } from "use-debounce";

import { Card, CardContent } from "@/components/ui";
import { Text } from "@/components/ui/text";
import { SEARCH_DEBOUNCE_MS, SEARCH_PAGE_SIZE } from "@/consts/appConsts";
import { BookSearchItemView } from "@/features/book/components/book-search-item";
import { useSearchBooks } from "@/features/book/hooks/useSearchBooks";
import { BookSearchProviderAtom } from "@/features/book/states/book";
import { BookSearchItem } from "@/features/book/types/book-search-interface";

export default function SearchBookScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const bookSearchProvider = useAtomValue(BookSearchProviderAtom);
  const [debouncedSearchText] = useDebounce(searchText, SEARCH_DEBOUNCE_MS);

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useSearchBooks({
      query: debouncedSearchText,
      size: SEARCH_PAGE_SIZE,
      sort: "accuracy",
    });

  const handleBookPress = (book: BookSearchItem) => {
    router.push({
      pathname: "/(stack)/book-search-detail",
      params: { isbn: book.isbn },
    });
  };

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // 모든 페이지의 아이템을 하나의 배열로 합치기
  const allBooks = data?.pages.flatMap((page) => page.items) || [];

  // 검색 결과가 없는지 확인
  const hasNoResults = !isLoading && !error && allBooks.length === 0 && !debouncedSearchText;

  const renderNoSearchedBook = () => (
    <View className="absolute inset-0 flex items-center justify-center px-4">
      <Card className="items-center w-full max-w-sm p-8 bg-card/80">
        <CardContent className="items-center p-0">
          <Image
            source={require("../../../assets/images/woman-book-reading-green.png")}
            className="mb-8 w-72 h-72"
            resizeMode="contain"
          />
          <Text variant="heading" size="xl" className="mb-3 text-center">
            {t("search.search-no-result.title")}
          </Text>
          <Text variant="muted" className="text-center">
            {t("search.search-no-result.description")}
          </Text>
        </CardContent>
      </Card>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="gap-4 p-4 space-y-2">
        <BookSearchInput searchText={searchText} setSearchText={setSearchText} />
      </View>

      {isLoading && !isFetchingNextPage && (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" />
        </View>
      )}

      {error && (
        <View className="items-center justify-center flex-1">
          <Text className="text-red-500">검색 중 오류가 발생했습니다.</Text>
        </View>
      )}

      {hasNoResults && renderNoSearchedBook()}

      {/* 검색 결과 리스트 */}
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const paddingToBottom = 20;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        <View className="flex-row flex-wrap">
          {allBooks.map((book, index) => (
            <BookSearchItemView
              key={`${bookSearchProvider}-${book.isbn}-${index}`}
              book={book}
              onPress={handleBookPress}
            />
          ))}
        </View>

        {isFetchingNextPage && (
          <View className="items-center justify-center py-4">
            <ActivityIndicator size="small" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
