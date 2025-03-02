import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ProfileProps {
  username: string;
  onLogout: () => void;
}

export function Profile({ username, onLogout }: ProfileProps) {
  return (
    <View className="p-6 shadow-md bg-primary rounded-b-3xl">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View className="items-center justify-center w-12 h-12 mr-4 bg-white rounded-full">
            <MaterialIcons name="person" size={28} color="#4B5563" />
          </View>
          <View>
            <Text className="text-xl font-bold text-white">{username}</Text>
            <Text className="text-white opacity-80">내 프로필</Text>
          </View>
        </View>
        <TouchableOpacity className="px-4 py-2 bg-white rounded-full" onPress={onLogout}>
          <Text className="font-semibold text-primary">로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
