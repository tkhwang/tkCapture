import { View } from "react-native";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

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
    <Card className="bg-card p-4">
      <CardContent className="p-0">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Avatar className="h-12 w-12 bg-background">
              <AvatarFallback>{getProviderIcon()}</AvatarFallback>
            </Avatar>
            <View>
              <Text className="text-xl font-semibold">{user?.name ?? ""}</Text>
            </View>
          </View>
          <Button variant="secondary" className="rounded-full bg-slate-200 px-5" onPress={onLogout}>
            로그아웃
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
