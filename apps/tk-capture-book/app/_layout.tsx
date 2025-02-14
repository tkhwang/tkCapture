import "../global.css";
import "../i18n";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

import { AuthProvider, useAuth } from "@/lib/auth-context";
import { queryClient } from "@/lib/react-query-client";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
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
