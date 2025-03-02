import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  return (
    <View className="p-4 shadow-md bg-primary rounded-xl">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="items-center justify-center w-12 h-12 bg-white rounded-full">
            <MaterialIcons name="person" size={28} color="#4B5563" />
          </View>
          <View>
            <Text className="text-xl font-bold text-black">userName</Text>
          </View>
        </View>

        <TouchableOpacity className="px-4 py-2 bg-white rounded-full" onPress={onLogout}>
          <Text className="font-semibold text-primary">로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
