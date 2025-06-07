import { Image, TouchableOpacity, View } from "react-native";

import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Button, Card, CardContent } from "@/components/ui";
import { Text } from "@/components/ui/text";
import { selectedBookAtom } from "@/features/book/states/book";

interface Props {
  screen: string;
}

export function SelectedBookHeader({ screen }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useAtom(selectedBookAtom);

  const handleSelectBook = () => {
    setSelectedBook(null);
    router.push("/(auth)/(home)");
  };

  const NoSelectedBook = () => {
    return (
      <View className="mx-4 mb-4">
        <Button
          variant="outline"
          size="lg"
          onPress={handleSelectBook}
          className="h-auto border-dashed border-muted-foreground/30 bg-background p-4"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="flex-1 text-center text-muted-foreground">
              {t("header.selectBookFirst", { feature: screen })}
            </Text>

            <View className="flex-row items-center space-x-1">
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              <Ionicons name="library" size={16} color="#9ca3af" />
            </View>
          </View>
        </Button>
      </View>
    );
  };

  if (!selectedBook) return <NoSelectedBook />;

  return (
    <Card className="mx-4 mb-4 border border-border/10">
      <CardContent className="flex-row items-center p-3">
        {selectedBook.thumbnail ? (
          <Image
            source={{ uri: selectedBook.thumbnail }}
            className="h-12 w-8 rounded-sm"
            resizeMode="cover"
          />
        ) : (
          <View className="h-12 w-8 items-center justify-center rounded-sm bg-muted">
            <Ionicons name="book-outline" size={16} color="hsl(var(--muted-foreground))" />
          </View>
        )}

        <View className="ml-3 flex-1">
          <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
            {selectedBook.title}
          </Text>
          <Text className="mt-0.5 text-xs text-muted-foreground" numberOfLines={1}>
            {selectedBook.author}
            {selectedBook.author && selectedBook.publisher && " | "}
            {selectedBook.publisher}
          </Text>
        </View>

        <TouchableOpacity onPress={handleSelectBook} className="ml-2 p-1" activeOpacity={0.7}>
          <View className="flex-row items-center space-x-1">
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            <Ionicons name="library" size={16} color="#9ca3af" />
          </View>
        </TouchableOpacity>
      </CardContent>
    </Card>
  );
}
