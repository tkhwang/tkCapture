import { View } from "react-native";

import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { SelectedBookHeader } from "@/features/book/components/selected-book-header";

export default function BookTalkScreen() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-background">
      <SelectedBookHeader screen={t("bookTalk.screen")} />
      <View className="flex-1 items-center justify-center">
        <Text>Book Talk</Text>
      </View>
    </View>
  );
}
