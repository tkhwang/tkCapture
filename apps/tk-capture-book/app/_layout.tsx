import "../global.css";
import "../i18n";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

import { queryClient } from "@/lib/react-query-client";
import { AuthProvider, useAuth } from "@/providers/auth-provider";

function ProtectedLayout() {
  const segments = useSegments();
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const inLoginScreen = segments[0] === "login";

    if (!isAuthenticated && !inLoginScreen) {
      // 인증되지 않은 상태에서 login 화면이 아니면 login으로 이동
      router.replace("/login");
    } else if (isAuthenticated && inLoginScreen) {
      // 인증된 상태에서 login 화면이면 tabs로 이동
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
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
  );
}

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}
