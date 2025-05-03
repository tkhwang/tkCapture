import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Database } from "@/types/types_db";

type BookStatus = Database["public"]["Enums"]["book_status"];

const BOOK_STATUSES: BookStatus[] = ["unread", "in_progress", "completed", "on_hold"];

interface Props {
  loading: boolean;
  status: BookStatus;
  onUpdateStatus: (status: BookStatus) => void;
}

export function BookDetailStatus({ loading, status, onUpdateStatus }: Props) {
  const { t } = useTranslation();

  const getStatusLabel = (status: BookStatus) => t(`detail.status.${status}`);

  return (
    <Card className={cn("mx-4 mb-4")}>
      <CardHeader>
        <Text variant="title">{`${t("detail.status.title")}: ${getStatusLabel(status)}`}</Text>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <View className="flex flex-row justify-between gap-2">
          {BOOK_STATUSES.slice(0, 3).map((statusOption) => (
            <Button
              key={statusOption}
              size="sm"
              variant={status === statusOption ? "default" : "outline"}
              disabled={loading}
              onPress={() => onUpdateStatus(statusOption)}
              className="flex-1"
            >
              {getStatusLabel(statusOption)}
            </Button>
          ))}
        </View>
        <View>
          <Button
            key={BOOK_STATUSES[3]}
            size="sm"
            variant={status === BOOK_STATUSES[3] ? "default" : "outline"}
            disabled={loading}
            onPress={() => onUpdateStatus(BOOK_STATUSES[3])}
            className="w-full"
          >
            {getStatusLabel(BOOK_STATUSES[3])}
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
