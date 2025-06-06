import { View } from "react-native";

import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Text } from "@/components/ui/text";

interface Props {
  bookId: string;
  bookIsbn: string;
}

export function BookDetailNavigation({ bookId: _bookId, bookIsbn: _bookIsbn }: Props) {
  const { t } = useTranslation();

  const navigationItems = [
    {
      title: t("frame.tabTitle"),
      icon: "film" as const,
      path: "/(auth)/frame",
      description: "프레임 기능",
    },
    {
      title: t("sentence.tabTitle"),
      icon: "list" as const,
      path: "/(auth)/sentence",
      description: "문장 수집 기능",
    },
    {
      title: t("talk.tabTitle"),
      icon: "chatbubble-ellipses" as const,
      path: "/(auth)/talk",
      description: "토크 기능",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Card className="mx-4 mb-4">
      <CardHeader>
        <Text variant="title" size="lg" className="text-center">
          기능 선택
        </Text>
      </CardHeader>
      <CardContent>
        <View className="flex-row justify-between gap-2">
          {navigationItems.map((item, index) => (
            <View
              key={item.path}
              className="flex-1"
              style={{
                transform: [
                  {
                    skewX: index === 0 ? "-8deg" : index === 2 ? "8deg" : "0deg",
                  },
                ],
              }}
            >
              <Button
                variant="outline"
                size="lg"
                onPress={() => handleNavigation(item.path)}
                className={`h-24 flex-col items-center justify-center border-2 ${
                  index === 1 ? "border-primary bg-primary/5" : "border-muted-foreground/30"
                }`}
              >
                <Ionicons
                  name={item.icon}
                  size={28}
                  color={index === 1 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                />
                <Text
                  variant="title"
                  size="xs"
                  className={`mt-2 text-center ${
                    index === 1 ? "text-primary" : "text-muted-foreground"
                  }`}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
              </Button>
            </View>
          ))}
        </View>

        <View className="mt-3">
          <Text variant="muted" size="xs" className="text-center">
            선택한 책으로 다양한 기능을 사용해보세요
          </Text>
        </View>
      </CardContent>
    </Card>
  );
}
