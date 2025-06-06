import { View } from "react-native";

import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Button } from "@/components/ui";
import { Text } from "@/components/ui/text";

interface Props {
  bookId: string;
  bookIsbn: string;
}

export function BookDetailNavigation({ bookId: _bookId, bookIsbn: _bookIsbn }: Props) {
  const { t } = useTranslation();

  const navigationItems = [
    {
      title: t("frame.title"),
      icon: "film" as const,
      path: "/(auth)/frame",
      color: "#3b82f6", // blue
    },
    {
      title: t("sentence.title"),
      icon: "list" as const,
      path: "/(auth)/sentence",
      color: "#10b981", // green
    },
    {
      title: t("talk.title"),
      icon: "chatbubble-ellipses" as const,
      path: "/(auth)/talk",
      color: "#f59e0b", // yellow
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <View className="flex-row gap-3 p-4">
      {navigationItems.map((item) => {
        const buttonColor = item.color;
        const backgroundColor = `${item.color}10`;

        return (
          <View key={item.path} className="flex-1">
            <Button
              variant="outline"
              size="lg"
              onPress={() => handleNavigation(item.path)}
              className="h-20 flex-col items-center justify-center border-2"
              style={{
                borderColor: item.color,
                backgroundColor: backgroundColor,
              }}
            >
              <Ionicons name={item.icon} size={24} color={buttonColor} />
              <Text
                variant="title"
                size="xs"
                className="mt-2 text-center"
                style={{ color: buttonColor }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </Button>
          </View>
        );
      })}
    </View>
  );
}
