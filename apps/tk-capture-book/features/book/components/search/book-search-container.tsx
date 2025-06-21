import { BookSearchItem } from "../../types/book-search-interface";
import { BookCollection } from "../collection/book-collection";

import { BookSearchEmpty } from "./book-search-empty";
import { BookSearchError } from "./book-search-error";
import { BookSearchLoading } from "./book-search-loading";
import { BookSearchResult } from "./book-search-result";

interface BookSearchContainerProps {
  isSearching: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: Error | null;
  hasNoResults: boolean;
  allBooks: BookSearchItem[];
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  handleLoadMore: () => void;
  handleBookPress: (book: BookSearchItem) => void;
}

export function BookSearchContainer({
  isSearching,
  isLoading,
  isFetchingNextPage,
  error,
  hasNoResults,
  allBooks,
  refreshing,
  onRefresh,
  handleLoadMore,
  handleBookPress,
}: BookSearchContainerProps) {
  if (!isSearching) {
    return <BookCollection />;
  }

  if (isLoading && !isFetchingNextPage) {
    return <BookSearchLoading />;
  }

  if (error) {
    return <BookSearchError error={error} />;
  }

  if (hasNoResults) {
    return <BookSearchEmpty />;
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
}
