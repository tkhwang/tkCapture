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
  const { t } = useTranslation();

  const getStatusLabel = (status: BookStatus) => t(`detail.status.${status}`);

  const getProgressValue = () => {
    const progress = book.progress;
    if (typeof progress !== "number" || isNaN(progress)) return 0;
    return Math.max(0, Math.min(100, progress));
  };

  const getProgressPercentage = () => {
    const progress = getProgressValue();
    return `${Math.round(progress)}%`;
  };

  return (
    <Card className={cn("mx-4 mb-4")}>
      <CardHeader>
        <TextRowTitleDescription description="Status" />
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
            >
              {getStatusLabel(statusOption)}
            </Button>
          ))}
        </View>
        <CardDescription>
          <TextRowTitleDescription description="Progress" />
        </CardDescription>
        <View className="flex flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Progress
              value={getProgressValue()}
              indicatorClassName={cn("bg-gray-400", loading && "opacity-50")}
            />
          </View>
          <Text variant="muted" size="sm" className={cn("min-w-[35px]", loading && "opacity-50")}>
            {getProgressPercentage()}
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}
