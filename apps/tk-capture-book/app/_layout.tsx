import "../global.css";
import "../utils/i18n";

import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { configureGoogleAuth } from "@/features/auth/google-auth";
import { languageAtom } from "@/features/setting/states/language";
import { NAV_THEME } from "@/lib/constants";
import { queryClient } from "@/lib/react-query-client";
import { useColorScheme } from "@/lib/useColorScheme";
import { AuthProvider, useAuth } from "@/providers/auth-provider";
import i18n from "@/utils/i18n";

configureGoogleAuth();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

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
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const hasMounted = useRef(false);

  useEffect(() => {
    // 언어 설정이 로드되면 로딩 상태 해제
    if (language) {
      i18n.changeLanguage(language);
      setIsLoading(false);
    }
  }, [language]);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }

    hasMounted.current = true;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ProtectedLayout />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
