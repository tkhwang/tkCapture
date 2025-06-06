import { Image, TouchableOpacity, View } from "react-native";

import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Card, CardContent } from "@/components/ui";
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
      <TouchableOpacity onPress={handleSelectBook} activeOpacity={0.7}>
        <Card className="mx-4 mb-4 border-dashed border-muted-foreground/30">
          <CardContent className="flex-row items-center justify-between p-4">
            <Text variant="muted" className="flex-1 text-center">
              {t("header.selectBookFirst", { feature: screen })}
            </Text>

            <View className="flex-row items-center space-x-1">
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              <Ionicons name="library" size={16} color="#9ca3af" />
            </View>
          </CardContent>
        </Card>
      </TouchableOpacity>
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
          <Text variant="title" size="sm" numberOfLines={1} className="text-foreground">
            {selectedBook.title}
          </Text>
          <Text variant="muted" size="xs" numberOfLines={1} className="mt-0.5">
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
