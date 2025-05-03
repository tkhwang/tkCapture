import { useTranslation } from "react-i18next";

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
      <CardContent className="flex-row flex-wrap gap-2">
        {BOOK_STATUSES.map((statusOption) => (
          <Button
            key={statusOption}
            size="sm"
            variant={status === statusOption ? "default" : "outline"}
            disabled={loading}
            onPress={() => onUpdateStatus(statusOption)}
            className="flex-1 min-w-20"
          >
            {getStatusLabel(statusOption)}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
