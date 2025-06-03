import { BookSearchInput } from "@/features/book/components/book-search-input";
import { MyBooks } from "@/features/book/components/my-books";
import { useBooks } from "@/features/book/hooks/queries/useBooks";
import { useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const { books, loading, error } = useBooks();

  const [searchText, setSearchText] = useState("");

  if (!books || books.length === 0) return null;

  return <MyBooks />;
}
