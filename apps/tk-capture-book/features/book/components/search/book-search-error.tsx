import { View } from "react-native";

import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";

interface BookSearchErrorProps {
  error?: Error | null;
}

export function BookSearchError({ error }: BookSearchErrorProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">{error?.message || t("error.search.message")}</Text>
    </View>
  );
}
