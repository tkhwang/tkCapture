import { ActivityIndicator, View } from "react-native";

import { useRouter } from "expo-router";

import { BookCollection } from "@/features/book/components/collection/book-collection";
import { BookSearchContainer } from "@/features/book/components/search/book-search-container";
import { BookSearchInput } from "@/features/book/components/search/book-search-input";
import { useBooks } from "@/features/book/hooks/queries/useBooks";
import { useBookSearch } from "@/features/book/hooks/useBookSearch";
import { BookSearchItem } from "@/features/book/types/book-search-interface";

export default function HomeScreen() {
  const router = useRouter();
  const { loading } = useBooks();

  const handleBookPress = (book: BookSearchItem) => {
    router.push({
      pathname: "/book-search-detail",
      params: { isbn: book.isbn },
    });
  };

  const {
    searchText,
    setSearchText,
    isSearching,
    showSearchResults,
    allBooks,
    isLoading,
    error,
    hasNoResults,
    refreshing,
    isFetchingNextPage,
    handleLoadMore,
    handleRefresh,
  } = useBookSearch({ onBookPress: handleBookPress });

  const renderContent = () => {
    if (showSearchResults) {
      return (
        <BookSearchContainer
          isSearching={isSearching}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          error={error}
          hasNoResults={hasNoResults}
          allBooks={allBooks}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          handleLoadMore={handleLoadMore}
          handleBookPress={handleBookPress}
        />
      );
    }

    if (loading) {
      return <ActivityIndicator />;
    }

    return <BookCollection />;
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <BookSearchInput searchText={searchText} setSearchText={setSearchText} />
      </View>
      {renderContent()}
    </View>
  );
}
