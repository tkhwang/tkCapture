import { useState } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BookFramePreview } from "@/features/book/components/frame/book-frame-preview";

export function BookFrame() {
  const { t } = useTranslation();

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted-foreground">{t("frame.camera.loading-permission")}</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <View className="items-center space-y-4">
          <Ionicons name="camera-outline" size={64} color="#9CA3AF" />
          <Text className="text-center text-lg font-semibold">
            {t("frame.camera.no-permission.title")}
          </Text>
          <Text className="text-center text-muted-foreground">
            {t("frame.camera.no-permission.description")}
          </Text>
          <Button onPress={requestPermission} className="mt-4">
            <Text className="font-medium text-white">{t("frame.camera.permission.action")}</Text>
          </Button>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View className="flex-1 bg-black">
      {/* Camera Preview Section */}

      <View className="flex-1 items-center justify-center p-5">
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing}>
            {/* Camera Controls Overlay */}
            <View className="absolute left-5 top-[80%] gap-4">
              <TouchableOpacity
                className="flex-row items-center gap-2 rounded-full bg-black/60 px-3 py-2"
                onPress={toggleCameraFacing}
              >
                <Ionicons name="camera-reverse" size={20} color="white" />
                <Text className="text-xs font-medium text-white">
                  {t("frame.camera.flip-camera")}
                </Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </View>

      {/* Frame Preview Carousel */}
      <BookFramePreview />
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    aspectRatio: 1, // 1:1 square aspect ratio
    width: "100%",
    maxWidth: 400, // Maximum width to prevent too large on tablets
    borderRadius: 20,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
});
