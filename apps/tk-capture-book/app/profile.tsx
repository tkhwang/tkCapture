import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function ProfileScreen() {
  const { t } = useTranslation();

  return (
    <View className="items-center justify-center flex-1">
      <Text className="text-xl font-bold">{t("profile")}</Text>
    </View>
  );
}
