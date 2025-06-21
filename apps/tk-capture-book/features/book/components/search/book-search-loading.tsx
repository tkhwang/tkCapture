import { ActivityIndicator, View } from "react-native";

export function BookSearchLoading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
