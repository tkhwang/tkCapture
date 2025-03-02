import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";

import { Language } from "@/features/setting/states/language";

interface LanguageOption {
  code: Language;
  label: string;
}

interface LanguageSettingProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSetting({ currentLanguage, onLanguageChange }: LanguageSettingProps) {
  const { t } = useTranslation();

  const languageOptions: LanguageOption[] = [
    { code: "en", label: "English (Default)" },
    { code: "ko", label: "한국어" },
  ];

  return (
    <View className="p-4 bg-gray-50 rounded-xl gap-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name="language" size={24} color="#4B5563" />
        <Text className="text-lg font-bold text-gray-800">
          {t("settings.language.title", "Language")}
        </Text>
      </View>

      <View className="gap-2">
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.code}
            className={`p-3 rounded-lg flex-row justify-between items-center ${
              currentLanguage === option.code ? "bg-primary bg-opacity-10" : "bg-white"
            }`}
            onPress={() => onLanguageChange(option.code)}
          >
            <Text className="text-base">{option.label}</Text>
            {currentLanguage === option.code && (
              <Ionicons name="checkmark-circle" size={22} color="#007AFF" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
