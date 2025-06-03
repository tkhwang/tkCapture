import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0284c7",
        tabBarInactiveTintColor: "#64748b",
        tabBarIconStyle: {
          marginBottom: -4,
        },
        tabBarLabelStyle: {
          marginTop: 4,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home.tabTitle"),
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="frame"
        options={{
          title: t("frame.tabTitle"),
          tabBarIcon: ({ color, size }) => <Ionicons name="image" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: t("camera.tabTitle"),
          tabBarIcon: ({ color, size }) => <Ionicons name="camera" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings.tabTitle"),
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
