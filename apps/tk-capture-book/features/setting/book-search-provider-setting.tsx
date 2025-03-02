import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

import { SearchProviderSelector } from "@/features/book-search/components/SearchProviderSelector";
import { BookSearchProvider } from "@/features/book-search/types/book-search-interface";

interface BookSearchProviderSettingProps {
  provider: BookSearchProvider;
  onProviderChange: (provider: BookSearchProvider) => void;
}

export function BookSearchProviderSetting({
  provider,
  onProviderChange,
}: BookSearchProviderSettingProps) {
  const { t } = useTranslation();

  return (
    <View className="p-4 mb-4 bg-gray-50 rounded-xl">
      <View className="flex-row items-center mb-4 space-x-2">
        <Ionicons name="search" size={24} color="#4B5563" />
        <Text className="text-lg font-bold text-gray-800">{t("settings.bookSearch.provider")}</Text>
      </View>
      <SearchProviderSelector provider={provider} onProviderChange={onProviderChange} />
    </View>
  );
}
