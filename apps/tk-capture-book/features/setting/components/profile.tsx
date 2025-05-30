import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const { user } = useAuth();

  // Determine the provider icon
  const getProviderIcon = () => {
    if (user?.provider === "apple") {
      return <AntDesign name="apple1" size={28} color="#000000" />;
    } else if (user?.provider === "google") {
      return <AntDesign name="google" size={28} color="#4285F4" />;
    }
    return <MaterialIcons name="person" size={28} color="#4B5563" />;
  };

  return (
    <Card className="p-4 bg-card">
      <CardContent className="p-0">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Avatar className="w-12 h-12 bg-background">
              <AvatarFallback>{getProviderIcon()}</AvatarFallback>
            </Avatar>
            <View>
              <Text variant="title" size="xl">
                {user?.name ?? ""}
              </Text>
            </View>
          </View>
          <Button variant="secondary" className="px-5 rounded-full bg-slate-200" onPress={onLogout}>
            로그아웃
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
