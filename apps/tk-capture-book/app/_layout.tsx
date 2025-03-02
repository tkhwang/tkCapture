import "../global.css";
import "../features/i18n";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import i18n from "@/features/i18n";
import { languageAtom } from "@/features/setting/states/language";
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
    </Stack>
  );
}

export default function AppLayout() {
  const [language] = useAtom(languageAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 언어 설정이 로드되면 로딩 상태 해제
    if (language) {
      i18n.changeLanguage(language);
      setIsLoading(false);
    }
  }, [language]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProtectedLayout />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
