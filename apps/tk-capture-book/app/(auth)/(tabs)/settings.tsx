import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import ToggleTheme from "@/components/ToggleTheme";
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
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text variant="heading" size="2xl">
            {t("settings.title")}
          </Text>
        </View>

        {/* User Profile Section - 테두리 유지 */}
        <View className="gap-3">
          <Text variant="title" size="xl" className="text-foreground">
            {t("settings.menu.profile")}
          </Text>
          <Profile onLogout={handleLogout} />
        </View>

        {/* Theme Toggle Section - 테두리 제거 */}
        <View className="gap-3">
          <Text variant="title" size="xl" className="text-foreground">
            {t("settings.menu.appearance")}
          </Text>
          <ToggleTheme />
        </View>

        {/* Language Settings Section - 테두리 제거 */}
        <View className="gap-3">
          <Text variant="title" size="xl" className="text-foreground">
            {t("settings.menu.settings")}
          </Text>
          <LanguageSetting />
        </View>

        {/* Search Settings Section - 테두리 제거 */}
        <View className="gap-3">
          <Text variant="title" size="xl" className="text-foreground">
            {t("settings.menu.bookSearchProvider")}
          </Text>
          <BookSearchProviderSetting provider={provider} onProviderChange={setProvider} />
        </View>
      </View>
    </View>
  );
}
