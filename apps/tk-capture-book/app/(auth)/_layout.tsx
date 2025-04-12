import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(stack)/book-detail"
        options={{
          headerBackTitle: "",
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(stack)/book-search-detail"
        options={{
          headerBackTitle: "",
          headerTitle: t("home.detail.title"),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
