import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";

import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useBooks } from "@/features/book/hooks/useBooks";
import { useAuth } from "@/providers/auth-provider";
import { Database } from "@/types/types_db";

type Book = Database["public"]["Tables"]["books"]["Row"];

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const { books, loading, error } = useBooks();

  const handleBookPress = (book: Book) => {
    router.push({
      pathname: "/(auth)/(stack)/book-detail",
      params: {
        id: book.id,
        isbn: book.isbn,
      },
    });
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      onPress={() => handleBookPress(item)}
      activeOpacity={0.7}
      className="px-3 pt-1 pb-2"
    >
      <Card className="overflow-hidden mb-1 border shadow-lg border-border/90">
        <CardContent className="flex-row p-4 bg-card">
          {item.thumbnail ? (
            <Image
              source={{ uri: item.thumbnail }}
              className="w-20 h-28 rounded-md shadow"
              resizeMode="cover"
            />
          ) : (
            <View className="justify-center items-center w-20 h-28 rounded-md bg-muted">
              <Text variant="muted" size="sm">
                No Image
              </Text>
            </View>
          )}
          <View className="flex-1 ml-4">
            <Text variant="title" className="mb-1 text-foreground" numberOfLines={2}>
              {item.title}
            </Text>
            <View className="flex-row items-center mb-1">
              <View className="mr-1 w-1 h-1 rounded-full bg-primary" />
              <Text variant="muted" size="sm" numberOfLines={1}>
                {item.author}
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="mr-1 w-1 h-1 rounded-full bg-primary" />
              <Text variant="muted" size="sm" numberOfLines={1}>
                {item.publisher}
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  // Loading state
  const renderLoading = () => (
    <View className="flex-1 justify-center items-center">
      <Card className="justify-center items-center p-6 bg-card/50 border-border/20">
        <ActivityIndicator size="large" color="hsl(var(--primary))" />
        <Text variant="muted" size="sm" className="mt-4">
          {t("common.loading")}
        </Text>
      </Card>
    </View>
  );

  // Error state
  const renderError = () => (
    <View className="flex absolute inset-0 justify-center items-center px-4">
      <Card className="items-center p-6 w-full max-w-sm bg-card/80">
        <CardContent className="items-center p-0">
          <View className="justify-center items-center mb-4 w-12 h-12 rounded-full bg-destructive/10">
            <Text className="text-2xl">⚠️</Text>
          </View>
          <Text variant="title" size="lg" className="mb-2 text-center">
            {t("common.error.title")}
          </Text>
          <Text variant="muted" className="text-center">
            {error instanceof Error ? error.message : t("common.error.message")}
          </Text>
        </CardContent>
      </Card>
    </View>
  );

  const renderNoRegisteredBook = () => (
    <View className="flex absolute inset-0 justify-center items-center px-4">
      <Card className="items-center p-8 w-full max-w-sm bg-card/80">
        <CardContent className="items-center p-0">
          <Image
            source={require("../../../assets/images/man-book-reading-green.png")}
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
    <View className="flex-1 py-2 bg-background">
      {loading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderNoRegisteredBook()
      )}
    </View>
  );
}
