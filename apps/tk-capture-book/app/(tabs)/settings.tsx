import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

import { SearchProviderSelector } from "@/features/book-search/components/SearchProviderSelector";
import { BookSearchProviderAtom } from "@/features/book-search/states/book";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const [provider, setProvider] = useAtom(BookSearchProviderAtom);

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row items-center mb-4 space-x-2">
          <Ionicons name="search" size={24} color="#4B5563" />
          <Text className="text-lg font-bold text-gray-800">
            {t("settings.bookSearch.provider")}
          </Text>
        </View>
        <SearchProviderSelector provider={provider} onProviderChange={setProvider} />
      </View>
    </View>
  );
}
