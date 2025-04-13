import React from "react";
import { Pressable } from "react-native";

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
    <Pressable
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md border border-input",
        className,
      )}
      onPress={toggleColorScheme}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDarkColorScheme ? "light" : "dark"} mode`}
    >
      {isDarkColorScheme ? (
        <Sun className="w-5 h-5 text-primary" />
      ) : (
        <MoonStar className="w-5 h-5 text-primary" />
      )}
    </Pressable>
  );
}
