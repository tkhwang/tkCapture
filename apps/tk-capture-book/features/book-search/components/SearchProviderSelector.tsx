import { View, Text, Pressable } from "react-native";

import { BookSearchProvider } from "@/features/book-search/factories/book-search-factory";

interface SearchProviderSelectorProps {
  provider: BookSearchProvider;
  onProviderChange: (provider: BookSearchProvider) => void;
}

export function SearchProviderSelector({
  provider,
  onProviderChange,
}: SearchProviderSelectorProps) {
  return (
    <View className="flex-row space-x-2">
      <Pressable
        className={`flex-1 p-2 rounded-lg border ${
          provider === "naver" ? "bg-blue-500 border-blue-500" : "border-gray-300"
        }`}
        onPress={() => onProviderChange("naver")}
      >
        <Text
          className={`text-center font-medium ${
            provider === "naver" ? "text-white" : "text-gray-700"
          }`}
        >
          네이버
        </Text>
      </Pressable>
      <Pressable
        className={`flex-1 p-2 rounded-lg border ${
          provider === "kakao" ? "bg-yellow-500 border-yellow-500" : "border-gray-300"
        }`}
        onPress={() => onProviderChange("kakao")}
      >
        <Text
          className={`text-center font-medium ${
            provider === "kakao" ? "text-white" : "text-gray-700"
          }`}
        >
          카카오
        </Text>
      </Pressable>
    </View>
  );
}
