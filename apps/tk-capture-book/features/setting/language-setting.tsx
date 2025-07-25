import { View, TouchableOpacity } from "react-native";

import { useAtom } from "jotai";

import { Ionicons } from "@expo/vector-icons";

import { Text } from "@/components/ui/text";
import { Language, languageAtom } from "@/features/setting/states/language";
import { cn } from "@/lib/utils";

interface LanguageOption {
  code: Language;
  label: string;
}

export function LanguageSetting() {
  const [language, setLanguage] = useAtom(languageAtom);

  const languageOptions: LanguageOption[] = [
    { code: "en", label: "English" },
    { code: "ko", label: "한국어" },
  ];

  return (
    <View className="gap-4">
      <View className="gap-2">
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option.code}
            className={cn(
              "flex-row items-center justify-between rounded-lg p-3",
              language === option.code
                ? "border border-primary/20 bg-primary/10"
                : "border border-border bg-card",
            )}
            onPress={() => setLanguage(option.code)}
          >
            <Text className="text-base">{option.label}</Text>
            {language === option.code && (
              <Ionicons name="checkmark-circle" size={22} color="hsl(var(--primary))" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
