import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 p-4">
      <Text>Book Detail Page - ID: {id}</Text>
    </View>
  );
}
