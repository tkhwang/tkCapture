import { RefreshControl, ScrollView, View, ActivityIndicator } from "react-native";

import { useAtomValue } from "jotai";

import { BookSearchItemView } from "@/features/book/components/search/book-search-item";
import { BookSearchProviderAtom } from "@/features/book/states/book";
import { BookSearchItem } from "@/features/book/types/book-search-interface";

interface BookSearchResultProps {
  allBooks: BookSearchItem[];
  refreshing: boolean;
  onRefresh: () => void;
  handleLoadMore: () => void;
  isFetchingNextPage: boolean;
  handleBookPress: (book: BookSearchItem) => void;
}

export function BookSearchResult({
  allBooks,
  refreshing,
  onRefresh,
  handleLoadMore,
  isFetchingNextPage,
  handleBookPress,
}: BookSearchResultProps) {
  const bookSearchProvider = useAtomValue(BookSearchProviderAtom);

  return (
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
  );
}
