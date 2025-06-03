import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function HomeLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="book-detail"
        options={{
          headerBackTitle: "",
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="book-chat"
        options={{
          headerBackTitle: "",
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="book-search-detail"
        options={{
          headerBackTitle: "",
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="book-capture"
        options={{
          headerBackTitle: "",
          headerTitle: t("capture.title", "Text Capture"),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
