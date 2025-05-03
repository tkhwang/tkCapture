import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

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
        <Text variant="title">{t("detail.chat.title")}</Text>
      </CardHeader>
      <CardContent>
        <Text className="mb-4">{t("detail.chat.description")}</Text>
        <Button
          size="lg"
          className="w-full"
          onPress={handlePressChat}
          disabled={!onPressChat && (!bookId || !bookIsbn)}
        >
          <Ionicons name="chatbubble-outline" size={20} className="mr-2" />
          <Text className="font-medium text-primary-foreground">{t("detail.chat.button")}</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
