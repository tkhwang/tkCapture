import { Image, View } from "react-native";

import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui";
import { Text } from "@/components/ui/text";

export function BookSearchEmpty() {
  const { t } = useTranslation();

  return (
    <View className="absolute inset-0 flex items-center justify-center px-4">
      <Card className="w-full max-w-sm items-center bg-card/80 p-8">
        <CardContent className="items-center p-0">
          <Image
            source={require("../../../../assets/images/woman-book-reading-green.png")}
            className="mb-8 h-72 w-72"
            resizeMode="contain"
          />
          <Text className="mb-3 text-center text-xl font-bold">
            {t("search.search-no-result.title")}
          </Text>
          <Text className="text-center text-muted-foreground">
            {t("search.search-no-result.description")}
          </Text>
        </CardContent>
      </Card>
    </View>
  );
}
