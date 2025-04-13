import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";

import { Text } from "@/components/ui/text";
import { Language, languageAtom } from "@/features/setting/states/language";
import { cn } from "@/lib/utils";

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
    <View className="gap-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name="language" size={24} color="hsl(var(--primary))" />
        <Text variant="title" size="lg">
          {t("settings.menu.language")}
        </Text>
      </View>

      <View className="gap-2">
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.code}
            className={cn(
              "p-3 rounded-lg flex-row justify-between items-center",
              language === option.code
                ? "bg-primary/10 border border-primary/20"
                : "bg-card border border-border",
            )}
            onPress={() => setLanguage(option.code)}
          >
            <Text size="base">{option.label}</Text>
            {language === option.code && (
              <Ionicons name="checkmark-circle" size={22} color="hsl(var(--primary))" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
