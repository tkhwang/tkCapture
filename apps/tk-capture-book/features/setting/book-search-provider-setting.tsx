import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
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
    <View className="gap-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name="search" size={24} color="hsl(var(--primary))" />
        <Text variant="title" size="lg">
          {t("settings.menu.bookSearchProvider")}
        </Text>
      </View>

      <SearchProviderSelector provider={provider} onProviderChange={onProviderChange} />
    </View>
  );
}
