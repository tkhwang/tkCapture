import { useState, useRef } from "react";

import { StyleSheet, TouchableOpacity, View, Modal, Image, Alert } from "react-native";

import { useTranslation } from "react-i18next";
import { captureRef } from "react-native-view-shot";

import { Ionicons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

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
  const cameraRef = useRef<CameraView>(null);
  const cameraContainerRef = useRef<View>(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedFrame, setSelectedFrame] = useState<FrameItem | null>(null);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    if (!cameraContainerRef.current || !selectedFrame) return;

    try {
      // Capture the entire camera container including frame overlay
      const capturedImageUri = await captureRef(cameraContainerRef.current, {
        format: "jpg",
        quality: 0.9,
        result: "tmpfile", // Ensure we get a proper file URI
      });

      console.log("Captured image URI:", capturedImageUri);

      if (!capturedImageUri) {
        Alert.alert("Error", "Failed to capture image with frame overlay");
        return;
      }

      // Show the captured image with frame overlay in modal
      setCapturedImageUri(capturedImageUri);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error in snapshot process:", error);
      Alert.alert("Error", "Failed to capture image");
    }
  };

  const handleSaveToAlbum = async () => {
    if (!capturedImageUri) return;

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Please grant permission to save photos to your album");
        return;
      }

      await MediaLibrary.saveToLibraryAsync(capturedImageUri);
      setIsModalVisible(false);
      setCapturedImageUri(null);
    } catch (error) {
      console.error("Error saving to album:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCapturedImageUri(null);
  };

  const handleFrameSelect = (frame: FrameItem) => {
    setSelectedFrame(frame);
  };

  return (
    <View className="flex-1 bg-black">
      {/* Camera Preview Section */}
      <View className="flex-1 items-center justify-center p-5">
        <View ref={cameraContainerRef} style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            onMountError={(error) => {
              console.error(`[-] BookFrame: Camera mount error: ${error}`);
            }}
          >
            {/* Frame Overlay */}
            {selectedFrame && selectedFrame.type === "frame" && (
              <View style={styles.frameOverlay}>
                {/* Top frame section */}
                <View style={styles.frameTop} />

                {/* Middle transparent section - camera preview shows through */}
                <View style={styles.frameMiddle} />

                {/* Bottom frame section with metadata */}
                <View style={styles.frameBottom}>
                  <Text style={styles.frameTimestamp}>{selectedFrame.timestamp}</Text>
                </View>
              </View>
            )}

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

      {/* Camera Button Section */}
      <View style={styles.cameraButtonSection}>
        <TouchableOpacity
          style={[styles.cameraButton, !selectedFrame && styles.cameraButtonDisabled]}
          onPress={handleTakeSnapshot}
          disabled={!selectedFrame}
        >
          <View style={styles.cameraButtonInner}>
            <Ionicons name="camera" size={32} color={selectedFrame ? "white" : "#666"} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Frame Preview Carousel */}
      <BookFramePreview onFrameSelect={handleFrameSelect} selectedFrameId={selectedFrame?.id} />

      {/* Modal for Image Preview */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {capturedImageUri && (
              <View style={styles.modalImageContainer}>
                <Image
                  source={{ uri: capturedImageUri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                  onError={(error) => {
                    console.error("Modal Image load error:", error);
                  }}
                  onLoad={() => {
                    console.log("Modal Image loaded successfully");
                  }}
                />
              </View>
            )}
            <View style={styles.modalButtons}>
              <Button onPress={handleSaveToAlbum} className="mt-4 bg-blue-600">
                <Text className="font-medium text-white">
                  {t("frame.camera.save-to-album", { defaultValue: "Save to Album" })}
                </Text>
              </Button>
              <Button onPress={handleCloseModal} className="mt-2 bg-gray-600">
                <Text className="font-medium text-white">
                  {t("frame.camera.close", { defaultValue: "Close" })}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "transparent", // Ensure overlay background is transparent
    flexDirection: "column",
  },
  frameTop: {
    height: 60,
    backgroundColor: "rgba(139, 69, 19, 0.85)", // Semi-transparent brown for frame only
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  frameMiddle: {
    flex: 1,
    backgroundColor: "transparent", // Completely transparent - camera preview shows through
  },
  frameBottom: {
    height: 80,
    backgroundColor: "rgba(139, 69, 19, 0.85)", // Semi-transparent brown for frame only
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
  cameraButtonSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 40,
    padding: 4,
    marginBottom: 8,
  },
  cameraButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  cameraButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    aspectRatio: 1, // Maintain 1:1 aspect ratio to match camera container
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#f0f0f0", // Light gray background to help identify loading issues
  },
  modalButtons: {
    width: "100%",
  },
  modalImageContainer: {
    position: "relative",
    width: "100%",
    backgroundColor: "transparent",
  },
  modalFrameOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});
