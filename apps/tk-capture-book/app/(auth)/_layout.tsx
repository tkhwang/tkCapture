import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0284c7",
          tabBarInactiveTintColor: "#64748b",
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarIconStyle: {
            marginBottom: -2,
          },
          tabBarLabelStyle: {
            marginTop: 2,
            fontSize: 11,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: t("home.tabTitle"),
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="frame"
          options={{
            title: t("frame.title"),
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sentence"
          options={{
            title: t("sentence.title"),
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="talk"
          options={{
            title: t("talk.title"),
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t("settings.tabTitle"),
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
