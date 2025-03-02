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

  // Placeholder username - in a real app, this would come from user state or API
  const [username, setUsername] = useState("사용자");

  const handleLogout = () => {
    logout();
    // After logout, the auth provider's useEffect in _layout.tsx will redirect to login
  };

  return (
    <View className="flex-1 bg-white">
      {/* User Profile Section */}
      <Profile username={username} onLogout={handleLogout} />

      {/* Settings Section */}
      <View className="p-4 mt-4">
        <Text className="mb-4 text-xl font-bold text-gray-800">설정</Text>

        {/* Book Search Provider Setting */}
        <BookSearchProviderSetting provider={provider} onProviderChange={setProvider} />
      </View>
    </View>
  );
}
