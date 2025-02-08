import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-xl font-bold">{t("profile")}</Text>
    </View>
  );
}
