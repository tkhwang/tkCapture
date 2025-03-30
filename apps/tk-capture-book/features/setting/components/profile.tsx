import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "@/providers/auth-provider";

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const { user } = useAuth();

  return (
    <View className="p-4 shadow-md bg-gray-50 rounded-xl">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="items-center justify-center w-12 h-12 bg-white rounded-full">
            {user?.provider === "apple" ? (
              <AntDesign name="apple1" size={28} color="#000000" />
            ) : user?.provider === "google" ? (
              <AntDesign name="google" size={28} color="#4285F4" />
            ) : (
              <MaterialIcons name="person" size={28} color="#4B5563" />
            )}
          </View>
          <View>
            <Text className="text-xl font-bold text-black">{user?.name ?? ""}</Text>
          </View>
        </View>
        <TouchableOpacity className="px-4 py-4 bg-gray-200 rounded-full" onPress={onLogout}>
          <Text className="font-semibold text-primary">로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
