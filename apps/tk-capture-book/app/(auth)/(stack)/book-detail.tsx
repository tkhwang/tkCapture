import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

import { Database } from "@/types/types_db";

type Book = Database["public"]["Tables"]["books"]["Row"];
type BookParams = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  thumbnail?: string;
  description?: string;
};

export default function BookDetailScreen() {
  const params = useLocalSearchParams<BookParams>();

  if (!params.id) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-lg text-gray-600">Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex-row mb-6">
        {params.thumbnail && (
          <Image
            source={{ uri: params.thumbnail }}
            className="w-32 mr-4 rounded-md h-44"
            resizeMode="cover"
          />
        )}
        <View className="flex-1">
          <Text className="mb-2 text-xl font-bold" numberOfLines={2}>
            {params.title}
          </Text>
          <Text className="mb-1 text-gray-700">{params.author}</Text>
          <Text className="mb-1 text-gray-600">{params.publisher}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
