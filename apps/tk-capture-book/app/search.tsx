import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function SearchScreen() {
  const { t } = useTranslation();

  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-xl font-bold">{t("search")} </Text>
    </View>
  );
}
