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
    >
      {isDarkColorScheme ? (
        <Sun className="h-5 w-5 text-primary" />
      ) : (
        <MoonStar className="h-5 w-5 text-primary" />
      )}
    </Pressable>
  );
}
