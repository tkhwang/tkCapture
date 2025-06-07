import { useState, useRef } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useTranslation } from "react-i18next";
import ViewShot from "react-native-view-shot";

import { Ionicons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BookFramePreview } from "@/features/book/components/frame/book-frame-preview";

interface FrameItem {
  id: string;
  type: "add" | "frame";
  image?: string | null;
  timestamp?: string;
}

export function BookFrame() {
  const { t } = useTranslation();
  const viewShotRef = useRef<ViewShot>(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedFrame, setSelectedFrame] = useState<FrameItem | null>(null);

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

  const handleTakeSnapshot = async () => {
    if (viewShotRef.current?.capture) {
      try {
        const uri = await viewShotRef.current.capture();
        console.log("Captured image URI:", uri);
        // Handle the captured image here (save, share, etc.)
      } catch (error) {
        console.error("Error capturing image:", error);
      }
    }
  };

  const handleFrameSelect = (frame: FrameItem) => {
    setSelectedFrame(frame);
  };

  return (
    <View className="flex-1 bg-black">
      {/* Camera Preview Section */}
      <View className="flex-1 items-center justify-center p-5">
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing={facing}
              onMountError={(error) => {
                console.error(`[-] BookFrame: Camera mount error: ${error}`);
              }}
            >
              {/* Frame Overlay */}
              {selectedFrame && selectedFrame.type === "frame" && (
                <View style={styles.frameOverlay}>
                  <View style={styles.frameContent}>
                    {/* Mock frame overlay - replace with actual frame design */}
                    <View style={styles.frameTop} />
                    <View style={styles.frameBottom}>
                      <Text style={styles.frameTimestamp}>{selectedFrame.timestamp}</Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Camera Controls Overlay */}
              <View className="absolute left-5 top-[70%] gap-4">
                <TouchableOpacity
                  className="flex-row items-center gap-2 rounded-full bg-black/60 px-3 py-2"
                  onPress={toggleCameraFacing}
                >
                  <Ionicons name="camera-reverse" size={20} color="white" />
                  <Text className="text-xs font-medium text-white">
                    {t("frame.camera.flip-camera")}
                  </Text>
                </TouchableOpacity>

                {selectedFrame && (
                  <TouchableOpacity
                    className="flex-row items-center gap-2 rounded-full bg-white/20 px-3 py-2"
                    onPress={handleTakeSnapshot}
                  >
                    <Ionicons name="camera" size={20} color="white" />
                    <Text className="text-xs font-medium text-white">
                      {t("frame.camera.capture", { defaultValue: "Capture" })}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </CameraView>
          </View>
        </ViewShot>
      </View>

      {/* Frame Preview Carousel */}
      <BookFramePreview onFrameSelect={handleFrameSelect} selectedFrameId={selectedFrame?.id} />
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
    position: "relative",
  },
  frameOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  frameContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  frameTop: {
    height: 60,
    backgroundColor: "rgba(139, 69, 19, 0.8)", // Semi-transparent brown
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  frameBottom: {
    height: 80,
    backgroundColor: "rgba(139, 69, 19, 0.9)", // Semi-transparent brown
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  frameTimestamp: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 14,
  },
});
