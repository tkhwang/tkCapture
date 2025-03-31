import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

import { useSearchBookByISBN } from "@/features/book-search/hooks/useSearchBookByISBN";

export default function BookDetailScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const { isbn } = useLocalSearchParams();

  const { data: searchedBook } = useSearchBookByISBN(isbn as string);

  if (!searchedBook) {
    router.back();
    return;
  }

  const handleRegisterBook = () => {
    console.log(`[+][BookDetailScreen] book:  ${JSON.stringify(searchedBook)}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 pb-20 bg-white">
        {/* 상단 제목 및 기본 정보 */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-2xl font-bold">{searchedBook.title}</Text>
          <Text className="mt-2 text-gray-600">
            {searchedBook.author} | {searchedBook.publisher}
          </Text>
        </View>

        {/* 책 표지 이미지 */}
        <View className="items-center justify-center py-8">
          {searchedBook.thumbnail && (
            <View className="w-56 shadow-lg h-72">
              <Image
                source={{ uri: searchedBook.thumbnail }}
                className="w-full h-full rounded-lg"
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        {/* 세부 정보 */}
        <View className="p-4">
          <Text className="mb-2 text-lg font-semibold">도서 정보</Text>
          <Text className="leading-6 text-gray-600">{searchedBook.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Registration Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={handleRegisterBook}
          className="flex-row items-center justify-center py-3 px-4 bg-[#0284c7] rounded-lg"
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={20} color="white" />
          <Text className="ml-2 text-base font-medium text-white">{t("search.register-book")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
