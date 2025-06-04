import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";

import { Card, CardContent } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { useBooks } from "@/features/book/hooks/queries/useBooks";
import { Database } from "@/types/types_db";

type Book = Database["public"]["Tables"]["books"]["Row"];

export function MyBooks() {
  const { t } = useTranslation();
  const router = useRouter();

  const { books, loading, error } = useBooks();

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
              <Text variant="muted" size="sm">
                No Image
              </Text>
            </View>
          )}
          <View className="ml-4 flex flex-1 flex-col justify-between">
            <View className="flex flex-col">
              <Text variant="title" className="mb-1 text-foreground" numberOfLines={2}>
                {item.title}
              </Text>
              <View className="mb-1 flex-row items-center">
                {item.author ? (
                  <Text variant="muted" size="sm" numberOfLines={1} className="shrink">
                    {item.author}
                  </Text>
                ) : null}
                {item.author && item.publisher ? (
                  <Text variant="muted" size="sm" className="mx-1">
                    |
                  </Text>
                ) : null}
                {item.publisher ? (
                  <Text variant="muted" size="sm" numberOfLines={1} className="shrink">
                    {item.publisher}
                  </Text>
                ) : null}
              </View>
            </View>
            {typeof item.progress === "number" && item.progress >= 0 && (
              <View className="flex flex-row items-center justify-between gap-4">
                <View className="flex-1">
                  <Progress value={item.progress} indicatorClassName="bg-gray-400" />
                </View>
                <Text variant="muted" size="sm" className="min-w-[35px]">
                  {Math.round(item.progress)}%
                </Text>
              </View>
            )}
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  const Loading = () => (
    <View className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <Card className="items-center justify-center border-border/20 bg-card/50 p-6">
          <ActivityIndicator size="large" color="hsl(var(--primary))" />
          <Text variant="muted" size="sm" className="mt-4">
            {t("common.loading")}
          </Text>
        </Card>
      </View>
    </View>
  );

  const ErrorState = () => (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm items-center bg-card/80 p-6">
          <CardContent className="items-center p-0">
            <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <Text className="text-2xl">⚠️</Text>
            </View>
            <Text variant="title" size="lg" className="mb-2 text-center">
              {t("common.error.title")}
            </Text>
            <Text variant="muted" className="text-center">
              {error instanceof ErrorState ? error.message : t("common.error.message")}
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );

  const Empty = () => (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0 flex items-center justify-center px-4">
        <Card className="w-full max-w-sm items-center bg-card/80 p-8">
          <CardContent className="items-center p-0">
            <Image
              source={require("../../../assets/images/man-book-reading-green.png")}
              className="mb-8 h-72 w-72"
              resizeMode="contain"
            />
            <Text variant="heading" size="xl" className="mb-3 text-center">
              {t("search.no-registered-book.title")}
            </Text>
            <Text variant="muted" className="text-center">
              {t("search.no-registered-book.description")}
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );

  if (loading) return <Loading />;
  if (error) return <ErrorState />;
  if (!books || books.length === 0) return <Empty />;

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
