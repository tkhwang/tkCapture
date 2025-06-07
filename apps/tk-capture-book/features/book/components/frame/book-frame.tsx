import { useState } from "react";

import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

// Mock data for frame previews
const mockFrames = [
  { id: "add", type: "add" },
  { id: "1", type: "frame", image: null, timestamp: "June 7th 2025\n02:57 PM" },
  { id: "2", type: "frame", image: null, timestamp: "June 7th 2025\n02:58 PM" },
  { id: "3", type: "frame", image: null, timestamp: "June 7th 2025\n02:59 PM" },
  { id: "4", type: "frame", image: null, timestamp: "June 7th 2025\n03:00 PM" },
];

export function BookFrame() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedFrameId, setSelectedFrameId] = useState<string>("1");

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted-foreground">Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <View className="items-center space-y-4">
          <Ionicons name="camera-outline" size={64} color="#9CA3AF" />
          <Text className="text-center text-lg font-semibold">카메라 권한이 필요합니다</Text>
          <Text className="text-center text-muted-foreground">
            책의 문구를 캡처하기 위해 카메라 접근 권한을 허용해주세요
          </Text>
          <Button onPress={requestPermission} className="mt-4">
            <Text className="font-medium text-white">권한 허용</Text>
          </Button>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const renderFrameItem = ({ item }: { item: any }) => {
    if (item.type === "add") {
      return (
        <TouchableOpacity style={styles.addFrameButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      );
    }

    const isSelected = item.id === selectedFrameId;

    return (
      <TouchableOpacity
        style={[styles.frameItem, isSelected && styles.selectedFrameItem]}
        onPress={() => setSelectedFrameId(item.id)}
      >
        <View style={styles.framePreview}>
          {/* Mock frame content - you can replace with actual image */}
          <View style={styles.mockFrameContent} />

          {/* Timestamp overlay */}
          <View style={styles.timestampOverlay}>
            <Text style={styles.timestampText}>{item.timestamp}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Controls */}
      <View style={styles.topControls}>{/* TODO: Add top controls */}</View>

      {/* Camera Preview */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing}>
          {/* Camera Controls Overlay */}
          <View style={styles.cameraControlsOverlay}>
            <TouchableOpacity style={styles.cameraControlButton} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={20} color="white" />
              <Text style={styles.controlButtonText}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      {/* Frame Preview Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={mockFrames}
          renderItem={renderFrameItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  topControlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cameraContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  frameGuide: {
    position: "absolute",
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "10%",
  },

  cameraControlsOverlay: {
    position: "absolute",
    left: 20,
    top: "20%",
    gap: 16,
  },
  cameraControlButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  controlButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  carouselContainer: {
    paddingVertical: 20,
  },
  carouselContent: {
    paddingHorizontal: 20,
  },
  addFrameButton: {
    width: 80,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderStyle: "dashed",
  },
  frameItem: {
    width: 80,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedFrameItem: {
    borderColor: "white",
    borderWidth: 3,
  },
  framePreview: {
    flex: 1,
    backgroundColor: "#8B4513", // Brown color to simulate coffee image
    position: "relative",
  },
  mockFrameContent: {
    flex: 1,
    backgroundColor: "#D2691E", // Lighter brown for mock content
  },
  timestampOverlay: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
  },
  timestampText: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    lineHeight: 10,
  },
});
