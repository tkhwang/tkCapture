import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">홈 화면</Text>
      <StatusBar style="auto" />
    </View>
  );
}
