// Import your global CSS file
import "../global.css";
import "../i18n"; // i18n 설정 임포트

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

import { queryClient } from "@/lib/react-query-client";

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(stack)/book-detail"
          options={{
            headerBackTitle: "",
            headerTitle: "Book Detail",
            headerShown: true,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
