import { useCallback, useState } from "react";

import { ActivityIndicator, Image, View } from "react-native";

import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";

import { useRouter } from "expo-router";

import { Card, CardContent } from "@/components/ui";
import { Text } from "@/components/ui/text";
import { SEARCH_DEBOUNCE_MS, SEARCH_PAGE_SIZE } from "@/consts/appConsts";
import { BookCollection } from "@/features/book/components/collection/book-collection";
import { BookSearchInput } from "@/features/book/components/search/book-search-input";
import { BookSearchResult } from "@/features/book/components/search/book-search-result";
import { useBooks } from "@/features/book/hooks/queries/useBooks";
import { useSearchBooks } from "@/features/book/hooks/useSearchBooks";
import { BookSearchItem } from "@/features/book/types/book-search-interface";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, SEARCH_DEBOUNCE_MS);

  const [refreshing, setRefreshing] = useState(false);

  const { books, loading, error } = useBooks();
  const {
    data,
    isLoading,
    error: searchError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useSearchBooks({
    query: debouncedSearchText,
    size: SEARCH_PAGE_SIZE,
    sort: "accuracy",
  });

  const allBooks = data?.pages.flatMap((page) => page.items) || [];
  const hasNoResults = !isLoading && !error && allBooks.length === 0 && debouncedSearchText;

  const NoSearchedBook = () => {
    return (
      <View className="absolute inset-0 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm items-center bg-card/80 p-8">
          <CardContent className="items-center p-0">
            <Image
              source={require("../../../assets/images/woman-book-reading-green.png")}
              className="mb-8 h-72 w-72"
              resizeMode="contain"
            />
            <Text className="mb-3 text-center text-xl font-bold">
              {t("search.search-no-result.title")}
            </Text>
            <Text className="text-center text-muted-foreground">
              {t("search.search-no-result.description")}
            </Text>
          </CardContent>
        </Card>
      </View>
    );
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

  const handleBookPress = (book: BookSearchItem) => {
    router.push({
      pathname: "/book-search-detail",
      params: { isbn: book.isbn },
    });
  };

  const SearchResult = () => {
    if (searchText.length === 0) return <BookCollection />;

    if (isLoading && !isFetchingNextPage) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (searchError) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">{t("error.search.message")}</Text>
        </View>
      );
    }

    if (hasNoResults) {
      return <NoSearchedBook />;
    }

    return (
      <BookSearchResult
        allBooks={allBooks}
        refreshing={refreshing}
        onRefresh={onRefresh}
        handleLoadMore={handleLoadMore}
        isFetchingNextPage={isFetchingNextPage}
        handleBookPress={handleBookPress}
      />
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <BookSearchInput searchText={searchText} setSearchText={setSearchText} />
      </View>
      {searchText.length > 0 || (books && books.length > 0) ? (
        <SearchResult />
      ) : loading ? (
        <ActivityIndicator />
      ) : (
        <BookCollection />
      )}
    </View>
  );
}
