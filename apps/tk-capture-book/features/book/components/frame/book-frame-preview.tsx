import React, { useState } from "react";

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Text } from "@/components/ui/text";

interface FrameItem {
  id: string;
  type: "add" | "frame";
  image?: string | null;
  timestamp?: string;
}

interface BookFramePreviewProps {
  onFrameSelect?: (frame: FrameItem) => void;
  selectedFrameId?: string;
}

export function BookFramePreview({ onFrameSelect, selectedFrameId }: BookFramePreviewProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string>("1");

  // Use external selectedFrameId if provided, otherwise use internal state
  const currentSelectedId = selectedFrameId || internalSelectedId;

  const mockFrames: FrameItem[] = [
    { id: "add", type: "add" },
    { id: "1", type: "frame", image: null, timestamp: "Frame #1" },
    { id: "2", type: "frame", image: null, timestamp: "Frame #2" },
    { id: "3", type: "frame", image: null, timestamp: "Frame #3" },
    { id: "4", type: "frame", image: null, timestamp: "Frame #4" },
    { id: "5", type: "frame", image: null, timestamp: "Frame #5" },
  ];

  const handleFramePress = (item: FrameItem) => {
    setInternalSelectedId(item.id);
    if (onFrameSelect) {
      onFrameSelect(item);
    }
  };

  const renderFrameItem = ({ item }: { item: FrameItem }) => {
    if (item.type === "add") {
      return (
        <TouchableOpacity style={styles.addFrameButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      );
    }

    const isSelected = item.id === currentSelectedId;

    return (
      <TouchableOpacity
        style={[styles.frameItem, isSelected && styles.selectedFrameItem]}
        onPress={() => handleFramePress(item)}
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
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    paddingVertical: 20,
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
  carouselContent: {
    paddingHorizontal: 20,
  },
});
