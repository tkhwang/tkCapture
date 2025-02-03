import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export default function Search() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <View className="flex-1">
      <View className="p-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center px-4 bg-gray-100 rounded-full">
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 h-10 ml-2 text-base"
            placeholder={t("search")}
            placeholderTextColor="#64748b"
            returnKeyType="search"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
