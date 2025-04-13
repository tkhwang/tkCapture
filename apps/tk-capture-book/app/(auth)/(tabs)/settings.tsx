import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import ToggleTheme from "@/components/ToggleTheme";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { BookSearchProviderAtom } from "@/features/book-search/states/book";
import { BookSearchProviderSetting } from "@/features/setting/book-search-provider-setting";
import { Profile } from "@/features/setting/components/profile";
import { LanguageSetting } from "@/features/setting/language-setting";
import { useAuth } from "@/providers/auth-provider";

export default function SettingsScreen() {
  const { t } = useTranslation();

  const [provider, setProvider] = useAtom(BookSearchProviderAtom);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // After logout, the auth provider's useEffect in _layout.tsx will redirect to login
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 gap-8 p-4">
        {/* Header with Theme Toggle */}
        <View className="flex-row items-center justify-between mb-2">
          <Text variant="heading" size="2xl">
            {t("settings.title")}
          </Text>
          <ToggleTheme />
        </View>

        {/* User Profile Section */}
        <View className="gap-3">
          <Text variant="title" size="xl" className="text-foreground">
            {t("settings.menu.profile")}
          </Text>
          <Profile onLogout={handleLogout} />
        </View>

        {/* Language Settings Section */}
        <Text variant="title" size="xl" className="text-foreground">
          {t("settings.menu.settings")}
        </Text>
        <Card>
          <CardContent className="p-4">
            <LanguageSetting />
          </CardContent>
        </Card>

        {/* Search Settings Section */}
        <Card>
          <CardContent className="p-4">
            <BookSearchProviderSetting provider={provider} onProviderChange={setProvider} />
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
