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

export function BookFramePreview() {
  const [selectedFrameId, setSelectedFrameId] = useState<string>("1");

  const mockFrames: FrameItem[] = [
    { id: "add", type: "add" },
    { id: "1", type: "frame", image: null, timestamp: "June 7th 2025\n02:57 PM" },
    { id: "2", type: "frame", image: null, timestamp: "June 7th 2025\n02:58 PM" },
    { id: "3", type: "frame", image: null, timestamp: "June 7th 2025\n02:59 PM" },
    { id: "4", type: "frame", image: null, timestamp: "June 7th 2025\n03:00 PM" },
  ];

  const renderFrameItem = ({ item }: { item: FrameItem }) => {
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
