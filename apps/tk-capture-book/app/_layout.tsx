// Import your global CSS file
import "../global.css";
import "../i18n"; // i18n 설정 임포트

import { Ionicons } from "@expo/vector-icons";
import { QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import { queryClient } from "@/lib/react-query-client";

export default function AppLayout() {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0284c7",
          tabBarInactiveTintColor: "#64748b",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("home"),
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search-naver"
          options={{
            title: t("search"),
            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search-kakao"
          options={{
            title: t("search"),
            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("profile"),
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
