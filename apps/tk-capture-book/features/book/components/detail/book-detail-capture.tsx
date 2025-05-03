import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { TextRowTitleDescription } from "@/components/text-row-title-description";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface Props {
  bookId: string;
}

export function BookDetailCapture({ bookId }: Props) {
  const { t } = useTranslation();

  const handleCaptureText = () => {
    router.push({
      pathname: "/(auth)/(stack)/book-capture",
      params: { id: bookId },
    });
  };

  return (
    <Card className={cn("mx-4 mb-4")}>
      <CardHeader>
        <TextRowTitleDescription
          description={t(
            "detail.capture.description",
            "Capture meaningful text from this book using your camera.",
          )}
        />
      </CardHeader>
      <CardContent>
        <View className="flex flex-col gap-3">
          <Button
            onPress={handleCaptureText}
            className="flex flex-row items-center justify-center w-full gap-2"
          >
            <Ionicons name="camera" size={20} color="white" />
            <Text className="text-white">{t("detail.capture.button")}</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
