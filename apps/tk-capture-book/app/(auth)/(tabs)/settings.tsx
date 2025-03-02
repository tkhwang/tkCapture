import { useAtom } from "jotai";
import { View, Text } from "react-native";

import { BookSearchProviderAtom } from "@/features/book-search/states/book";
import { Profile } from "@/features/profile/profile";
import { BookSearchProviderSetting } from "@/features/setting/book-search-provider-setting";
import { LanguageSetting } from "@/features/setting/language-setting";
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
      <View className="flex-1 gap-8 p-4">
        {/* User Profile Section */}
        <View className="gap-3">
          <Text className="text-xl font-bold text-gray-800">Profile</Text>
          <Profile onLogout={handleLogout} />
        </View>

        {/* Language Settings Section */}
        <Text className="text-xl font-bold text-gray-800">Setting</Text>
        <View className="gap-3">
          <LanguageSetting />
        </View>

        {/* Search Settings Section */}
        <View className="gap-3">
          <BookSearchProviderSetting provider={provider} onProviderChange={setProvider} />
        </View>
      </View>
    </View>
  );
}
