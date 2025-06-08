import { useState, useRef } from "react";

import { StyleSheet, TouchableOpacity, View, Modal, Image, Alert } from "react-native";

import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export function BookFrame() {
  const { t } = useTranslation();
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

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
    if (!cameraRef.current) return;

    setIsCapturing(true);

    try {
      // Take photo with camera
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        base64: false,
      });

      if (!photo?.uri) {
        Alert.alert("Error", "Failed to capture photo");
        return;
      }

      console.log("Captured photo URI:", photo.uri);

      // Show captured photo in modal
      setCapturedImageUri(photo.uri);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Error", "Failed to capture photo");
    } finally {
      setIsCapturing(false);
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

      // Close modal and reset state
      setIsModalVisible(false);
      setCapturedImageUri(null);

      // Show success message and navigate to home
      router.replace("/(auth)/(home)");
    } catch (error) {
      console.error("Error saving to album:", error);
      Alert.alert("Error", "Failed to save image to album");
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCapturedImageUri(null);
  };

  return (
    <View className="flex-1 bg-black">
      {/* Camera Preview Section */}
      <View className="flex-1 items-center justify-center p-5">
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            onMountError={(error) => {
              console.error(`[-] BookFrame: Camera mount error: ${error}`);
            }}
          >
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
          style={[styles.cameraButton, isCapturing && styles.cameraButtonDisabled]}
          onPress={handleTakeSnapshot}
          disabled={isCapturing}
        >
          <View style={styles.cameraButtonInner}>
            <Ionicons
              name={isCapturing ? "hourglass" : "camera"}
              size={32}
              color={isCapturing ? "#666" : "white"}
            />
          </View>
        </TouchableOpacity>
        {isCapturing && (
          <Text style={styles.capturingText}>
            {t("frame.camera.capturing", { defaultValue: "Capturing..." })}
          </Text>
        )}
      </View>

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
  compositeContainer: {
    aspectRatio: 1,
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    overflow: "hidden",
    position: "absolute",
  },
  compositeImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  capturingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
