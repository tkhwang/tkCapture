import React from "react";

import { Pressable, Text, View } from "react-native";

import { MoonStar } from "@/lib/icons/MoonStar";
import { Sun } from "@/lib/icons/Sun";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

interface ToggleThemeProps {
  className?: string;
}

export default function ToggleTheme({ className }: ToggleThemeProps) {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="w-full">
      <Pressable
        className={cn(
          "flex h-10 w-full flex-row items-center justify-center gap-2 rounded-md border border-input bg-card",
          className,
        )}
        onPress={toggleColorScheme}
        accessibilityRole="button"
        accessibilityLabel={`Switch to ${isDarkColorScheme ? "light" : "dark"} mode`}
      >
        {isDarkColorScheme ? (
          <>
            <Sun className="h-6 w-6 text-primary" />
            <Text className="text-sm font-medium text-primary">Light Mode</Text>
          </>
        ) : (
          <>
            <MoonStar className="h-6 w-6 text-primary" />
            <Text className="text-sm font-medium text-primary">Dark Mode</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
