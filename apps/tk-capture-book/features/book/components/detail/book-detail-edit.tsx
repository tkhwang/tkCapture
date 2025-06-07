import { View } from "react-native";

import { useTranslation } from "react-i18next";

import { TextRowTitleDescription } from "@/components/text-row-title-description";
import { Button, Card, CardContent, CardDescription, CardHeader } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { Book } from "@/features/book/types/book";
import { cn } from "@/lib/utils";
import { Database } from "@/types/types_db";

type BookStatus = Database["public"]["Enums"]["book_status"];

const BOOK_STATUSES: BookStatus[] = ["unread", "in_progress", "completed", "on_hold"];

interface Props {
  loading: boolean;
  book: Book;
  onUpdateStatus: (status: BookStatus) => void;
}

export function BookDetailEdit({ loading, book, onUpdateStatus }: Props) {
  const { t, i18n } = useTranslation();

  const getStatusLabel = (status: BookStatus) => t(`detail.status.${status}`);
  const getProgressValue = () => Math.max(0, Math.min(100, book.progress));
  const getProgressPercentage = () => `${Math.round(book.progress)}%`;

  return (
    <Card className={cn("mx-4 mb-4")}>
      <CardHeader>
        <TextRowTitleDescription description={t("home.detail.status")} />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <View className="flex flex-row justify-between gap-2">
          {BOOK_STATUSES.map((statusOption) => (
            <Button
              key={statusOption}
              size="sm"
              variant={book.book_status === statusOption ? "default" : "outline"}
              disabled={loading}
              onPress={() => onUpdateStatus(statusOption)}
              className="flex-1"
              textClass={i18n.language === "ko" ? "text-sm" : "text-[9px]"}
            >
              {getStatusLabel(statusOption)}
            </Button>
          ))}
        </View>
        <CardDescription>
          <TextRowTitleDescription description={t("home.detail.progress")} />
        </CardDescription>
        <View className="flex flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Progress
              value={getProgressValue()}
              indicatorClassName={cn("bg-gray-400", loading && "opacity-50")}
            />
          </View>
          <Text
            className={cn("min-w-[35px] text-sm text-muted-foreground", loading && "opacity-50")}
          >
            {getProgressPercentage()}
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}
