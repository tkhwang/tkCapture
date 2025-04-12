import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";

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
  const { t } = useTranslation();

  if (!params.id) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-lg text-gray-600">Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <View className="flex-row items-center mb-4">
        <Ionicons name="book" size={24} color="#0284c7" />
        <Text className="ml-2 text-2xl font-bold text-gray-800">{t("home.detail.title")}</Text>
      </View>

      <View className="flex-row">
        {params.thumbnail && (
          <Image
            source={{ uri: params.thumbnail }}
            className="w-32 mr-4 rounded-md shadow-md h-44"
            resizeMode="cover"
          />
        )}
        <View className="flex-1">
          <Text className="mb-2 text-xl font-bold text-gray-800" numberOfLines={2}>
            {params.title}
          </Text>
          <Text className="mb-1 text-gray-700">{params.author}</Text>
          <Text className="mb-1 text-gray-600">{params.publisher}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
