/// <reference types="nativewind/types" />

declare module "nativewind" {
  export function useColorScheme(): {
    colorScheme: "light" | "dark" | null;
    setColorScheme: (scheme: "light" | "dark" | null) => void;
    toggleColorScheme: () => void;
  };
}
