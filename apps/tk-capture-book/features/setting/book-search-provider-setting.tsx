import { View } from "react-native";

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
  return (
    <View className="gap-4">
      <SearchProviderSelector provider={provider} onProviderChange={onProviderChange} />
    </View>
  );
}
