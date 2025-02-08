import { useLocalSearchParams } from "expo-router";
import { Text, View, Image } from "react-native";

import { BookSearchItem } from "@/features/book-search/types/book-search-interface";

export default function BookDetailScreen() {
  const { book } = useLocalSearchParams();
  const bookData = JSON.parse(book as string) as BookSearchItem;

  return (
    <View className="flex-1 p-4">
      <View className="flex-row">
        {bookData.thumbnail && (
          <View className="w-24 mr-4 h-36">
            <Image
              source={{ uri: bookData.thumbnail }}
              className="w-full h-full rounded-md"
              resizeMode="cover"
            />
          </View>
        )}
        <View className="flex-1">
          <Text className="text-xl font-bold">{bookData.title}</Text>
          <Text className="mt-1 text-gray-600">{bookData.author}</Text>
          <Text className="mt-1 text-gray-500">{bookData.publisher}</Text>
        </View>
      </View>
      <Text className="mt-4 text-gray-600">{bookData.description}</Text>
    </View>
  );
}
