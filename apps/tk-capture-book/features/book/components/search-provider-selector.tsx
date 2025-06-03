import { View, Text, Pressable } from "react-native";

import { BookSearchProvider } from "@/features/book/types/book-search-interface";

interface SearchProviderSelectorProps {
  provider: BookSearchProvider;
  onProviderChange: (provider: BookSearchProvider) => void;
}

export function SearchProviderSelector({
  provider,
  onProviderChange,
}: SearchProviderSelectorProps) {
  return (
    <View className="flex-row gap-4 space-x-2">
      <Pressable
        className={`flex-1 rounded-lg border p-2 ${
          provider === "naver" ? "border-[#03C75A] bg-[#03C75A]" : "border-gray-300"
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
        className={`flex-1 rounded-lg border p-2 ${
          provider === "kakao" ? "border-[#FEE500] bg-[#FEE500]" : "border-gray-300"
        }`}
        onPress={() => onProviderChange("kakao")}
      >
        <Text
          className={`text-center font-medium ${
            provider === "kakao" ? "text-black" : "text-gray-700"
          }`}
        >
          카카오
        </Text>
      </Pressable>
    </View>
  );
}
