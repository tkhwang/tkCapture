import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

const COLOR_SCHEME_KEY = "user-color-scheme";

export function useColorScheme() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [persistedColorScheme, setPersistedColorScheme] = useState<"light" | "dark" | null>(null);
  const { colorScheme, setColorScheme: setNativewindColorScheme } = useNativewindColorScheme();

  // Load the persisted color scheme when the component mounts
  useEffect(() => {
    const loadColorScheme = async () => {
      try {
        const savedColorScheme = await AsyncStorage.getItem(COLOR_SCHEME_KEY);
        if (savedColorScheme === "light" || savedColorScheme === "dark") {
          setPersistedColorScheme(savedColorScheme);
          setNativewindColorScheme(savedColorScheme);
        }
      } catch (error) {
        console.error("Failed to load color scheme", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadColorScheme();
  }, []);

  // Function to set the color scheme and persist it
  const setColorScheme = async (scheme: "light" | "dark" | null) => {
    try {
      if (scheme) {
        await AsyncStorage.setItem(COLOR_SCHEME_KEY, scheme);
      } else {
        await AsyncStorage.removeItem(COLOR_SCHEME_KEY);
      }
      setPersistedColorScheme(scheme);
      setNativewindColorScheme(scheme);
    } catch (error) {
      console.error("Failed to save color scheme", error);
    }
  };

  // Function to toggle the color scheme and persist it
  const toggleColorScheme = async () => {
    const newScheme = (persistedColorScheme || colorScheme) === "dark" ? "light" : "dark";
    try {
      await AsyncStorage.setItem(COLOR_SCHEME_KEY, newScheme);
      setPersistedColorScheme(newScheme);
      setNativewindColorScheme(newScheme);
    } catch (error) {
      console.error("Failed to save color scheme", error);
    }
  };

  const currentColorScheme = persistedColorScheme || colorScheme;

  return {
    colorScheme: currentColorScheme ?? "dark",
    isDarkColorScheme: currentColorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
    isLoaded,
  };
}
