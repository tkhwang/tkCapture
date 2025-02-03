import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-yellow-200">
      <Text className="text-xl font-bold text-center">Home Page</Text>
      <StatusBar style="auto" />
    </View>
  );
}
