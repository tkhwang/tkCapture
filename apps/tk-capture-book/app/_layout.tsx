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
    const inPublicGroup = segments[0] === "(public)";

    if (!isAuthenticated && !inPublicGroup) {
      // 인증되지 않은 상태에서 public 그룹이 아니면 login으로 이동
      router.replace("/(public)/login");
    } else if (isAuthenticated && inPublicGroup) {
      // 인증된 상태에서 public 그룹이면 auth 그룹으로 이동
      router.replace("/(auth)/(tabs)");
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(auth)" />
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
