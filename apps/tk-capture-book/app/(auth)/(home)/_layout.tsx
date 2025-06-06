import { useTranslation } from "react-i18next";

import { Stack } from "expo-router";

export default function HomeLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackTitle: "",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="book-detail"
        options={{
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="book-chat"
        options={{
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="book-search-detail"
        options={{
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="book-capture"
        options={{
          headerTitle: t("capture.title", "Text Capture"),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
