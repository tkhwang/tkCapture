import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

import { useBooks } from "@/features/book-search/hooks/useBooks";
import { useSearchBookByISBN } from "@/features/book-search/hooks/useSearchBookByISBN";
import { Book } from "@/features/book-search/models/book";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";

export default function BookSearchDetailScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isbn } = useLocalSearchParams();

  const { user } = useAuth();
  const { data: selectedBook } = useSearchBookByISBN(isbn as string);
  const { books } = useBooks(user?.id);

  const isbnsOfMyBooks = useMemo(() => books.map((book) => book.isbn), [books]);
  const isMyRegisteredBook = useMemo(
    () => isbnsOfMyBooks.includes(isbn as string),
    [isbnsOfMyBooks, isbn],
  );

  const handleRegisterBook = async (searchedBook: Book) => {
    if (!user) return;
    if (!searchedBook) return;

    try {
      const newBookDB = searchedBook.toDatabase(user.id);

      const { data, error } = await supabase.from("books").insert([newBookDB]).select().single();

      if (error) {
        console.error(`[-][BookDetailScreen] error registering book: ${JSON.stringify(error)}`);
        return;
      }

      console.log(`[+][BookDetailScreen] book registered: ${JSON.stringify(data)}`);
      router.replace("/(auth)/(tabs)");
    } catch (error) {
      console.error(`[-][BookDetailScreen] error: ${JSON.stringify(error)}`);
    }
  };

  if (!selectedBook) {
    router.back();
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 pb-20 bg-white">
        {/* Title with icon */}
        <View className="p-4 flex-row items-center">
          <Ionicons name="book" size={24} color="#0284c7" />
          <Text className="ml-2 text-2xl font-bold text-gray-800">{t("home.detail.title")}</Text>
        </View>

        {/* Book information with styled box */}
        <View className="mx-4 p-4 bg-white border border-sky-100 rounded-xl shadow-md">
          {/* Book title and basic info */}
          <View className="border-b border-sky-100 pb-4">
            <Text className="text-2xl font-bold text-gray-800">{selectedBook.title}</Text>
            <Text className="mt-2 text-gray-700">
              {selectedBook.author} | {selectedBook.publisher}
            </Text>
          </View>

          {/* Book cover image */}
          <View className="items-center justify-center py-6">
            {selectedBook.thumbnail && (
              <View className="w-56 shadow-lg h-72">
                <Image
                  source={{ uri: selectedBook.thumbnail }}
                  className="w-full h-full rounded-lg"
                  resizeMode="contain"
                />
              </View>
            )}
          </View>

          {/* Book description */}
          <View className="pt-2">
            <Text className="mb-2 text-lg font-semibold text-gray-800">Book Description</Text>
            <Text className="leading-6 text-gray-700">{selectedBook.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Registration Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={() => !isMyRegisteredBook && handleRegisterBook(selectedBook)}
          className={`flex-row items-center justify-center py-3 px-4 ${
            isMyRegisteredBook ? "bg-gray-400" : "bg-[#0284c7]"
          } rounded-lg`}
          activeOpacity={isMyRegisteredBook ? 1 : 0.8}
          disabled={isMyRegisteredBook}
        >
          <Ionicons
            name={isMyRegisteredBook ? "checkmark-circle" : "add-circle"}
            size={20}
            color="white"
          />
          <Text className="ml-2 text-base font-medium text-white">
            {isMyRegisteredBook
              ? t("search.register-book.registered")
              : t("search.register-book.new")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
