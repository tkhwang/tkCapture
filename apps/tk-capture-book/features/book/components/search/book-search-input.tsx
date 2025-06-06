import React from "react";

import { Pressable, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface BookSearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
  placeholder?: string;
}

export const BookSearchInput: React.FC<BookSearchInputProps> = ({
  searchText,
  setSearchText,
  placeholder = "검색어를 입력하세요",
}) => {
  return (
    <View className="relative flex-row items-center">
      <TextInput
        className="flex-1 rounded-lg border border-gray-300 p-2 pr-8"
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
      />
      {searchText.length > 0 && (
        <Pressable className="absolute right-2" onPress={() => setSearchText("")}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
};
