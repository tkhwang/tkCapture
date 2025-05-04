import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import { TextRowTitleDescription } from "@/components/text-row-title-description";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Text } from "@/components/ui/text";

interface BookDetailChatProps {
  onPressChat?: () => void;
  bookId?: string;
  bookIsbn?: string;
}

export function BookDetailChat({ onPressChat, bookId, bookIsbn }: BookDetailChatProps) {
  const { t } = useTranslation();

  // Default handler if onPressChat not provided but IDs are
  const handlePressChat = () => {
    if (onPressChat) {
      onPressChat();
    } else if (bookId && bookIsbn) {
      // Navigate to chat screen with the provided IDs
      router.push({
        pathname: "/(auth)/(stack)/book-chat",
        params: {
          id: bookId,
          isbn: bookIsbn,
        },
      });
    }
  };

  return (
    <Card className="mx-4 mb-6">
      <CardHeader>
        <TextRowTitleDescription description={t("detail.chat.description")} />
      </CardHeader>
      <CardContent>
        <Button
          size="lg"
          onPress={handlePressChat}
          disabled={!onPressChat && (!bookId || !bookIsbn)}
          className="w-full gap-2"
        >
          <Ionicons name="chatbubble-outline" size={20} color="white" />
          <Text className="font-medium text-primary-foreground">{t("detail.chat.button")}</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
