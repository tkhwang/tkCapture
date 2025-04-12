import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(stack)/book-detail"
        options={{
          headerBackTitle: "",
          headerTitle: "Book Detail",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(stack)/book-search-detail"
        options={{
          headerBackTitle: "",
          headerTitle: "Book Detail",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
