import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useBooks } from "@/features/book/hooks/queries/useBooks";
import { useSearchBookByISBN } from "@/features/book/hooks/useSearchBookByISBN";
import { Book } from "@/features/book/models/book";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";

export default function BookSearchDetailScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isbn } = useLocalSearchParams();

  const { user } = useAuth();

  const { data: selectedBook } = useSearchBookByISBN(isbn as string);
  const { books } = useBooks();

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
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 pb-20">
        {/* Book information */}
        <Card className="mx-4 mb-4 overflow-hidden">
          <CardHeader className="border-b border-border pb-2">
            <Text variant="title" size="xl">
              {selectedBook.title}
            </Text>
            <Text variant="muted" className="mt-1">
              {selectedBook.author} | {selectedBook.publisher}
            </Text>
          </CardHeader>

          {/* Book cover image */}
          <CardContent className="items-center justify-center py-6">
            {selectedBook.thumbnail ? (
              <View className="h-72 overflow-hidden rounded-md shadow-md">
                <Image
                  source={{ uri: selectedBook.thumbnail }}
                  className="h-full w-56"
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View className="h-72 w-56 items-center justify-center rounded-md bg-muted">
                <Ionicons name="image-outline" size={48} color="hsl(var(--muted-foreground))" />
                <Text variant="muted" size="sm" className="mt-2">
                  No Cover
                </Text>
              </View>
            )}
          </CardContent>

          {/* Book description */}
          <CardContent className="border-t border-border pt-2">
            <Text variant="title" size="lg" className="mb-2">
              Book Description
            </Text>
            <Text variant="muted" className="leading-6">
              {selectedBook.description}
            </Text>
          </CardContent>
        </Card>
      </ScrollView>

      {/* Bottom Registration Button */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-card p-4">
        {isMyRegisteredBook ? (
          <Button
            disabled
            variant="outline"
            className="h-12 w-full flex-row items-center justify-center border-muted-foreground"
          >
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="hsl(var(--muted-foreground))"
              style={{ marginRight: 8 }}
            />
            <Text className="text-base font-medium text-muted-foreground">
              {t("search.register-book.registered")}
            </Text>
          </Button>
        ) : (
          <Button
            onPress={() => handleRegisterBook(selectedBook)}
            variant="default"
            className="h-12 w-full flex-row items-center justify-center"
          >
            <Ionicons name="add-circle" size={20} color="white" style={{ marginRight: 8 }} />
            <Text className="text-base font-medium text-white">
              {t("search.register-book.new")}
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
}
