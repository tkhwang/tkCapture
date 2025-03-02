import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";

import { Language, languageAtom } from "@/features/setting/states/language";

interface LanguageOption {
  code: Language;
  label: string;
}

export function LanguageSetting() {
  const { t } = useTranslation();

  const [language, setLanguage] = useAtom(languageAtom);

  const languageOptions: LanguageOption[] = [
    { code: "en", label: "English (Default)" },
    { code: "ko", label: "한국어" },
  ];

  return (
    <View className="gap-4 p-4 bg-gray-50 rounded-xl">
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
              language === option.code ? "bg-primary bg-opacity-10" : "bg-white"
            }`}
            onPress={() => setLanguage(option.code)}
          >
            <Text className="text-base">{option.label}</Text>
            {language === option.code && (
              <Ionicons name="checkmark-circle" size={22} color="#007AFF" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
