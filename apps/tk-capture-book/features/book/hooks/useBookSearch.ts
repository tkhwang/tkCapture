import { useState, useCallback, useMemo } from "react";

import { useDebounce } from "use-debounce";

import { SEARCH_DEBOUNCE_MS, SEARCH_PAGE_SIZE } from "@/consts/appConsts";

import { BookSearchItem } from "../types/book-search-interface";

import { useSearchBooks } from "./useSearchBooks";

interface UseBookSearchProps {
  onBookPress?: (book: BookSearchItem) => void;
}

export function useBookSearch({ onBookPress }: UseBookSearchProps = {}) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, SEARCH_DEBOUNCE_MS);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useSearchBooks({
      query: debouncedSearchText,
      size: SEARCH_PAGE_SIZE,
      sort: "accuracy",
    });

  const allBooks = useMemo(() => data?.pages.flatMap((page) => page.items) || [], [data]);

  const hasNoResults = useMemo(
    () => !isLoading && !error && allBooks.length === 0 && !!debouncedSearchText,
    [isLoading, error, allBooks.length, debouncedSearchText],
  );

  const isSearching = searchText.length > 0;
  const showSearchResults = isSearching || allBooks.length > 0;

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return {
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
    onBookPress,
  };
}
