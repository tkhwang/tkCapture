import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";

import { Text, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-xl font-bold">{t("home")}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
