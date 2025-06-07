import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Card, CardContent } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { BookCollectionSkeleton } from "@/features/book/components/list/book-collection-skeleton";
import { useBooks } from "@/features/book/hooks/queries/useBooks";
import { Book } from "@/features/book/types/book";

export function BookCollection() {
  const { t } = useTranslation();
  const router = useRouter();

  const { books, loading: loadingBooks, error: loadingBooksError } = useBooks();

  const handleBookPress = (book: Book) => {
    router.push({
      pathname: "/book-detail",
      params: {
        id: book.id,
        isbn: book.isbn,
      },
    });
  };

  const renderBook = ({ item }: { item: Book }) => (
    <TouchableOpacity
      onPress={() => handleBookPress(item)}
      activeOpacity={0.7}
      className="pb-2 pt-1"
    >
      <Card className="mb-1 overflow-hidden border border-border/90 shadow-lg">
        <CardContent className="flex-row bg-card p-4">
          {item.thumbnail ? (
            <Image
              source={{ uri: item.thumbnail }}
              className="h-28 w-20 rounded-md shadow"
              resizeMode="cover"
            />
          ) : (
            <View className="h-28 w-20 items-center justify-center rounded-md bg-muted">
              <Text className="text-sm text-muted-foreground">No Image</Text>
            </View>
          )}
          <View className="ml-4 flex flex-1 flex-col justify-between">
            <View className="flex flex-col">
              <Text className="mb-1 text-lg font-semibold text-foreground" numberOfLines={2}>
                {item.title}
              </Text>
              <View className="mb-1 flex-row items-center">
                {item.author ? (
                  <Text className="shrink text-sm text-muted-foreground" numberOfLines={1}>
                    {item.author}
                  </Text>
                ) : null}
                {item.author && item.publisher ? (
                  <Text className="mx-1 text-sm text-muted-foreground">|</Text>
                ) : null}
                {item.publisher ? (
                  <Text className="shrink text-sm text-muted-foreground" numberOfLines={1}>
                    {item.publisher}
                  </Text>
                ) : null}
              </View>
            </View>
            <View className="flex flex-row items-center justify-between gap-4">
              <View className="flex-1">
                <Progress value={item.progress} indicatorClassName="bg-gray-400" />
              </View>
              <Text className="min-w-[35px] text-sm text-muted-foreground">
                {Math.round(item.progress)}%
              </Text>
            </View>
          </View>

          <View className="ml-3 flex items-center justify-center">
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" style={{ opacity: 0.6 }} />
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  const ErrorState = () => (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm items-center bg-card/80 p-6">
          <CardContent className="items-center p-0">
            <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <Text className="text-2xl">⚠️</Text>
            </View>
            <Text className="mb-2 text-center text-lg font-semibold">
              {t("home.list.loading-error.title")}
            </Text>
            <Text className="text-center text-muted-foreground">
              {loadingBooksError instanceof ErrorState
                ? loadingBooksError.message
                : t("home.list.loading-error.description")}
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );

  const NoRegisteredBook = () => (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm items-center bg-card/80 p-8">
          <CardContent className="items-center p-0">
            <Image
              source={require("../../../../assets/images/man-book-reading-green.png")}
              className="mb-8 h-72 w-72"
              resizeMode="contain"
            />
            <Text className="mb-3 text-center text-xl font-bold">
              {t("search.no-registered-book.title")}
            </Text>
            <Text className="text-center text-muted-foreground">
              {t("search.no-registered-book.description")}
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );

  if (loadingBooks) return <BookCollectionSkeleton />;
  if (loadingBooksError) return <ErrorState />;
  if (!books || books.length === 0) return <NoRegisteredBook />;

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
