import { useAtom } from "jotai";
import { useState } from "react";
import { View, Text } from "react-native";

import { BookSearchProviderAtom } from "@/features/book-search/states/book";
import { Profile } from "@/features/profile/profile";
import { BookSearchProviderSetting } from "@/features/setting/book-search-provider-setting";
import { useAuth } from "@/providers/auth-provider";

export default function SettingsScreen() {
  const [provider, setProvider] = useAtom(BookSearchProviderAtom);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // After logout, the auth provider's useEffect in _layout.tsx will redirect to login
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 p-5 gap-8">
        {/* User Profile Section */}
        <View className="gap-3">
          <Text className="text-xl font-bold text-gray-800">Profile</Text>
          <Profile onLogout={handleLogout} />
        </View>

        {/* Settings Section */}
        <View className="gap-3">
          <Text className="text-xl font-bold text-gray-800">Search</Text>
          <BookSearchProviderSetting provider={provider} onProviderChange={setProvider} />
        </View>
      </View>
    </View>
  );
}
