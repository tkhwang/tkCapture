import { ScrollView } from "react-native";

import { BookSearchItem } from "../../types/book-search-interface";

import { BookSearchItemView } from "./book-search-item";

interface BookSearchListProps {
  items: BookSearchItem[];
}

export function BookSearchList({ items }: BookSearchListProps) {
  return (
    <ScrollView className="flex-1">
      {items.map((book) => (
        <BookSearchItemView key={book.isbn} book={book} />
      ))}
    </ScrollView>
  );
}
